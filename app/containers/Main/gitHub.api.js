const getRepos = async (link) => {
  const res = await fetch(
    link,
    {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json', 
      },
    }
  );
  const json = await res.json();
  let repos = json || [];
  return repos;
}

const getInfoAboutCurrentRepo = async (owner, repo) => {
  const link = `https://api.github.com/repos/${owner}/${repo}`;
  const res = await fetch(link);
  const json = await res.json();
  let currentRepo = json || {};
  return currentRepo;
}

const getInfoAboutRepoContributors = async (repo) => {
  const link = repo.contributors_url;
  const res = await fetch(link);
  const json = await res.json();
  let contributors = json || [];
  return contributors.slice(0, 3);
}

const getInfoAboutRepoLanguages = async (repo) => {
  const link = repo.languages_url;
  const res = await fetch(link);
  const json = await res.json();
  let languages = json || {};
  for (const key in languages) {
    if (languages[key] <= 1000) {
      delete languages[key];
    } else {
      languages[key] = Math.round((languages[key] / 1000) * 10) / 10;
    }
  }
  return languages;
}

const getInfoAboutRepoPRs = async (repo) => {
  const link = repo.pulls_url.slice(0, -'{/number}'.length);
  const res = await fetch(link);
  const json = await res.json();
  let PRs = json || [];
  PRs = PRs.filter((PR) => PR.state === 'open');
  PRs = PRs.slice(0, 5);
  return PRs;
}

const api = {
  getRepos,
  getInfoAboutCurrentRepo,
  getInfoAboutRepoContributors,
  getInfoAboutRepoLanguages,
  getInfoAboutRepoPRs,
};

export default api;
