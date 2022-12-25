const serversList = document.querySelector('.servers-list');
const serversItemTemplate = document.querySelector('#servers-item-template').content;
const numberServers = document.querySelector('.number-of-servers');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.close-popup')
const deleteServerButton = popup.querySelector('.button-delete input');
const popupDescriptionServer = popup.querySelector('.popup-description-server');
const popupNameServer = popup.querySelector('.popup-name-server');
const popupObjectsCount = popup.querySelector('.popup-objects-count a');
const popupProblemsCount = popup.querySelector('.popup-servers-count a');
const openChartsIcon = document.querySelector('.open-charts');
const chartsContainer = document.querySelector('.charts-container');
const closeChartsButton = chartsContainer.querySelector('.close-charts')
const dataHistogramObjects = [];
const dataHistogramProblems = [];
const labelsHistogram = [];

function openCharts() {
    chartsContainer.classList.remove('hidden');
    var ctx1 = document.querySelector('.histogram-objects-count').getContext('2d');
    var histogramChartObjects = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labelsHistogram,
            datasets: [{
                label: 'количество объектов',
                data: dataHistogramObjects,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Объекты на серверах',
                position: 'top',
                fontSize: 16,
                padding: 20
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });
    var ctx2 = document.querySelector('.histogram-problems-count').getContext('2d');
    var histogramChartProblems = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labelsHistogram,
            datasets: [{
                label: 'количество проблем',
                data: dataHistogramProblems,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Проблемы на серверах',
                position: 'top',
                fontSize: 16,
                padding: 20
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });
}

function openPopup(currentServer) {
    popup.classList.remove('hidden');
    popupNameServer.textContent = currentServer[1].name;
    popupDescriptionServer.textContent = currentServer[1].description;
    popupObjectsCount.textContent = currentServer[1].objects;
    popupProblemsCount.textContent = currentServer[1].problems;
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
        labelsHistogram.push(server[1].name);
        dataHistogramObjects.push(Number(server[1].objects));
        dataHistogramProblems.push(Number(server[1].problems));
        const serversItem = serversItemTemplate.cloneNode(true);
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
  }).then(()=>{
      openChartsIcon.addEventListener('click', ()=> openCharts())
      closeChartsButton.addEventListener('click', () => {
        chartsContainer.classList.add('hidden');
    });
  }).catch(function (error) {
      alert(error)
  });
 };

createReq();




