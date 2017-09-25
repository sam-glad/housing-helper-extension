chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: ENUM.getCraigslistPostInfo }); 
});