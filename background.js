chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const now = Location;
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			message: 'hello',
			url: changeInfo.url
		});
	}
});
/*
chrome.webNavigation.onCommitted.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			message: 'hello',
			url: changeInfo.url
		});
	}
});*/
