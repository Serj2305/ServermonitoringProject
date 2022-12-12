const serversList = document.querySelector('.servers-list');
const serversItemTemplate = document.querySelector('#servers-item-template').content;
const numberServers = document.querySelector('.number-of-servers')
const fakeResponse = {
    server1:
        {
            name: "server1",
            url: 'https://translated.turbopages.org/proxy_u/en-ru.ru.d830d88c-638d98c1-bce4efad-74722d776562/https/stackoverflow.com/questions/60406448/how-to-add-a-list-item-to-an-existing-list-using-javascript',
            problems: 10,
            objects: 5
        },
    server2:
        {
            name: "server2",
            url: 'https://webtricks-master.ru/javascript/uchimsya-kodit-na-javascript-fetch-api-razbiraem-raboty-fetch-na-primerah/', 
            problems: 19,
            objects: 2
        },
    server3:
        {
            name: 'server3',
            url: 'https://www.cyberforum.ru/html/thread1576776.html',
            problems: 8,
            objects: 13
        }
    
};

function appendServer(servers) {
    const fragment = document.createDocumentFragment();
    numberServers.innerHTML = Object.keys(servers).length
    Object.entries(servers).forEach(function(server) {
        console.log(server)
        const serversItem = serversItemTemplate.cloneNode(true)
        serversItem.querySelector('.name-value').textContent = server[1].name;
        serversItem.querySelector('.url-value').textContent = server[1].url;
        serversItem.querySelector('.problems-count-value').textContent = server[1].problems;
        serversItem.querySelector('.objects-count-value').textContent = server[1].objects;
        fragment.appendChild(serversItem);
    });
    serversList.appendChild(fragment);
};

// async function getListServers() {
//     try {
//       let response = await fetch('#' , {
//         method : "GET"
//       });
//       let servers = await response;
//       appendServer(servers)
//     } catch(error) {
//       alert(error);
//     }
//   };
  
//   getListServers()

appendServer(fakeResponse);