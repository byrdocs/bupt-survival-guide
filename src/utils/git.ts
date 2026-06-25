import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';

export interface Contributor {
  name: string;
  login: string;
  avatarUrl: string;
}

function gravatarHash(email: string): string {
  return createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

async function fetchFromGitHubAPI(filePath: string): Promise<Contributor[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not set');

  const url = `https://api.github.com/repos/byrdocs/SurviveBUPTManual/commits?path=${encodeURIComponent(filePath)}&per_page=50`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`);
  }

  const commits = await res.json();

  const seen = new Set<string>();
  const contributors: Contributor[] = [];

  for (const commit of commits) {
    const login = commit.author?.login;
    const name = commit.commit?.author?.name;
    const avatarUrl = commit.author?.avatar_url;

    if (!login || !name || !avatarUrl) continue;

    const key = login.toLowerCase();
    if (seen.has(key)) continue;
    if (key.includes('[bot]')) continue;

    seen.add(key);
    contributors.push({
      name,
      login,
      avatarUrl: `${avatarUrl}&s=48`,
    });
  }

  return contributors;
}

function getContributorsFromGit(filePath: string): Contributor[] {
  try {
    const stdout = execSync(
      `git log --follow --format="%aN|%aE" -- "${filePath}"`,
      {
        encoding: 'utf-8',
        timeout: 5000,
        stdio: ['pipe', 'pipe', 'pipe'],
      },
    ).trim();

    if (!stdout) return [];

    const seen = new Set<string>();
    const contributors: Contributor[] = [];

    for (const line of stdout.split('\n')) {
      const sep = line.lastIndexOf('|');
      if (sep === -1) continue;
      const name = line.slice(0, sep).trim();
      const email = line.slice(sep + 1).trim();

      if (!name || !email) continue;

      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      if (key.includes('[bot]')) continue;

      seen.add(key);
      contributors.push({
        name,
        login: name,
        avatarUrl: `https://www.gravatar.com/avatar/${gravatarHash(email)}?s=48&d=identicon`,
      });
    }

    return contributors;
  } catch {
    return [];
  }
}

export async function getContributors(filePath: string): Promise<Contributor[]> {
  if (process.env.GITHUB_TOKEN) {
    try {
      return await fetchFromGitHubAPI(filePath);
    } catch {
      return getContributorsFromGit(filePath);
    }
  }

  return getContributorsFromGit(filePath);
}
