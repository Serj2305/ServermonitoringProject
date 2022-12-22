const filtServers = document.querySelector('.server-filter');
const objects = document.querySelectorAll('.objects-list-item');


filtServers.onchange = function () {
    for (let object of objects) {
      if (object.dataset.server !== filtServers.value && filtServers.value !== 'All-servers' && object.classList.contains('item-value')) {
        object.classList.add('hidden-server');
      } else {
        object.classList.remove('hidden-server');
      }
    }
};