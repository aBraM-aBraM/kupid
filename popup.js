document.addEventListener('DOMContentLoaded', function () {
    var showLikesButton = document.getElementById('show_likes');
    showLikesButton.addEventListener('click', function () {
        sendMessage();
    });

    function sendMessage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'show_likes' }, function (response) {
                console.log(response);
            });
        });
    }
});