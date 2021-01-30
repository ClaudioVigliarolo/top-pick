from google_trans_new import google_translator  

#simple function to detect and translate text 
def detect_and_translate(text,target_lang):
        translator = google_translator()
        translate_text = translator.translate(text,lang_src='en',lang_tgt='it')
        return translate_text 


sentence = "I hope that, when I've built up my savings, I'll be able to travel to Mexico"

print(detect_and_translate(sentence,target_lang='sw'))


'''
sentences = ['Bienvenu', 'Comment allez-vous', 'je vais bien']
result = translator.translate(sentences, src='fr', dest='it')

for trans in result:
    print(f'{trans.origin} -> {trans.text}')





from googletrans import Translator

file_translate = Translator()


f = open('C:\\Users\\Khurram\\Desktop\\test.txt', 'r')
if f.mode == 'r':
contents = f.read()
print(contents)


result = translator.translate(contents, dest='fr')
print(result.text)


with open('C:\\Users\\Khurram\\Desktop\\test_2.txt', 'w') as f:
    f.write(result.text)



'''