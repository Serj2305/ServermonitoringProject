const objectsItemTemplate = document.querySelector('#objects-item-template').content;
const objectsList = document.querySelector('.objects-list');
const filterServersItems = document.getElementsByClassName('filter-servers-item');
const filterServers = document.querySelector('.server-filter');
const filterServersItemTemplate = document.querySelector('#filter-servers-item-template').content;

const fakeResponse = {
        object1:
        {
            server: "Server1",
            description: '3455urtesf'
        },
        object2:
        {
            server: "Server2",
            description: '3455urtesfasd'
        },
        object3:
        {
            server: "Server1",
            description: '3455urtesfasdsad'
        }
};

function appendObject(objects) {
    const fragment = document.createDocumentFragment();
    Object.entries(objects).forEach(function(object) {
        const objectsItem = objectsItemTemplate.cloneNode(true)
        objectsItem.querySelector('.name-server-value').textContent = object[1].server;
        objectsItem.querySelector('.name-object-value').textContent = object[0];
        objectsItem.querySelector('.description-object-value').textContent = object[1].description;
        objectsItem.querySelector('.item-value').dataset.server = object[1].server;
        fragment.appendChild(objectsItem);
        appendFilterServersItem(object);
    });
    objectsList.appendChild(fragment);
};

function appendFilterServersItem(currentName) {
    let flag = false;
    Object.entries(filterServersItems).forEach(function(item) {
        if(currentName[1].server === item[1].textContent){
            flag = true;
        }
    });
    if(flag === false) {
        const newItem = filterServersItemTemplate.cloneNode(true);
        newItem.querySelector('.filter-servers-item').value = currentName[1].server;
        newItem.querySelector('.filter-servers-item').textContent = currentName[1].server;
        filterServers.appendChild(newItem);
    }
}

function createReq() {
    fetch('objects_list')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    appendObject(data)
  }).catch(function (error) {
      alert(error)
  });
 };
createReq()
