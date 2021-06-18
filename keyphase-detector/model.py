import speech_recognition as sr

def recognize(file):
    AUDIO_FILE = (file)

    # use the audio file as the audio source

    r = sr.Recognizer()

    with sr.AudioFile(AUDIO_FILE) as source:
        #reads the audio file. Here we use record instead of
        #listen
        audio = r.record(source)  

    try:
        return(r.recognize_google(audio, language="es-ES"))

    except sr.UnknownValueError:
        return("Could not understand audio")

    except sr.RequestError as e:
        return("Could not request results from Google Speech Recognition service; {0}".format(e))