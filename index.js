require('dotenv').config()
const yargs = require('yargs');
const asana = require('./exporters/asana');
const csv = require('./exporters/csv');
const github = require('./importers/github');

const argv = yargs
    .env('IE')
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
            check: (argv, arr) => {
                return argv.type === 'csv' || (argv.type === 'asana' && argv.asanaKey)
            }
        },
        "asana-project": {
            alias: "ap",
            description: 'Asana Project to send the issues to',
            type: 'string',
            check: (argv, arr) => {
                return argv.type === 'csv' || (argv.type === 'asana' && argv.asanaProject)
            }
        },
        "asana-workspace": {
            alias: "ap",
            description: 'Asana workspace',
            type: 'string',
            check: (argv, arr) => {
                return argv.type === 'csv' || (argv.type === 'asana' && argv.asanaWorkspace)
            }
        }
    })
    .option('owner', {
        alias: 'o',
        description: 'Github Owner',
        type: 'string',
        required: true
    })
    .option('repos', {
        array: true,
        alias: 'r',
        description: 'Github Repos',
        type: 'string',
        required: true
    })
    .demand(['owner', 'repos'])
    .option('github-key', {
        description: 'Github Auth Token',
        type: 'string',
        alias: 'gk',
        required: true
    })
    .option('github-user-agent', {
        alias: 'gua',
        description: 'Github useragent (Your username)',
        type: 'string',
        required: true
    })
    .option('labels', {
        array: true,
        alias: 'l',
        description: 'Github Labels to pull',
        type: 'string',
    })
    .option('per-page', {
        alias: 'a',
        description: 'Github issues to pull per page',
        type: 'number',
        default: 100
    })
    .option('issue-state', {
        alias: 's',
        default: 'open',
        type: 'string',
        choices: ['open', 'closed', 'all']
    })
    .help()
    .alias('help', 'h')
    .argv;


(async () => {
    const {type, githubKey, githubUserAgent: userAgent, owner, repos, labels, perPage, issueState } = argv;
    let results = await github(githubKey, userAgent, owner, repos, labels, perPage, issueState);
    if (type === 'csv') {
        console.log(csv(results));
    } else if (type === 'asana') {

    }
})();
