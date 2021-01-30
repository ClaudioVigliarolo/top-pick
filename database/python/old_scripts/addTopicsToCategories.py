
from __future__ import print_function
from sqlite3 import connect
import sys
'''
all
languages
friends
school
relax
romance
holidays
'''

#category => topic
conn = connect('/Users/claudio/Documents/currentDB2.db')
curs = conn.cursor()
topic = sys.argv[1]

categories = sys.argv

# "all" category: always put here
curs.execute('''INSERT INTO category_topics (category, topic)
                values (?,?)''',
                ("all", topic))

for i in range(2, len(categories)):
    curs.execute('''INSERT INTO category_topics (category, topic)
                  values (?,?)''',
                  (categories[i], topic))
    
conn.commit()