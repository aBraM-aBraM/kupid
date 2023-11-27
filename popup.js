function sendMessage(request_action) {
    chrome.runtime.sendMessage({ action: request_action }, function(response) {
        console.log("sending " + request_action);
        console.log("received " + response);
        return response;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn');
    btn.style.display = "block";

    pathname = sendMessage("get_pathname");

    console.log(pathname);
    console.log(pathname == "/who-likes-you");
    switch (pathname) {
        case "/who-likes-you":
            action = "show_likes";
            break;
        default:
            btn.style.display = "none";
    }

    if (btn.style.display != "none") {
        showLikesButton.addEventListener('click', function () {
            console.log(sendMessage(action));
        });
    }
});