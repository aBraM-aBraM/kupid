function sendMessage(request_action, action_content) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: request_action, content: action_content }, function (response) {
            console.log(response);
        });
    });
}

function init_show_likes() {
    var showLikesButton = document.getElementById('show_likes');
    showLikesButton.addEventListener('click', function () {
        sendMessage("show_likes", []);
    });
}

function init_filter(){

    var checkboxIds = ['New', 'Long', 'Short', 'Hookups'];

    checkboxIds.forEach(function (checkboxId) {
        var checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    function handleCheckboxChange() {
        // Get the status of all checkboxes

        current_filter = {};

        checkboxIds.forEach(function (checkboxId) {
            current_filter[checkboxId] =  document.getElementById(checkboxId).checked;
        });

        console.log(current_filter);
        sendMessage("change_filter", current_filter);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    init_show_likes();
    init_filter();
});