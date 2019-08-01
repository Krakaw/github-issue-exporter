const CliProgress = require('cli-progress');
const progress = new CliProgress.Bar({stopOnComplete: true,
    format: 'progress [{bar}] {percentage}% | {value}/{total}'
}, CliProgress.Presets.shades_classic);

module.exports = progress;
