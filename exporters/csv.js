const {Parser} = require('json2csv');


module.exports = (results) => {
    const parser = new Parser({flatten: true});
    const csv = parser.parse(results.map(item => {
        item.labels = item.labels.map(label => label.name).join(',');
        return item;
    }));
    return csv;
};
