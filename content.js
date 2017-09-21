function getBedBathArray(firstRow) {
  const bedsAndBaths = firstRow[0];
  const bedBathArray = firstRow[0].textContent.split(' / ');
  if (!bedBathArray || !bedBathArray.length || bedBathArray.length !== 2) {
    const errorMessage = 'Ya dun goofed - something went wrong while trying to get bedroom and bathroom count :(';
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  return bedBathArray;
}

function getNumBedrooms(firstRow) {
  const bedBathArray = getBedBathArray(firstRow);
  const bedroomsString = bedBathArray[0];
  const bedRegex = /\d+BR/i;
  if (bedRegex.test(bedBathArray[0])) { // TODO: Make this clearer?
    return parseInt(bedBathArray[0].match(/\d+/)[0]);
  }
}

function getNumBathrooms(firstRow) {
  const bedsAndBaths = firstRow[0];
  const bedBathArray = getBedBathArray(firstRow);
  const bedroomsString = bedBathArray[0];
  const bathRegex = /\d+BA/i;
  if (bathRegex.test(bedBathArray[1])) { // TODO: Make this clearer?
    return parseInt(bedBathArray[1].match(/\d+/)[0]);
  }
}

function getAvailableDate(firstRow) {
  if (!(firstRow && firstRow.length && firstRow.length >= 3 && firstRow[2])) {
    console.log('No available date listed - skipping');
    return;
  }
  const availableDateFullString = firstRow[2].textContent;
  return availableDateFullString.split('available ')[1]; // E.g. 'oct 1'
}

function getAllCraigslistPostInfo() {
  const firstRow = document.getElementsByClassName('shared-line-bubble');
  let craigslistPostInfo = {};
  if (firstRow.length) {
    if (firstRow.length > 0) {
      craigslistPostInfo = {
        numBedrooms: getNumBedrooms(firstRow),
        numBathrooms: getNumBathrooms(firstRow),
        availableDate: getAvailableDate(firstRow)
      };
    }
    craigslistPostInfo = getSecondRowInfo(craigslistPostInfo);
    return craigslistPostInfo;
  }
}

function getSecondRowInfo(craigslistPostInfo) {
  const sections = [].slice.call(document.getElementsByClassName('attrgroup'));
  sections.forEach(section => {
    const spans = [].slice.call(section.children).filter(el => el.tagName === 'SPAN');
    spans.forEach(span => {
      if (/parking/i.test(span.innerText) || /garage/i.test(span.innerText)) {
        craigslistPostInfo.parking = span.innerText;
      }
      if (/house/i.test(span.innerText) || /apartment/i.test(span.innerText) || /condo/i.test(span.innerText) || /duplex/i.test(span.innerText)) {
        craigslistPostInfo.housingType = span.innerText;
      }
      if (/w\/d/i.test(span.innerText) || /laundry/i.test(span.innerText)) {
        craigslistPostInfo.washerDryer = span.innerText;
      }
      if (/furnished/i.test(span.innerText)) {
        craigslistPostInfo.furnished = 'Yes';
      }
    });
  });
  return craigslistPostInfo;
}

chrome.runtime.onMessage.addListener((request, sender) => {
  switch(request.message) {
    case 'GET CL INFO':
      chrome.runtime.sendMessage({ message: 'CL POST INFO', craigslistPostInfo: getAllCraigslistPostInfo() });
    default:
      // Do nothing
  }
});