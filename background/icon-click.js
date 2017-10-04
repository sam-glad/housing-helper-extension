chrome.browserAction.onClicked.addListener(function(tab) {
  if (CONSTANTS.regexes.craigslist.housingListing.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { message: ENUM.getCraigslistPostInfo });
  }
  else if (CONSTANTS.regexes.hotpads.base.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { message: ENUM.getHotPadsInfo });
  }
});