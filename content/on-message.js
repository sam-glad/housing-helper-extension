chrome.runtime.onMessage.addListener((request, sender) => {
  switch(request.message) {
    case ENUM.getCraigslistPostInfo:
      const allCraigslistPostInfo = new CraigslistPostInfo();
      allCraigslistPostInfo.assembleSpreadsheetRowText(alert);
      break;
    default:
      // Do nothing
  }
});