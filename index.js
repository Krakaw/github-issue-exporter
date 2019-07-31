require('dotenv').config()
const yargs = require('yargs');
const {Parser} = require('json2csv');
const Octokit = require('@octokit/rest');

const octokit = Octokit({
    auth: process.env.AUTH_TOKEN,
    userAgent: process.env.USER_AGENT,
});

const argv = yargs
    .command('output', 'Output to [csv|asana]', {
        type: {
            description: 'Output to Asana or csv',
            alias: 't',
            choices: ['csv', 'asana'],
            default: 'csv',
            required: true
        },
        "asana-key": {
            alias: 'ak',
            description: 'Asana API key',
            type: 'string',
            default: process.env.ASANA_API_KEY,
            required: true
        },
        "asana-board": {
            alias: "ab",
            description: 'Asana Board to send the issues to',
            type: 'string',
            required: true
        }
    })
    .option('owner', {
        alias: 'o',
        description: 'Github Owner',
        type: 'string',
    })
    .option('repo', {
        array: true,
        alias: 'r',
        description: 'Github Repos',
        type: 'string',
    })
    .demand(['owner', 'repo'])
    .option('github-key', {
        description: 'Github Auth Token',
        type: 'string',
        alias: 'gk',
        default: process.env.GITHUB_AUTH_TOKEN,
    })
    .option('github-user-agent', {
        alias: 'gua',
        description: 'Github useragent (Your username)',
        type: 'string',
        default: process.env.GITHUB_USER_AGENT
    })
    .option('labels', {
        array: true,
        alias: 'l',
        description: 'Github Labels to pull',
        type: 'string',
    })
    .option('per-page', {
        alias: 'l',
        description: 'Github issues to pull per page',
        type: 'number',
        default: 100
    })


    .help()
    .alias('help', 'h')
    .argv;
console.log(argv);
process.exit();
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
