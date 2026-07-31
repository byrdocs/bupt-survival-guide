const CURRICULUM_SITE_URL = process.env.CURRICULUM_SITE_URL;

let cachedPrograms = null;
let cachedError = null;
let fetchPromise = null;

async function fetchPrograms() {
  if (cachedPrograms !== null || cachedError !== null) return;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(CURRICULUM_SITE_URL, { signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) {
        cachedError = `API 返回状态码 ${response.status}`;
      } else {
        cachedPrograms = await response.json();
      }
    } catch {
      cachedError = '获取培养方案列表失败，请稍后重试';
    }
  })();
  return fetchPromise;
}

function buildHTML(programs) {
  const yearSet = new Set();
  const schoolMap = new Map();
  for (const p of programs) {
    yearSet.add(p.year);
    const byYear = schoolMap.get(p.school) ?? {};
    byYear[p.year] = p;
    if (!schoolMap.has(p.school)) schoolMap.set(p.school, byYear);
  }
  const years = [...yearSet].sort((a, b) => b - a);

  let html = '<table class="curriculum-table"><thead><tr>';
  html += '<th class="curriculum-school">学院</th>';
  for (const y of years) {
    html += '<th>' + y + '级</th>';
  }
  html += '</tr></thead><tbody>';

  for (const [school, byYear] of schoolMap) {
    html += '<tr><td class="curriculum-school">' + school + '</td>';
    for (const y of years) {
      const program = byYear[y];
      if (program) {
        const href = CURRICULUM_SITE_URL + '/file/' + program.id + '?title=' + encodeURIComponent(program.title) + '.pdf';
        html += '<td><a href="' + href + '">' + program.year + '级</a></td>';
      } else {
        html += '<td class="curriculum-empty">暂无</td>';
      }
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  return html;
}

export default function remarkCurriculum() {
  return async function (tree) {
    await fetchPrograms();

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type === 'containerDirective' && node.name === 'curriculum') {
        if (cachedPrograms) {
          node.type = 'html';
          node.value = buildHTML(cachedPrograms);
        } else if (cachedError) {
          node.type = 'html';
          node.value =
            '<p>⚠ 获取培养方案列表失败，请稍后重试。</p>';
        }
        break;
      }
    }
  };
}
