
#usage: python 2CreateLanguagesDB.py
#example usage: python 2CreateLanguagesDB.py --prefix DE --language german
#1 We translate the data created in the  1CreateRootDB.py  in other languages
#2 we create a parallel [dbname]LANG_PREFIX with translated data

import argparse
import os.path
import sys
from sqlite3 import connect
from google_trans_new import google_translator 

# Instantiate the parser
parser = argparse.ArgumentParser(description='Create a translation of the root DB by specifying the target language')
parser.add_argument('--language', type=str,
                    help='A language is required to translate')

parser.add_argument('--prefix', type=str,
                    help='A prefix is required to translate')

args = parser.parse_args()
print("We are translating for: "+args.language+" ("+args.prefix+")")


#function to translate text from english to target language
def detect_and_translate(text,target_lang):
        translator = google_translator()
        translate_text = translator.translate(text,lang_src='en',lang_tgt=target_lang)
        print(translate_text)
        return translate_text 

#language prefix used for google translator api and naming dbs
LANG_PREFIX = args.prefix 

#used to check if it is a line is a word
MIN_CHAR=2

#topics source 
DEF_SOURCE="ESL, TopPicks"

#topics path
topics_path = "../../data/EN/topics/"

#file containing categories
categories = "../../data/EN/categories/categories"

#should be contained in categories file
DEF_CATEG=detect_and_translate("all", LANG_PREFIX)

#connect to local db
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
        translated_categ = detect_and_translate(categ,target_lang=LANG_PREFIX)
        if len(translated_categ)>MIN_CHAR:
            curs.execute("INSERT INTO categories"+LANG_PREFIX+"(title) VALUES (?)", (translated_categ,))


#create topics table
curs.execute('CREATE TABLE topics'+LANG_PREFIX +'( "title" TEXT, "source" TEXT, PRIMARY KEY("title"))')


#populate topics table
for topic_item_path in os.listdir(topics_path):
    topic=os.path.basename(topic_item_path)
    if not topic.startswith("."): 
        translated_topic = detect_and_translate(topic,target_lang=LANG_PREFIX)
        #discard pesky hidden files 
        curs.execute('''INSERT INTO topics'''+LANG_PREFIX+''' (title,source)
                    values (?,?)''',
                    (translated_topic, DEF_SOURCE))
                



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
            translated_topic = detect_and_translate(topic,target_lang=LANG_PREFIX)
            for line in file_in:
                if line and len(line) > MIN_CHAR:
                    translated_line = detect_and_translate(translated_topic,target_lang=LANG_PREFIX)
                    curs.execute('''INSERT INTO questions'''+LANG_PREFIX+ ''' (id, topic, title)
                            values (NULL, ?,?)''',
                            (translated_topic, translated_line)) 



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
            translated_topic = detect_and_translate(topic,target_lang=LANG_PREFIX)
            curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX+ ''' (category, topic)
                            values (?,?)''',
                            (DEF_CATEG, translated_topic))

    


#assign topics to each category
#we take the list of associated topics after char ":" in category file

#populate categories table
with open(categories) as file_in:
    for line in file_in:
        categ=line.split()[0]
        translated_categ = detect_and_translate(categ,target_lang=LANG_PREFIX)
        topicsList=line[line.find(":")+1:].split()
        for topic in topicsList:
            translated_topic = detect_and_translate(topic,target_lang=LANG_PREFIX)
            curs.execute('''INSERT INTO category_topics'''+LANG_PREFIX+ ''' (category, topic)
                            values (?,?)''',
                            (translated_categ, translated_topic))

conn.commit()