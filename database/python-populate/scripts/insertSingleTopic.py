
#!/usr/bin/python

#usage ./insertTopics.py topic file name
import os.path
from sqlite3 import connect
import sys

conn = connect('/Users/claudio/Documents/DATABASE_TEMP/current.db')
curs = conn.cursor()

topic =   sys.argv[1]

topicPath =   os.path.dirname(__file__) + '../topics/'+ topic

print("top", topic)
print("PICK", topicPath)



with open(topicPath) as file_in:
    lines = []
    for line in file_in:
        formatted_line = unicode(line, "utf-8")
        if formatted_line:
            curs.execute('''INSERT INTO questions (id, topic, title)
                    values (NULL, ?,?)''',
                    (topic, formatted_line))

conn.commit()

