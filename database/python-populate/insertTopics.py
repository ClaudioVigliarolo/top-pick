
#!/usr/bin/python
from __future__ import print_function
from sqlite3 import connect
import sys

conn = connect('/Users/claudio/Documents/currentDB2.db')
curs = conn.cursor()

topic = sys.argv[1]

curs.execute('''INSERT INTO topics (title, source)
                  values (?,?)''',
                  (topic, "ESL"))



with open(topic) as file_in:
    lines = []
    for line in file_in:
        formatted_line = unicode(line, "utf-8")
        curs.execute('''INSERT INTO questions (topic, title)
                  values (?,?)''',
                  (topic, formatted_line))

conn.commit()