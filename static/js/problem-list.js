const problemsList = document.querySelector('.problems-list');
const problemsItemTemplate = document.querySelector('#problems-item-template').content;
const filterServers = document.querySelector('.server-filter');
const filterServersItems = document.getElementsByClassName('filter-servers-item');
const filterDate = document.querySelector('#date-filter');
const filterDateItems = document.getElementsByClassName('filter-date-item');
const filterServersItemTemplate = document.querySelector('#filter-servers-item-template').content;
const filterDateItemTemplate = document.querySelector('#filter-date-item-template').content;


const fakeResponse = {
    problem1:
        {
            nameServer: "Server1",
            nameProblem: 'Problem1',
            nameObject: 'Object1',
            date: '12.10.2022'
        },
    problem2:
        {
            nameServer: "Server2",
            nameProblem: 'Problem2',
            nameObject: 'Object2',
            date: '12.11.2022'
        },
    problem3:
        {
            nameServer: "Server3",
            nameProblem: 'Problem3',
            nameObject: 'Object3',
            date: '12.12.2022'
        },
        problem4:
        {
            nameServer: "Server5",
            nameProblem: 'Problem4',
            nameObject: 'Object4',
            date: '12.01.2022'
        },
    problem5:
        {
            nameServer: "Server7",
            nameProblem: 'Problem5',
            nameObject: 'Object4',
            date: '12.04.2022'
        },
    problem6:
        {
            nameServer: "Server4",
            nameProblem: 'Problem6',
            nameObject: 'Object4',
            date: '12.06.2022'
        },
        problem7:
        {
            nameServer: "Server3",
            nameProblem: 'Problem7',
            nameObject: 'Object4',
            date: '11.10.2022'
        },
    problem8:
        {
            nameServer: "Server1",
            nameProblem: 'Problem8',
            nameObject: 'Object2',
            date: '14.11.2022'
        },
    problem9:
        {
            nameServer: "Server3",
            nameProblem: 'Problem9',
            nameObject: 'Object1',
            date: '12.12.2022'
        },
        problem10:
        {
            nameServer: "Server7",
            nameProblem: 'Problem10',
            nameObject: 'Object3',
            date: '15.10.2022'
        },
    problem11:
        {
            nameServer: "Server4",
            nameProblem: 'Problem11',
            nameObject: 'Object2',
            date: '12.01.2022'
        },
    problem12:
        {
            nameServer: "Server3",
            nameProblem: 'Problem12',
            nameObject: 'Object2',
            date: '16.12.2022'
        },
        problem13:
        {
            nameServer: "Server1",
            nameProblem: 'Problem13',
            nameObject: 'Object10',
            date: '12.09.2022'
        },
    problem14:
        {
            nameServer: "Server2",
            nameProblem: 'Problem14',
            nameObject: 'Object15',
            date: '12.11.2022'
        },
    problem15:
        {
            nameServer: "Server3",
            nameProblem: 'Problem15',
            nameObject: 'Object13',
            date: '12.12.2022'
        }
    
};

function appendProblem(problems) {
    const fragment = document.createDocumentFragment();
    Object.entries(problems).forEach(function(problem) {
        const problemsItem = problemsItemTemplate.cloneNode(true)
        problemsItem.querySelector('.name-server-value').textContent = problem[1].nameServer;
        problemsItem.querySelector('.name-object-value').textContent = problem[1].nameObject;
        problemsItem.querySelector('.name-problem-value').textContent = problem[1].nameProblem;
        problemsItem.querySelector('.date-value').textContent = problem[1].date;
        problemsItem.querySelector('.item-value').dataset.date = problem[1].date;
        problemsItem.querySelector('.item-value').dataset.server = problem[1].nameServer;
        fragment.appendChild(problemsItem);
        appendFilterServersItem(problem);
        appendFilterDateItem(problem);
    });
    problemsList.appendChild(fragment);
};

function appendFilterServersItem(currentName) {
    let flag = false;
    Object.entries(filterServersItems).forEach(function(item) {
        if(currentName[1].nameServer === item[1].textContent){
            flag = true;
        }
    });
    if(flag === false) {
        const newItem = filterServersItemTemplate.cloneNode(true);
        newItem.querySelector('.filter-servers-item').value = currentName[1].nameServer;
        newItem.querySelector('.filter-servers-item').textContent = currentName[1].nameServer;
        filterServers.appendChild(newItem);
    }
}

function appendFilterDateItem(currentName) {
    let flag = false;
    Object.entries(filterDateItems).forEach(function(item) {
        if(currentName[1].date === item[1].textContent){
            flag = true;
        }
    });
    if(flag === false) {
        const newItem = filterDateItemTemplate.cloneNode(true);
        newItem.querySelector('.filter-date-item').value = currentName[1].date;
        newItem.querySelector('.filter-date-item').textContent = currentName[1].date;
        filterDate.appendChild(newItem);
    }
}


appendProblem(fakeResponse);