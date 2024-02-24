
function can_show_likes() {
	return document.getElementsByClassName("usercard-placeholder-thumb").length > 0;
}

function show_likes() {
	console.log("button clicked");
	// remove retarded block
	document.getElementsByClassName("likes-you-paywall-explainer-cta")[0].remove()

	// remove blur
	var user_thumbs = Array.from(document.getElementsByClassName("usercard-placeholder-thumb"))
	user_thumbs.forEach(function(user_thumb){
		user_thumb.classList.remove('usercard-placeholder-thumb');
		user_thumb.classList.add('usercard-thumb');
	})


	// fix height bullshit
	document.getElementsByClassName("r1HEI1d8cVFinFeIqQpA")[0].style.height = "2000px"
	document.getElementsByClassName("r1HEI1d8cVFinFeIqQpA")[0].style["max-height"] = "120vh"

	// remove mist
	document.getElementsByClassName("sZGfP81jwTqSEbDw1X7K")[0].remove()
}

function change_filter(content) {

	like_btn = document.getElementsByClassName("dt-action-buttons-button like")[0];
	pass_btn = document.getElementsByClassName("dt-action-buttons-button pass")[0];

	function sleep(milliseconds) {  
		return new Promise(resolve => setTimeout(resolve, milliseconds));  
	}  

	async function filter_hook() {
		await sleep(100)
		details = document.getElementsByClassName("matchprofile-details-text");
		looking_for = details[details.length - 1].textContent.toLowerCase();
		person_name = document.getElementsByClassName("card-content-header__text")[0].textContent;

		for (let key in content)
		{
			if (content.hasOwnProperty(key)){
				if(!looking_for.includes(key))
				{
					console.log(person_name + " doesn't meet the filter skipping");
					pass_btn.click();
				}
			}
		}
	}

	like_btn.onclick = filter_hook;
	pass_btn.onclick = filter_hook;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	
	var msg_response = "default";

	switch(message.action) {
		case "can_show_likes":
			msg_response = "can_show_likes";
			break;
		case "show_likes":
			msg_response = "show_likes";
			break;
		case "change_filter":
			msg_response = "change_filter";
			change_filter(message.params);
			break;
		default:
			msg_response = "unknown command";
	}
    sendResponse({ response: msg_response });
});