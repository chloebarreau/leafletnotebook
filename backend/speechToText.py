import io
import os

# Imports the Google Cloud client library
#from google.cloud import speech
from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import enums
from google.cloud.speech_v1p1beta1 import types


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "../Leaflet-8293d10532a5.json"

# Instantiates a client
client = speech_v1p1beta1.SpeechClient() # for distinguishing speakers

# The name of the audio file to transcribe
file_name = os.path.join(
    os.path.dirname(__file__),
    'audio.flac')

def getText(file_name): 
    
    # Loads the audio into memory
    with io.open(file_name, 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)


    config = types.RecognitionConfig(
        model='video',
        encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
        language_code='en-US',
        enable_speaker_diarization=True,
        enable_automatic_punctuation=True,
        enable_word_time_offsets=True)


    # Detects speech in the audio fileg
    response = client.recognize(config, audio)

    result = response.results[-1]

    words_info = result.alternatives[0].words

    tag=1
    speakerWords=""
    timestamps=[]
    transcript=""
    text=[]

    for word in words_info:
        #print("getting word")
        if word.speaker_tag==tag:
            speakerWords=speakerWords+" "+word.word

        else:
            transcript += "{}:: {} !!!".format(tag,speakerWords)  # later parse out the speakers when printing transcript, :: is unlikely anywhere else
            tag=word.speaker_tag
            speakerWords=""+word.word
        
        timestamps.append(float(str(word.start_time.seconds) + '.' + str(word.start_time.nanos)))

    transcript += "{}:: {}".format(tag, speakerWords)
    print(timestamps)
    text = transcript.split('!!!')
    print(text)
    return text, timestamps

    '''
  for word in words_info:
        #print("getting word")
        if word.speaker_tag==tag:
            speakerWords=speakerWords+" "+word.word

        else:
            print("speaker {}: {}".format(tag,speaker))
            tag=word.speaker_tag
            speakerWords=""+word.word

        timestamps.append(float(str(word.start_time.seconds) + '.' + str(word.start_time.nanos)))

    print("Speaker {}: {}".format(tag, speaker))
    print(timestamps)
        '''