import sqlite3

connection = sqlite3.connect('serverInformation.db', check_same_thread=False)
cursor = connection.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS serverinformation(
   name TEXT PRIMARY KEY,
   description TEXT,
   url TEXT,
   problems TEXT,
   objects TEXT);
""")
connection.commit()


def enter_data_in_db(name, description, url, problems, objects):
    cursor.execute(f"""REPLACE INTO serverinformation(name, description, url, problems, objects) 
        VALUES('{name}', '{description}', '{url}', '{problems}', '{objects}');""")
    connection.commit()


def data_packaging():
    sqlite_select_query = """SELECT * from serverinformation"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()
    data_from_database = {}
    number_of_server = 0
    for row in records:
        number_of_server += 1
        data_from_database[f'{number_of_server}'] = {'name': row[0], 'description': row[1], 'url': row[2],
                                                     'problems': row[3], 'objects': row[4]}
    return data_from_database


def return_len_table():
    sqlite_select_query = """SELECT * from serverInformation"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()
    return len(records)


def update_sqlite_table(count_objects):
    sqlite_connection = sqlite3.connect('serverInformation.db')
    curs = sqlite_connection.cursor()
    for i in range(count_objects):
        sql_update_query = f"""Update serverInformation set objects = {count_objects} where url = 'localhost:9090'"""
        curs.execute(sql_update_query)
    sqlite_connection.commit()
    curs.close()


def deleting_data(name_of_server):
    sqlite_connection = sqlite3.connect('serverInformation.db')
    cur = sqlite_connection.cursor()
    sql_delete_query = f"""DELETE from serverInformation where name = {name_of_server}"""
    cur.execute(sql_delete_query)
    sqlite_connection.commit()
    cur.close()
