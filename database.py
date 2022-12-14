import sqlite3

connection = sqlite3.connect('serverInformation.db', check_same_thread=False)
cursor = connection.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS serverinformation(
   name TEXT PRIMARY KEY,
   description TEXT,
   url TEXT);
""")
connection.commit()


def enter_data_in_db(name, description, url):
    cursor.execute(f"""REPLACE INTO serverinformation(name, description, url) 
        VALUES('{name}', '{description}', '{url}');""")
    connection.commit()


def data_packaging():
    sqlite_select_query = """SELECT * from serverinformation"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()
    print("---------- информация о базе данных ----------")
    print("Всего серверов:", len(records))
    data_from_database = {}
    number_of_server = 0
    for row in records:
        number_of_server += 1
        data_from_database[f'сервер {number_of_server}'] = {'name': row[0], 'description': row[1], 'url': row[2]}
    print(data_from_database)
    print("---------- информация о базе данных ----------")
    return data_from_database
