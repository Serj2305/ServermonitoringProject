from flask import Flask, render_template, request, jsonify
import requests
import database

app = Flask(__name__)


# загрузка страницы index
@app.route('/', methods=['GET', 'POST', 'DELETE'])
def index():
    return render_template('index.html')


# получение списка серверов из бд
@app.route('/servers_list', methods=['GET'])
def getting_server_data():
    data_from_database = database.data_packaging()
    return jsonify(data_from_database)


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
        version = getting_url(url)
        url = clearing_url(url)
        database.enter_data_in_db(name, description, url)
    except Exception:
        version = 'Нет данных'
    return jsonify(version)


# удаление сервера из списка серверов
@app.route('/delete_data', methods=['POST'])
def delete_server():
    name = request.data
    database.deleting_data(name.decode('utf-8'))
    return name


# обработка url
def getting_url(url):
    info = requests.get(f'{url}').json()
    version = info['data']['version']
    return version


# убирает все лишние символы в url для более корректного вывода в списке подключенных серверов
def clearing_url(url):
    url = url.split('/')[2]
    return url


if __name__ == '__main__':
    app.run(debug=True)
