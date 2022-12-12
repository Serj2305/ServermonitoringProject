from flask import Flask, render_template, request, jsonify
import requests

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


# обработка информации с полей
@app.route('/handle_data', methods=['POST'])
def processing_data_from_fields():
    url = request.form['url']
    version = getting_url(url)
    return jsonify(version)


# обработка url
def getting_url(url):
    if url[-1] != "/":
        url = url.split("/", 3)[0] + "//" + url.split("/", 3)[2] + "/metrics"
    else:
        url = url + "/metrics"
    info = requests.get(f'{url}').content.decode("utf-8").split(sep="\n")
    version = 'NotInfoFromPython'
    for i, m in enumerate(info, 1):
        if i == 146:
            version = m
    return version


if __name__ == "__main__":
    app.run(debug=True)
