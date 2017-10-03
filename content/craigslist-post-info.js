class CraigslistPostInfo {
  constructor() {
    const firstRow = this.getFirstRow();
    const bedBathArray = this.getBedBathArray(firstRow);
    this.getNumBedrooms(bedBathArray);
    this.getNumBathrooms(bedBathArray);
    this.getAvailableDate(firstRow);
    this.getSecondRowInfo();
    this.getAddress();
    this.getTitleInfo();
    this.getUrl();
    this.getCraigslistPostId();
  }

  getFirstRow() {
    return document.getElementsByClassName('shared-line-bubble');
  }

  getBedBathArray(firstRow) {
    const bedsAndBaths = firstRow[0];
    const bedBathArray = firstRow[0].textContent.split(' / ');
    // These should always exist and be usable values
    if (!bedBathArray || !bedBathArray.length || bedBathArray.length !== 2) {
      const errorMessage = 'Ya dun goofed - something went wrong while trying to get bedroom and bathroom count :(';
      alert(errorMessage);
      throw new Error(errorMessage);
    }
    return bedBathArray;
  }

  getNumBedrooms(bedBathArray) {
    const bedroomsString = bedBathArray[0];
    const bedRegex = /\d+BR/i;
    if (bedRegex.test(bedroomsString)) {
      this.numBedrooms = parseInt(bedroomsString.match(/\d+/)[0]);
    }
  }

  getNumBathrooms(bedBathArray) {
    const bathRoomsString = bedBathArray[1];
    const bathRegex = /\d+BA/i;
    if (bathRegex.test(bathRoomsString)) {
      this.numBathrooms = parseInt(bathRoomsString.match(/\d+/)[0]);
    }
  }

  getAvailableDate(firstRow) {
    if (!(firstRow && firstRow.length && firstRow.length >= 3 && firstRow[2])) { // TODO: Make this clearer?
      console.log('No available date listed - skipping');
      return;
    }
    const availableDateFullString = firstRow[2].textContent;
    this.availableDate = availableDateFullString.split('available ')[1]; // E.g. 'oct 1'
  }

  // Lack of IDs means we just have to iterate over the relevant spans
  // and pick out relevant info as it pops up
  getSecondRowInfo() {
    const sections = [].slice.call(document.getElementsByClassName('attrgroup'));
    sections.forEach(section => {
      const spans = [].slice.call(section.children).filter(el => el.tagName === 'SPAN');
      spans.forEach(span => {
        if (/parking/i.test(span.innerText) || /garage/i.test(span.innerText) || /carport/i.test(span.innerText)) {
          this.parking = span.innerText;
        }
        else if (/house/i.test(span.innerText) || /apartment/i.test(span.innerText) || /condo/i.test(span.innerText) || /duplex/i.test(span.innerText)) {
          this.housingType = span.innerText;
        }
        else if (/w\/d/i.test(span.innerText) || /laundry/i.test(span.innerText)) {
          this.washerDryer = span.innerText;
        }
        else if (/furnished/i.test(span.innerText)) {
          this.furnished = 'Yes';
        }
      });
    });
  }

  // Title, price, and square footage
  getTitleInfo() {
    const titleArray = document.querySelectorAll('h2.postingtitle');
    if (titleArray.length && titleArray.length !== 1) {
      const errorMessage = 'Something went wrong while trying to get the title :(';
      alert(errorMessage);
      throw new Error(errorMessage);
    }
    const title = titleArray[0];
    // TODO: Add some validation/checks here
    const titleSpan = [].slice.call(document.querySelectorAll('h2.postingtitle')[0].children).filter(child => child.className === 'postingtitletext')[0];
    const titleChildren = [].slice.call(titleSpan.children);
    this.price = parseInt(titleChildren.filter(child => child.className === 'price')[0].innerText.replace('$',''));
    this.getSquareFootage();
    this.title = document.getElementById('titletextonly').innerText;
  }

  getSquareFootage() {
    const squareFootageElements = this.squareFootage = document.querySelectorAll('span.housing')[0].innerText.match(/\d+ft2/i);
    if (squareFootageElements) {
      this.squareFootage = squareFootageElements[0].match(/\d+/)[0];
    }
    else {
      this.squareFootage = '';
    }
  }

  getAddress() {
    const addressArray = document.querySelectorAll('div.mapaddress');
    if (addressArray && addressArray.length && addressArray.length === 1) {
      this.address = addressArray[0].innerText;
    }
    else {
      this.address = '';
    }
  }

  getUrl() {
    this.url = window.location.href; 
  }

  getCraigslistPostId() {
    this.craigslistPostId = window.location.href.match(/\d+\.html/i)[0].replace(/\.html/i, '');
  }

  // Usage: copy the returned result and paste it into a cell in a spreadsheet
  assembleSpreadsheetRowText(callback) {
    let stringForSpreadsheetRow = '';

    // TODO: Sort attributes by position first
    chrome.storage.sync.get({
      attributes: CONSTANTS.defaultAttributes
    },
    (response) => {
      response.attributes.sort(function(a, b) { return a.position - b.position; });
      response.attributes.forEach(attribute => {
        stringForSpreadsheetRow += `${this[attribute.camelCaseName]} \t`;
      });

      // I.e., alert the string so the user can copy/paste into a spreadsheet
      callback(stringForSpreadsheetRow);
    });
  }
}