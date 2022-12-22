const filtServers = document.querySelector('.server-filter');
const problems = document.querySelectorAll('.problems-list-item');
const filtDate = document.querySelector('.date-filter');

filtServers.onchange = function () {
    for (let problem of problems) {
      if (problem.dataset.server !== filtServers.value && filtServers.value !== 'All-servers' && problem.classList.contains('item-value')) {
        problem.classList.add('hidden-server');
      } else {
        problem.classList.remove('hidden-server');
      }
    }
};

filtDate.onchange = function () {
    for (let problem of problems) {
      if (problem.dataset.date !== filtDate.value && filtDate.value !== 'All-dates' && problem.classList.contains('item-value')) {
        problem.classList.add('hidden-date');
      } else {
        problem.classList.remove('hidden-date');
      }
    }
  };