
# python insertTopicsByCategory.py categ_name topic1, topic2, topic3

from __future__ import print_function
from sqlite3 import connect
import sys
'''
all
languages
friends
school
work
relax
fun
romance
holidays
'''

# category => topic
conn = connect('/Users/claudio/Documents/currentDB2.db')
curs = conn.cursor()
category = sys.argv[1]

topics = sys.argv


# create categories


# create categories table
curs.execute('''CREATE TABLE "categoriesEN" (
	"title"	TEXT,
	PRIMARY KEY("title")''')


# create topics table
curs.execute('''CREATE TABLE "topicsEN" (
	"title"	TEXT,
    "source" TEXT,
	PRIMARY KEY("title")''')


# "all" category: always put here
curs.execute('''INSERT INTO category_topics (category, topic)
                values (?,?)''',
             ("all", topic))


for i in range(2, len(topics)):
    curs.execute('''INSERT INTO topics (title, source)
                values (?,?)''',
                 (topics[i], "ESL, TopPicks"))

conn.commit()


topicsPath = '/Users/claudio/Desktop/MyApp/database/python-populate/topics/'

for topicItemPath in os.listdir(topicsPath):
    with open(topicsPath + topicItemPath) as file_in:
        lines = []
        topic = os.path.basename(topicItemPath)
        if not topic.startswith("."):
            print(topic)
            for line in file_in:
                formatted_line = unicode(line, "utf-8")
                if formatted_line and len(formatted_line) > 5:
                    curs.execute('''INSERT INTO questions (id, topic, title)
                            values (NULL, ?,?)''',
                                 (topic, formatted_line))

conn.commit()
