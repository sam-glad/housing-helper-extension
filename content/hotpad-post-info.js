class HotPadPostInfo extends HousingPosting {
  constructor() {
    super();
    this.getPrice();
    this.getTitleAndAddress();
    const bedsBathsSqFt = this.getBedsBathsSqFt();
    this.getNumBedrooms(bedsBathsSqFt);
    this.getNumBathrooms(bedsBathsSqFt);
    this.getSquareFootage(bedsBathsSqFt);
    this.getHousingType();
    this.craigslistPostId = '';
    this.getContactInfo();
    this.getUrl();
  }

  getPrice() {
    this.price = parseInt(document.querySelector('div.SingleModelHdpHeader-pricing').firstChild.innerText.replace(/\D/g, ''));
  }

  getBedsBathsSqFt() {
    return [].slice.call(document.querySelectorAll('span.Text.BedsBathsSqft-text.Text-sm.Text-xlAndUp-md'));
  }

  getNumBedrooms(bedsBathsSqFt) {
    // TODO: Validation?
    this.numBedrooms = parseInt(bedsBathsSqFt[0].innerText.split(/\sbeds?/i)[0]);
  }

  getNumBathrooms(bedsBathsSqFt) {
    // TODO: Validation?
    this.numBathrooms = parseInt(bedsBathsSqFt[1].innerText.split(/\sbaths?/i)[0]);
  }

  getSquareFootage(bedsBathsSqFt) {
    const squareFootage = parseInt(bedsBathsSqFt[2].innerText.split(/\ssqft/i)[0].replace(/\D/g, ''));
    if (isNaN(squareFootage)) {
      this.squareFootage = '';
    }
    else {
      this.squareFootage = squareFootage;
    }
  }

  getTitleAndAddress() {
    const address = document.querySelector('h1.Text.HdpAddress-title.Text-sm.Text-xlAndUp-md').innerText.replace(/\n/g, ' ');
    this.address = address;
    this.title = address;
  }

  getHousingType() {
    this.housingType = document.querySelector('h2.Text.PropertyTypeIcon-keyword.Utils-accent-dark.Text-sm.Text-xlAndUp-md').innerText.toLowerCase();
  }

  getContactInfo() {
    const name = document.querySelector('div.ContactListedBy').children[0].firstChild.innerText.replace(/\n/g, ' ');
    const phone = document.querySelector('a.ContactListedBy-listedby-phone-link').innerText;
    this.contactInfo = `${name}: ${phone}`;
  }

  getUrl() {
    this.url = window.location.href.match(CONSTANTS.regexes.hotpads.housingListing)[0];
  }
}