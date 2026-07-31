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
  const schools = new Map();
  for (const p of programs) {
    const list = schools.get(p.school) ?? [];
    list.push(p);
    if (!schools.has(p.school)) schools.set(p.school, list);
  }

  let html = '<ul>';
  for (const [school, schoolPrograms] of schools) {
    html += '<li>' + school + '<ul>';
    for (const program of schoolPrograms) {
      const href = CURRICULUM_SITE_URL + '/file/' + program.id + '?title=' + encodeURIComponent(program.title) + '.pdf';
      html += '<li><a href="' + href + '">' + program.year + '级</a>';
      //html += '<ul>';
      //for (const m of program.major) {
      //  html += '<li>' + m.type + ' - ' + m.name + '</li>';
      //}
      //html += '</ul>';
      html += '</li>';
    }
    html += '</ul></li>';
  }
  html += '</ul>';
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
