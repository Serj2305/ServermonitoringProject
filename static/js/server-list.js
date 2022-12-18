const serversList = document.querySelector('.servers-list');
const serversItemTemplate = document.querySelector('#servers-item-template').content;
const numberServers = document.querySelector('.number-of-servers');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.close-popup')
const deleteServerButton = popup.querySelector('.button-delete input');
const popupDescriptionServer = popup.querySelector('.popup-description-server');
const popupNameServer = popup.querySelector('.popup-name-server');

function openPopup(currentServer) {
    popup.classList.remove('hidden');
    popupNameServer.textContent = currentServer[1].name;
    popupDescriptionServer.textContent = currentServer[1].description;
};
closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});
deleteServerButton.addEventListener('click', () => {
    deleteElement = document.querySelector('[data-name="'+popupNameServer.textContent+'"]');
    deleteElement.remove();
    numberServers.innerHTML = serversList.childElementCount - 1;
    popup.classList.add('hidden');
    fetch('/delete_data', {
        method: 'POST',
        body: JSON.stringify(popupNameServer.textContent)
    }).then((response)=> {
        if(!response.ok) {
            serversList.appendChild(deleteElement);
            numberServers.innerHTML = serversList.childElementCount - 1;
            alert('Не удалось удалить сервер, перезагрузите страницу и попробуйте снова');
        }
     }).catch(() => alert('Не удалось удалить сервер, перезагрузите страницу и попробуйте снова'));
});

function appendServer(servers) {
    const fragment = document.createDocumentFragment();
    numberServers.innerHTML = Object.keys(servers).length
    Object.entries(servers).forEach(function(server) {
        const serversItem = serversItemTemplate.cloneNode(true)
        serversItem.querySelector('.name-value').textContent = server[1].name;
        serversItem.querySelector('.name-value').addEventListener('click', () => openPopup(server));
        serversItem.querySelector('.url-value').textContent = server[1].url;
        serversItem.querySelector('.problems-count-value').textContent = server[1].problems;
        serversItem.querySelector('.objects-count-value').textContent = server[1].objects;
        serversItem.querySelector('.item-value').dataset.name = server[1].name;
        fragment.appendChild(serversItem);
    });
    serversList.appendChild(fragment);
};

function createReq() {
    fetch('servers_list')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
      appendServer(data)
  }).catch(function (error) {
      alert(error)
  });
 };

createReq()