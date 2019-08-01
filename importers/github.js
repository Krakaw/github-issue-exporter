const Octokit = require('@octokit/rest');
const progress = require('../progress');

module.exports = async (githubKey, userAgent, owner, repos, labels = [], perPage, issueState) => {
    const octokit = Octokit({
        auth: githubKey,
        userAgent: userAgent,
    });
    let results = [];
    try {
        progress.start(repos.length, 0);
        for (let i in repos) {

            let repo = repos[i];
            const options = octokit.issues.listForRepo.endpoint.merge({
                owner,
                repo,
                labels,
                per_page: perPage,
                state: issueState
            });
            results = results.concat(await octokit.paginate(options));
            progress.update(+i + 1);
        }
    } catch (err) {
        console.error(err);
    }
    return results;
};
