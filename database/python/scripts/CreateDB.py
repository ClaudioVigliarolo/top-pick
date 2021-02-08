# usage: python CreateDB.py
# example usage: python CreateDB.py --prefix EN
# We insert the data from /data/PREFIX/ to the db
import time
import sys
import os
import argparse
from sqlite3 import connect
from constants.core import get_category
from constants.core import get_topic

# Instantiate the parser
parser = argparse.ArgumentParser(description='Add given language to DB')
parser.add_argument('--prefix', type=str,
                    help='A prefix is required to name the DB')

args = parser.parse_args()
print("The name of db will be topics"+args.prefix)

LANG_PREFIX = args.prefix
# check if line is not empty
MIN_CHAR = 2
# topics source
DEF_SOURCE = "ESL, TopPicks"

# should be contained in categories file
DEF_CATEG = get_category("all", LANG_PREFIX)

# topics path
topics_path = "../../data/" + LANG_PREFIX + "/topics/"

# file containing categories
categories = "../../data/" + LANG_PREFIX + "/categories/categories"


conn = connect('../../db/current.db')
curs = conn.cursor()


# initial cleanup
curs.execute('DROP TABLE IF EXISTS categories'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS topics'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS category_topics'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS questions'+LANG_PREFIX)


# create categories table
curs.execute('CREATE TABLE categories'+LANG_PREFIX +
             ' ( "title" TEXT, PRIMARY KEY("title"))')


# populate categories table
with open(categories) as file_in:
    for line in file_in:
        categ = line.split()[0]
        if get_category(categ, LANG_PREFIX):
            curs.execute("INSERT INTO categories"+LANG_PREFIX +
                         "(title) VALUES (?)", (get_category(categ, LANG_PREFIX),))

# create topics table
curs.execute('CREATE TABLE topics'+LANG_PREFIX +
             '( "title" TEXT, "source" TEXT, PRIMARY KEY("title"))')


# populate topics table
for topic_item_path in os.listdir(topics_path):
    topic = os.path.basename(topic_item_path)
    # discard pesky hidden files
    if get_topic(topic, LANG_PREFIX):
        curs.execute('''INSERT INTO topics'''+LANG_PREFIX+''' (title,source)
                    values (?,?)''',
                     (get_topic(topic, LANG_PREFIX), DEF_SOURCE))


# create questions table
curs.execute('''CREATE TABLE questions'''+LANG_PREFIX + ''' (
	"id"	integer,
	"topic"	TEXT,
	"title"	TEXT,
	"liked"	NUMERIC DEFAULT 0,
	FOREIGN KEY("topic") REFERENCES "topics"("title"),
	PRIMARY KEY("id" AUTOINCREMENT)
)''')

# populate questions table
for topic_item_path in os.listdir(topics_path):
    with open(topics_path + topic_item_path) as file_in:
        topic = os.path.basename(topic_item_path)
        if not topic.startswith("."):
            for line in file_in:
                if get_topic(topic, LANG_PREFIX):
                    curs.execute('''INSERT INTO questions'''+LANG_PREFIX + ''' (id, topic, title)
                            values (NULL, ?,?)''',
                                 (get_topic(topic, LANG_PREFIX), line))


# create category_topics
curs.execute('''CREATE TABLE category_topics'''+LANG_PREFIX + ''' (
	"category"	TEXT,
	"topic"	TEXT,
	FOREIGN KEY("topic") REFERENCES "topics"("title"),
	FOREIGN KEY("category") REFERENCES "category"("title"),
	PRIMARY KEY("category","topic")
)''')


# by default the categ DEF_CATEG will contain all topics
# add all topics to DEF_CATEG
for topic_item_path in os.listdir(topics_path):
    with open(topics_path + topic_item_path) as file_in:
        topic = os.path.basename(topic_item_path)
        if get_topic(topic, LANG_PREFIX):
            curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX + ''' (category, topic)
                            values (?,?)''',
                         (DEF_CATEG, get_topic(topic, LANG_PREFIX)))


# assign topics to each category
# we take the list of associated topics after char ":" in category file

# populate categories table
with open(categories) as file_in:
    for line in file_in:
        categ = line.split()[0]
        topicsList = line[line.find(":")+1:].split()
        for topic in topicsList:
            if get_topic(topic, LANG_PREFIX) and get_category(categ, LANG_PREFIX):
                curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX + ''' (category, topic)
                                values (?,?)''',
                             (get_category(categ, LANG_PREFIX), get_topic(topic, LANG_PREFIX)))

conn.commit()
