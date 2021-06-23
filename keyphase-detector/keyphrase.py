import spacy
from collections import Counter
from string import punctuation

nlp = spacy.load("en_core_web_sm")

def get_hotwords(text):
    result = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN'] 
    doc = nlp(text.lower()) 
    for token in doc:
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        if(token.pos_ in pos_tag):
            result.append(token.text)
                
    return result

# output = get_hotwords('''if you want something you've never had before you must do something you've never done before years of tragedy inside only to realise what is known that you can be anything you dream dream dream in your dreams come true and your passion and take a look in the face and a bracelet with time is now the moment is now who live in yourself but I believe this to be true to world needs more''')
# print(output)