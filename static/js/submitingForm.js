const popup = document.querySelector('.popup');
const buttonAdd = document.querySelector('.button-add');
const buttonClose = document.querySelector('.close-popup');
const form = document.querySelector('#integration-form')
buttonAdd.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(form.name.value === '') {
        alert( "Пожалуйста заполните поле c названием сервера." );
    }
    else if(form.description.value === '') {
        alert( "Пожалуйста заполните поле c описанием сервера." );
    }
    else if(form.url.value === '') {
        alert( "Пожалуйста заполните поле c url сервера." );
    }
    else{
        popup.classList.remove('hidden');
        const statusElem = document.querySelector('.vote-status');
        const content = new FormData(form);
        
        createReq(content, statusElem);
    }
} );
buttonClose.addEventListener('click', () => {
    popup.classList.add('hidden');
}); 

function createReq(formContent,elem) {
  fetch(form.action, {
    method: "POST",
    body: formContent
}).then((response) => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
}).then((data) => {
    if(data === 'Нет данных'){
        throw new Error('')
    }
    elem.innerHTML = `Сервер успешно добавлен! ${data}`;
}).catch(function (error) {
    elem.innerHTML = 'Произошла ошибка, введите корректный url!';
});
};