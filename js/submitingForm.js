const popup = document.querySelector('.popup');
const buttonOpen = document.querySelector('.button-add');
const buttonClose = document.querySelector('.close-popup');
const form = document.querySelector('#integration-form')
buttonOpen.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.remove('hidden');
    const statusElem = document.querySelector('.vote-status');
    const content = new FormData(form);
    createReq(content, statusElem);
} );
buttonClose.addEventListener('click', () => {
    popup.classList.add('hidden');
});


function createReq(formContent,elem) {
  fetch(form.action, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(formContent)
}).then((response) => {
    if(response.ok) {

      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
}).then((data) => {
    elem.innerHtml = data;
}).catch(function (error) {
    elem.innerHTML = error;
});
};