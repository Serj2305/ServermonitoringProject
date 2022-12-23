from flask import Flask, render_template, request, jsonify
import requests
import database
from time import sleep
from threading import Thread

app = Flask(__name__)


# загрузка страницы index
@app.route('/', methods=['GET', 'POST', 'DELETE'])
def index():
    return render_template('index.html')


# загрузка страницы add_server
@app.route('/add_server', methods=['GET', 'POST', 'DELETE'])
def add_server():
    return render_template('add-server.html')


# загрузка страницы problems_page
@app.route('/problems_page_html', methods=['GET', 'POST', 'DELETE'])
def problems_page():
    return render_template('problems-page.html')


# загрузка страницы objects-page
@app.route('/objects_page_html', methods=['GET', 'POST', 'DELETE'])
def objects_page():
    return render_template('objects-page.html')


# обработка информации с полей
@app.route('/handle_data', methods=['POST'])
def processing_data_from_fields():
    name = request.form['name']
    description = request.form['description']
    url = request.form['url']
    try:
        url = clearing_url(url)
        version = getting_version_from_url(url)
        database.enter_data_in_db(name, description, url[2], f"{'0'}", f"{'0'}")
    except Exception:
        version = 'Нет данных'
    return jsonify(version)


def updating_objects_in_database(name, description, url):
    return name, description, url


# получение списка серверов из бд
@app.route('/servers_list', methods=['GET'])
def getting_server_data():
    data_from_database = database.data_packaging()
    return jsonify(data_from_database)


# удаление сервера из списка серверов
@app.route('/delete_data', methods=['POST'])
def delete_server():
    name = request.data
    database.deleting_data(name.decode('utf-8'))
    return name


# обработка url
def getting_version_from_url(url):
    prometheus_info = requests.get(f'{url[0] + "//" + url[1] + url[2] + "/api/v1/status/buildinfo"}').json()
    version = prometheus_info['data']['version']
    return version


# убирает все лишние символы в url для более корректного вывода в списке подключенных серверов
def clearing_url(url):
    url = url.split('/')
    return url


# бесконечно берёт объекты с сервера
@app.route('/objects_list', methods=['GET'])
def getting_objects_from_url():
    while True:
        try:
            url = 'http://localhost:9090/api/v1/targets/metadata'
            objects = requests.get(f'{url}').json()
            objects_dictionary = {}
            objects_dictionary_sorted = {}
            for i in objects['data']:
                objects_dictionary[f"{i['metric']}"] = {"description": i['help'], "server": i['target']['instance']}
            key_sorted = sorted(objects_dictionary)
            for i in key_sorted:
                objects_dictionary_sorted[f"{i}"] = {"description": objects_dictionary[i]['description'],
                                                     "server": objects_dictionary[i]['server']}
            sleep(0.5)
            database.update_sqlite_table(len(objects_dictionary_sorted))
            return objects_dictionary_sorted
        except Exception:
            return "{'!!!': {'description': '!!!', 'server': '!!!'}}"


th = Thread(target=getting_objects_from_url, args=())
th.start()

if __name__ == '__main__':
    app.run(debug=True)
