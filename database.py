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
