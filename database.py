import sqlite3

connection = sqlite3.connect('serverInformation.db', check_same_thread=False)
cursor = connection.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS serverinformation(
   name TEXT PRIMARY KEY,
   description TEXT,
   url TEXT,
   problems TEXT,
   objects TEXT,
   date TEXT);
""")
connection.commit()


def enter_data_in_db(name, description, url, problems='0', objects='0', date='20191102-16:19:59'):
    cursor.execute(f"""REPLACE INTO serverinformation(name, description, url, problems, objects, date) 
        VALUES('{name}', '{description}', '{url}', '{problems}', '{objects}', '{date}');""")
    connection.commit()


def data_packaging():
    sqlite_select_query = """SELECT * from serverinformation"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()
    data_from_database = {}
    number_of_server = 0
    for row in records:
        number_of_server += 1
        data_from_database[f'{number_of_server}'] = {'name': row[0], 'description': row[1], 'url': row[2], 'problems' : row[3], 'objects' : row[4]}
    return data_from_database


def deleting_data(name_of_server):
    sqlite_connection = sqlite3.connect('serverInformation.db')
    cur = sqlite_connection.cursor()

    sql_delete_query = f"""DELETE from serverInformation where name = {name_of_server}"""
    cur.execute(sql_delete_query)
    sqlite_connection.commit()
    cur.close()
