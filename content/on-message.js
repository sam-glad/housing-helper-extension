chrome.runtime.onMessage.addListener((request, sender) => {
  switch(request.message) {
    case 'GET CL INFO':
      const allCraigslistPostInfo = new CraigslistPostInfo();
      const spreadsheetRowText = allCraigslistPostInfo.assembleSpreadsheetRowText();
      alert(spreadsheetRowText);
      break;
    default:
      // Do nothing
  }
});