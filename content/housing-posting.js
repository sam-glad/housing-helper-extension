class HousingPosting {
  // Usage: copy the returned result and paste it into a cell in a spreadsheet
  assembleSpreadsheetRowText(callback) {
    let stringForSpreadsheetRow = '';

    chrome.storage.sync.get({
      attributes: CONSTANTS.defaultAttributes
    },
    (response) => {
      response.attributes.sort(function(a, b) { return a.position - b.position; });
      response.attributes.forEach(attribute => {
        let attributeValue = this[attribute.camelCaseName];
        if (typeof attributeValue === 'undefined' || attributeValue === 'undefined') {
          attributeValue = ''
        }
        stringForSpreadsheetRow += `${attributeValue} \t`;
      });

      // I.e., alert the string so the user can copy/paste into a spreadsheet
      callback(stringForSpreadsheetRow);
    });
  }
}