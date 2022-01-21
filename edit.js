const ScratchSession = require("./session.js");
const fetch = require("node-fetch");


function edit(user, id, title, content) {
    fetch(`https://scratch.mit.edu/discuss/post/${id}/edit/`, {
        "method": "POST",
        "headers": {
            'X-Requested-With': 'XMLHttpRequest',
            'referer': `https://scratch.mit.edu/discuss/post/${id}/edit/`,
            'X-CSRFToken': user.token || process.env.TOKEN || 'a',
            'Cookie': user.cookie,// + "scratchsessionsid="+user.session/*.slice(1,user.session.length-1)*/,
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://scratch.mit.edu/",
            "sec-ch-ua": "\" Not;A Brand\;v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36"
        },
        body: `csrfmiddlewaretoken=${user.token}&name=${encodeURIComponent(title).split("%20").join("+")}&body=${encodeURIComponent(content).split("%20").join("+")}`,
        "referrer": "https://scratch.mit.edu/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "mode": "cors",
        "credentials": "include"
    });
}

function editPost(username, password, id, title, content) {
    try {
        const session = new ScratchSession(username, password, user => {
            edit(user, id, title, content);
        });
    } catch(e) {
        return {error: "LOGIN"};
    }
}

module.exports = editPost;
