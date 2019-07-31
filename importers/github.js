const Octokit = require('@octokit/rest');



module.exports = async (githubKey, userAgent, owner, repos, labels = [], perPage, issueState) => {
    const octokit = Octokit({
        auth: githubKey,
        userAgent: userAgent,
    });
    let results = [];
    try {

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
        }
    } catch (err) {
        console.error(err);
    }
    return results;
};
