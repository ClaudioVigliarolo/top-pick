#!/usr/bin/python

from __future__ import print_function
from sqlite3 import connect

# Replace username with your own A2 Hosting account username:
conn = connect('/Users/claudio/Documents/currentDB.db')
curs = conn.cursor()

curs.execute("CREATE TABLE employees (firstname varchar(32), lastname varchar(32), title varchar(32));")
curs.execute("INSERT INTO employees VALUES('Kelly', 'Koe', 'Engineer');")
conn.commit()

curs.execute("SELECT firstname, lastname FROM employees;")
for firstname, lastname in curs.fetchall():
    print(firstname, lastname)

conn.close()

with open("file.txt") as file_in:
    lines = []
    for line in file_in:
        lines.append(line)