chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("received " + request);
	switch (request.action)
	{
		case "show_likes":
			show_likes();
			break;
		case "get_pathname":
			sendResponse(window.location.pathname);
			break;
		default:
			sendResponse("unknown action!");
	};
});

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