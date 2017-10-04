// TODO: Re-order by position each time this is called
function restoreOptions() {
  chrome.storage.sync.get({
    // Options script can't access content/background scripts, as far as I've found :(
    // (hence this being here as well as in constants/constants.js)
    attributes: [
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
    ]
  }, (response) => {
    const optionsForm = document.getElementById('options-form');
    if (response.attributes && response.attributes.length && response.attributes.length > 0) {
      response.attributes.sort(function(a, b) { return a.position - b.position; });
      response.attributes.forEach(attribute => {
        addAttributeInputToForm(optionsForm, attribute)
      });
    }
      addStatusAndSaveMarkup(optionsForm)
  });
}

// optionsForm: relevant div
// attribute: attribute retrieved from storage
function addAttributeInputToForm(optionsForm, attribute) {
  if (attribute.name) {
    const attributeId = attribute.name.toLowerCase().replace(/\s/g, '-');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<label>${attribute.name}
      <input type="number" id="${attributeId}" name="${attribute.name}" class="attribute" camelcasename="${attribute.camelCaseName}" style="width:100px;" />
    </label>
    <br />`;
    optionsForm.appendChild(newDiv);
    document.getElementById(attributeId).value = attribute.position;
  }
}

/*******************************************************************************************/

// optionsForm: relevant div
function addStatusAndSaveMarkup(optionsForm) {
  let statusAndSaveMarkup = document.createElement('div');
  statusAndSaveMarkup.innerHTML = `<div id="status"></div><button id="save">Save</button>`;
  optionsForm.appendChild(statusAndSaveMarkup);
  document.getElementById('save').addEventListener('click', saveOptions);
}

function saveOptions() {
  let attributesToSave = [];
  let inputs = [].slice.call(document.getElementsByClassName('attribute'))
  inputs.forEach(input => {
    attributesToSave.push({ name: input.name, camelCaseName: input.getAttribute('camelcasename'), position: parseInt(input.value) })
  });
  chrome.storage.sync.set({
    attributes: attributesToSave
  }, () => {
    // TODO: re-sort and remove/re-add the attributes from/to the DOM
    showOptionsSavedFeedback();
  });
}

function showOptionsSavedFeedback() {
  const status = document.getElementById('status');
    status.textContent = 'Options saved';
    setTimeout(() => {
      status.textContent = '';
    }, 1000);
    // TODO: Close the modal?!
}

document.addEventListener('DOMContentLoaded', restoreOptions);