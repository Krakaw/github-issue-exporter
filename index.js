require('dotenv').config()
const { Parser } = require('json2csv');
const Octokit = require('@octokit/rest');

const octokit = Octokit({
    auth: process.env.AUTH_TOKEN,
    userAgent: process.env.USER_AGENT,

});
(async () => {
    const repos = process.env.REPOS.split(",");
    const owner = process.env.OWNER;
    const labels = process.env.LABELS;
    const per_page = process.env.PER_PAGE;
    let results = [];
    for (let i in repos) {
        let repo = repos[i];
        const options = octokit.issues.listForRepo.endpoint.merge({
            owner,
            repo,
            labels,
            per_page
        });
        results = results.concat(await octokit.paginate(options));
    }
    try {
        const parser = new Parser({flatten: true});
        const csv = parser.parse(results.map(item => {
            item.labels = item.labels.map(label => label.name).join(',');
            return item;
        }));
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
})();
