chrome.runtime.onMessage.addListener((request, sender) => {
  switch(request.message) {
    case ENUM.getCraigslistPostInfo:
      const allCraigslistPostInfo = new CraigslistPostInfo();
      const spreadsheetRowText = allCraigslistPostInfo.assembleSpreadsheetRowText();
      alert(spreadsheetRowText);
      break;
    default:
      // Do nothing
  }
});