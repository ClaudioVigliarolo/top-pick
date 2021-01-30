
#usage: python textParser.py
#example usage: python textParser.py --dir
import argparse
import os
import sys

# Instantiate the parser
parser = argparse.ArgumentParser(description='Parse files in given directory')
parser.add_argument('--dir', type=str,
                    help='Path to dir to parse')

args = parser.parse_args()

target_path = args.dir

#translate topics and questions
for topic_item_path in os.listdir(target_path):
    with open(target_path + "/"+topic_item_path, 'r') as f:
        lines = f.readlines()
        with open(target_path + "/"+topic_item_path, 'w') as f:
            for line in lines:
                line = line.replace('  ', '\n') 
                f.write(line)