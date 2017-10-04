chrome.runtime.onMessage.addListener((request, sender) => {
  switch(request.message) {
    case ENUM.getCraigslistPostInfo:
      const allCraigslistPostInfo = new CraigslistPostInfo();
      allCraigslistPostInfo.assembleSpreadsheetRowText(alert);
      break;
    case ENUM.getHotPadsInfo:
      alert('TODO: GET HOTPADS INFO');
      break;
    default:
      // Do nothing
  }
});