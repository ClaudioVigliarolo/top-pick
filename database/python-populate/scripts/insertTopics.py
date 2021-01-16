
#!/usr/bin/python

#usage ./insertTopics.py topic file name
import os.path
from sqlite3 import connect
import sys

conn = connect('/Users/claudio/Documents/DATABASE_TEMP/current.db')
curs = conn.cursor()

topicsPath =  '/Users/claudio/Desktop/MyApp/database/python-populate/topics/'

for topicItemPath in os.listdir(topicsPath):
    with open(topicsPath + topicItemPath) as file_in:
        lines = []
        topic=os.path.basename(topicItemPath)
        if not topic.startswith("."): 
            print(topic)
            for line in file_in:
                formatted_line = unicode(line, "utf-8")
                if formatted_line and len(formatted_line) > 5:
                    curs.execute('''INSERT INTO questions (id, topic, title)
                            values (NULL, ?,?)''',
                            (topic, formatted_line))

conn.commit()






#curs.execute('''INSERT INTO topics (title, source)
#                 values (?,?)''',
#                 (topic, "ESL"))