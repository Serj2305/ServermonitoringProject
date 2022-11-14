const popup = document.querySelector('.popup');
const buttonOpen = document.querySelector('.button-add');
const buttonClose = document.querySelector('.close-popup');
const form = document.querySelector('#integration-form')
buttonOpen.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.remove('hidden');
    vote();
} );
buttonClose.addEventListener('click', () => {
    popup.classList.add('hidden');
});

function getXmlHttp(){
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }

function vote() {
	// (1) создать объект для запроса к серверу
	var req = getXmlHttp()  
    const formContent = new FormData(form);//сериализуем данные формы

        // (2)
	// span рядом с кнопкой
	// в нем будем отображать ход выполнения
	var statusElem = document.querySelector('.vote-status') 
	
	req.onreadystatechange = function() {  
        // onreadystatechange активируется при получении ответа сервера

		if (req.readyState == 4) { 
            // если запрос закончил выполняться

			statusElem.innerHTML = req.statusText // показать статус (Not Found, ОК..)

			if(req.status == 200) { 
                 // если статус 200 (ОК) - выдать ответ пользователю
				alert(req.responseText);
			}
			// тут можно добавить else с обработкой ошибок запроса
		}

	}

       // (3) задать адрес подключения
	req.open(form.method, form.action, true);  

	// объект запроса подготовлен: указан адрес и создана функция onreadystatechange
	// для обработки ответа сервера
	 
        // (4)
	req.send(formContent);  // отослать запрос
  
        // (5)
	statusElem.innerHTML = 'Ожидаю ответа сервера...' 
}
