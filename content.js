setTimeout(function(){

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
}, 5000)
