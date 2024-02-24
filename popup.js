function msg_to_content(message, callback) {
    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Send message to content script
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            // Call the callback function with the response
            if (callback) {
                callback(response);
            }
        });
    });
}


function init_show_likes() {
    var showLikesButton = document.getElementById('show_likes');
    if (sendMessage("can_show_likes", [])) {
        showLikesButton.hidden = true;
    } else {
        showLikesButton.addEventListener('click', function () {
            sendMessage("show_likes", []);
        });    
    }
}

function init_filter(){
    var id_to_looking_for = {
        "new_filter" : "New",
        "long_filter": "Long",
        "short_filter": "Short",
        "hookups_filter": "Hookups"
    };

    Object.keys(id_to_looking_for).forEach(function (checkboxId) {
        var checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    function handleCheckboxChange() {
        current_filter = {};

        Object.keys(id_to_looking_for).forEach(function (checkboxId) {
            current_filter[id_to_looking_for[checkboxId].toLowerCase()] =  document.getElementById(checkboxId).checked;
        });

        var change_filter_data = {action: "change_filter", params: current_filter};
        chrome.storage.local.set({change_filter: change_filter_data}).then(() => {
            console.log("set session values");
        });

        msg_to_content(change_filter_data, function(response) {
            console.log("filter changed response: " + response)
        });
    }


    // setup current session 
    chrome.storage.local.get(["change_filter"]).then((result) => {
        console.log("value is " + JSON.stringify(result));

        Object.keys(id_to_looking_for).forEach(function (checkboxId) {
            var checkbox = document.getElementById(checkboxId);
            console.log("params = " + JSON.stringify(result.change_filter.params));
            checkbox.checked = result.change_filter.params[id_to_looking_for[checkboxId].toLowerCase()];
        });

    });
}

document.addEventListener('DOMContentLoaded', function () {
    init_filter();
});