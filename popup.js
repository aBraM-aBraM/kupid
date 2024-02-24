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

const FILTER_ID_TO_LOOKING_FOR = {
    "new_filter" : "New",
    "long_filter": "Long",
    "short_filter": "Short",
    "hookups_filter": "Hookups"
};

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



function set_content_onclick_onready() {
    console.log("cunt im fucking tryin");
    msg_to_content({action: "content_ready"}, function(response) {
        if (typeof response !== 'undefined') {
            handleCheckboxChange();
            console.log("filter changed response: " + response) 
        }
        else {
            setTimeout(set_content_onclick_onready, 300);
        }
    });
}

function load_local_filter() {
    chrome.storage.local.get(["change_filter"]).then((result) => {
        if (result) {

            console.log("setting switch checked state");
            Object.keys(FILTER_ID_TO_LOOKING_FOR).forEach(function (checkboxId) {
                var checkbox = document.getElementById(checkboxId);
                checkbox.checked = result.change_filter.params[FILTER_ID_TO_LOOKING_FOR[checkboxId].toLowerCase()];
            });

            // console.log("sending set_content_onclick_onready");
            // set_content_onclick_onready();
        }
    });
}


function handleCheckboxChange() {
    current_filter = {};

    Object.keys(FILTER_ID_TO_LOOKING_FOR).forEach(function (checkboxId) {
        current_filter[FILTER_ID_TO_LOOKING_FOR[checkboxId].toLowerCase()] =  document.getElementById(checkboxId).checked;
    });

    var change_filter_data = {action: "change_filter", params: current_filter};
    chrome.storage.local.set({change_filter: change_filter_data}).then(() => {
        console.log("set session values");
    });

    console.log("handleCheckboxChange " + JSON.stringify(change_filter_data));
    msg_to_content(change_filter_data, function(response) {
        console.log("filter changed response: " + response)
    });
}

function init_filter(){

    console.log("setting switch listeners");
    Object.keys(FILTER_ID_TO_LOOKING_FOR).forEach(function (checkboxId) {
        var checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    console.log("loading local filter");
    load_local_filter();
}

document.addEventListener('DOMContentLoaded', function () {
    init_filter();
});
