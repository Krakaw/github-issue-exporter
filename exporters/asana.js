const asana = require('asana');

module.exports = async(results, asanaKey, asanaWorkspace, asanaProject) => {
    const client = asana.Client.create({"defaultHeaders": {"asana-enable": "string_ids"}}).useAccessToken(asanaKey);
    const asanaTags = await getTags(client, asanaWorkspace);

    try {
        for (let i  in results) {
            const githubIssue = results[i];
            const repo = `big-neon/${githubIssue.repository_url.split('/').pop()}`;
            //Check if the repo has a tag
            const labels = githubIssue.labels.map(item => item.name);
            labels.push(repo);
            const tags = [];
            for (let j in labels) {
                const label = labels[j];
                const newTagId = await getOrCreateTag(client, asanaWorkspace, asanaTags, label);
                tags.push(newTagId);
            }
            const commentsUrl = githubIssue.comments > 0 ? `\r\n${githubIssue.comments} comments at: ${githubIssue.comments_url}`: '';
            const taskData = {
                projects: [asanaProject] ,
                name: githubIssue.title,
                notes: `${githubIssue.html_url}\r\n${githubIssue.body}\r\nCreated At: ${githubIssue.created_at} By: ${githubIssue.user.login}${commentsUrl}`,
                tags
            };
            let task = await client.tasks.createInWorkspace(asanaWorkspace, taskData);
            console.log(`Processed ${repo} ${+i + 1} of ${results.length} - ${task.gid}`);
        }
    }catch(e) {
        console.error(e);
        console.error(e.value.errors);
    }




};

async function getTags(client, asanaWorkspace) {
    const tags = await client.tags.findByWorkspace(asanaWorkspace);
    return Object.assign({}, ...(tags.data.map(item => ({[item.name.toLowerCase()]: item.gid}))));
}


async function getOrCreateTag(client, asanaWorkspace, asanaTags, tag) {
    const tagKey = tag.toLowerCase();
    if (asanaTags.hasOwnProperty(tagKey)) {
        return asanaTags[tagKey];
    }
    console.log("Tag not found", tag, "creating");
    const newTag = await client.tags.createInWorkspace(asanaWorkspace, {name: tag});
    asanaTags[newTag.name.toLowerCase()] = newTag.gid;
    return newTag.gid;
}
