#usage: python CreateDB.py
#example usage: python CreateDB.py --prefix EN 
# We insert the data from /data/PREFIX/ to the db

import argparse
import os
import sys
import time
from sqlite3 import connect


# Instantiate the parser
parser = argparse.ArgumentParser(description='Add given language to DB')
parser.add_argument('--prefix', type=str,
                    help='A prefix is required to name the DB')

args = parser.parse_args()
print("The name of db will be topics"+args.prefix)

LANG_PREFIX = args.prefix
#check if line is not empty
MIN_CHAR=2
#topics source 
DEF_SOURCE="ESL, TopPicks"

#should be contained in categories file
DEF_CATEG="all"

#topics path
topics_path = "../../data/"+ LANG_PREFIX + "/topics/"

#file containing categories
categories = "../../data/"+ LANG_PREFIX + "/categories/categories"



conn = connect('../../database/current.db')
curs = conn.cursor()


#initial cleanup
curs.execute('DROP TABLE IF EXISTS categories'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS topics'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS category_topics'+LANG_PREFIX)
curs.execute('DROP TABLE IF EXISTS questions'+LANG_PREFIX)




#create categories table
curs.execute('CREATE TABLE categories'+LANG_PREFIX+' ( "title" TEXT, PRIMARY KEY("title"))')




#populate categories table
with open(categories) as file_in:
    for line in file_in:
        categ=line.split()[0]
        if len(categ)>MIN_CHAR:
            curs.execute("INSERT INTO categories"+LANG_PREFIX+"(title) VALUES (?)", (categ,))



#create topics table
curs.execute('CREATE TABLE topics'+LANG_PREFIX +'( "title" TEXT, "source" TEXT, PRIMARY KEY("title"))')



#populate topics table
for topic_item_path in os.listdir(topics_path):
    topic=os.path.basename(topic_item_path)
    #discard pesky hidden files 
    if not topic.startswith("."): 
        curs.execute('''INSERT INTO topics'''+LANG_PREFIX+''' (title,source)
                    values (?,?)''',
                    (topic, DEF_SOURCE))
                

#create questions table
curs.execute('''CREATE TABLE questions'''+LANG_PREFIX+ ''' (
	"id"	integer,
	"topic"	TEXT,
	"title"	TEXT,
	"liked"	NUMERIC DEFAULT 0,
	FOREIGN KEY("topic") REFERENCES "topics"("title"),
	PRIMARY KEY("id" AUTOINCREMENT)
)''')

#populate questions table
for topic_item_path in os.listdir(topics_path):
    with open(topics_path + topic_item_path) as file_in:
        topic=os.path.basename(topic_item_path)
        if not topic.startswith("."): 
            for line in file_in:
                if line and len(line) > MIN_CHAR:
                    curs.execute('''INSERT INTO questions'''+LANG_PREFIX+ ''' (id, topic, title)
                            values (NULL, ?,?)''',
                            (topic, line)) 


#create category_topics
curs.execute('''CREATE TABLE category_topics'''+LANG_PREFIX+ ''' (
	"category"	TEXT,
	"topic"	TEXT,
	FOREIGN KEY("topic") REFERENCES "topics"("title"),
	FOREIGN KEY("category") REFERENCES "category"("title"),
	PRIMARY KEY("category","topic")
)''')


#by default the categ DEF_CATEG will contain all topics
#add all topics to DEF_CATEG
for topic_item_path in os.listdir(topics_path):
    with open(topics_path + topic_item_path) as file_in:
        topic=os.path.basename(topic_item_path)
        if not topic.startswith("."): 
            curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX+ ''' (category, topic)
                            values (?,?)''',
                            (DEF_CATEG, topic))

    
    


#assign topics to each category
#we take the list of associated topics after char ":" in category file

#populate categories table
with open(categories) as file_in:
    for line in file_in:
        categ=line.split()[0]
        topicsList=line[line.find(":")+1:].split()
        for topic in topicsList:
            curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX+ ''' (category, topic)
                            values (?,?)''',
                            (categ, topic))

conn.commit()