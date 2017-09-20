chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'GET CL INFO' }); 
});

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  if (response.message === 'CL POST INFO') {
    // TODO: Handle post info - placeholder for now:
    console.log(response.craigslistPostInfo);
  }
});