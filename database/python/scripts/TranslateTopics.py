
#usage: python TranslateTopics.py
#example usage: python TranslateTopics.py --prefix DE --language german python TranslateTopics.py --prefix IT --language italian
#1 We translate the data created in the  1CreateRootDB.py  in other languages
#2 we create a parallel [dbname]LANG_PREFIX with translated data

import argparse
import os
import sys
import time
from sqlite3 import connect
from shutil import copyfile
from google_trans_new import google_translator 
from itertools import islice

# Instantiate the parser
parser = argparse.ArgumentParser(description='Translate questions and topics in the target language')
parser.add_argument('--language', type=str,
                    help='A language is required to translate')

parser.add_argument('--prefix', type=str,
                    help='A prefix is required to translate')

args = parser.parse_args()
print("We are translating for: "+args.language+" ("+args.prefix+")")


#function to translate text from english to target language
def translate_text(text,target_lang):
        translator = google_translator()
        translate_text = translator.translate(text,lang_src='en',lang_tgt=target_lang)
        print("we are translating topic: " + translate_text)
        return translate_text 
        

#function to translate a text file from english to target language
def translate_file_util(text,target_lang):

    while True:
        try:
            translator = google_translator()
            translated_text = translator.translate(text,lang_src='en',lang_tgt=target_lang)
        except Exception as e:
                print(str(e))
                time.sleep(10)
                continue
        break
    return (translated_text)



def translate_file(source_file, dest_file, target_lang):
    #check length
    translated_text=""
    with open(source_file, 'r') as infile:
        lines = []
        for line in infile:
            lines.append(line)
            if len(lines) >= MAX_LINES_N:
                translated_text += translate_file_util(''.join(lines),target_lang)
                lines = []
        if len(lines) > 0:
            translate_file_util(''.join(lines),target_lang)
            translated_text += translate_file_util(''.join(lines),target_lang)

    #create new file
    translated_file = open ( dest_file, 'w')
    #write translated text to target
    translated_file.write (translated_text)
    translated_file.close()



#language prefix used for google translator api and naming dbs
LANG_PREFIX = args.prefix 

#used to check if it is a line is a word
MIN_CHAR=2

#max char len accepted by google api
MAX_FILE_LEN = 4999
MAX_LINES_N = 50


SOURCE_PATH = "../../data/EN/"
DEST_PATH = "../../data/"+LANG_PREFIX + "/"

#file containing categories
categories_source_dir = SOURCE_PATH + "categories/"
categories_source_file = categories_source_dir + "categories"


categories_dest_dir = DEST_PATH + "categories/"
categories_dest_file = categories_dest_dir + "categories"


#topics path
topics_source_dir = SOURCE_PATH + "topics/"

#target topics path
topics_dest_dir = DEST_PATH + "topics/"


#create dest folder
os.mkdir(DEST_PATH[:-1]) 

#create categories folder
os.mkdir(categories_dest_dir) 

#create topics folder
os.mkdir(topics_dest_dir) 


#translate categories
# translate_file(categories_source_file, categories_dest_file, LANG_PREFIX)
copyfile(categories_source_file, categories_dest_file)


#translate topics and questions
for topic_item_path in os.listdir(topics_source_dir):
    topic=os.path.basename(topic_item_path)
    if not topic.startswith("."): 
        #translated_topic = translate_text(topic,LANG_PREFIX)
        print("translating "+topic)
        translate_file(topics_source_dir+topic, topics_dest_dir + topic ,LANG_PREFIX)



#parsing the output files 
for topic_item_path in os.listdir(topics_dest_dir):
    with open(topics_dest_dir + "/"+topic_item_path, 'r') as f:
        lines = f.readlines()
        with open(topics_dest_dir + "/"+topic_item_path, 'w') as f:
            for line in lines:
                line = line.replace('  ', '\n') 
                f.write(line)