const asana = require('asana');

module.exports = async(results, api_key, workspace, project) => {
    const client = asana.Client.create().useAccessToken(process.env.ASANA_API_KEY);
    client.users.me().then(function(me) {
        console.log(me);
    });

};
