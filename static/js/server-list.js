const serversList = document.querySelector('.servers-list');

const fakeResponse = {
    server1:
        {
            name: "server1",
            url: 'https://translated.turbopages.org/proxy_u/en-ru.ru.d830d88c-638d98c1-bce4efad-74722d776562/https/stackoverflow.com/questions/60406448/how-to-add-a-list-item-to-an-existing-list-using-javascript'
        },
    server2:
        {
            name: "server2",
            url: 'https://webtricks-master.ru/javascript/uchimsya-kodit-na-javascript-fetch-api-razbiraem-raboty-fetch-na-primerah/' 
        },
    server3:
        {
            name: 'server3',
            url: 'https://www.cyberforum.ru/html/thread1576776.html'
        }
    
};

function appendServer(servers) {
    const fragment = document.createDocumentFragment();
    Object.entries(servers).forEach(function(server) {
        console.log(server)
        content = `Название:${server[1].name}  url:${server[1].url}`
        const li = document.createElement('li');
        li.classList.add('server-item');
        li.textContent = content;
        fragment.appendChild(li);
    });
    serversList.appendChild(fragment);
}

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