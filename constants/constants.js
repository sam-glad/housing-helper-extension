const CONSTANTS = {
  defaultAttributes: [
    { name: 'Price', camelCaseName: 'price', position: 1 },
    { name: 'Title', camelCaseName: 'title', position: 2 }, 
    { name: 'Address', camelCaseName: 'address', position: 3 },
    { name: 'Bedrooms', camelCaseName: 'numBedrooms', position: 4 },
    { name: 'Bathrooms', camelCaseName: 'numBathrooms', position: 5 },
    { name: 'Square Footage', camelCaseName: 'squareFootage', position: 6 },
    { name: 'Parking', camelCaseName: 'parking', position: 7 },
    { name: 'Housing Type', camelCaseName: 'housingType', position: 8 },
    { name: 'URL', camelCaseName: 'url', position: 9 },
    { name: 'Craigslist Post ID', camelCaseName: 'craigslistPostId', position: 10 },
    { name: 'Contact Info', camelCaseName: 'contactInfo', position: 11 }
  ],
  regexes: {
    hotpads: {
      base: /https?\:\/\/hotpads.com\//i,
      housingListing: /https?\:\/\/hotpads.com\/.+\/pad/i
    },
    craigslist: {
      housingListing: /https?\:\/\/denver.craigslist.org\/apa\/d\//i
    }
  }
}