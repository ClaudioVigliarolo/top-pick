
import os.path
from sqlite3 import connect
import sys
from google_trans_new import google_translator  

# example usage: python translator.py advice 'fr'

topic =   sys.argv[1]
target_lang = sys.argv[2]
topicPath =   os.path.dirname(__file__) + '../topics/'+ topic


# simple function to detect and translate text 
def translate(text):
        translator = google_translator()
        translate_text = translator.translate(text,lang_src='en',lang_tgt=target_lang)
        return translate_text 


with open(topicPath) as file_in:
    lines = []
    for line in file_in:
        formatted_line = line
        if len(formatted_line)>5:
            print(translate(formatted_line))












