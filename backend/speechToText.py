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
    speaker=""

    for word in words_info:
        #print("getting word")
        if word.speaker_tag==tag:
            speaker=speaker+" "+word.word

        else:
            print("speaker {}: {}".format(tag,speaker))
            tag=word.speaker_tag
            speaker=""+word.word
        print(
            u"Start time: {} seconds {} nanos".format(
                word.start_time.seconds, word.start_time.nanos
            )
        )
    print("Speaker {}: {}".format(tag, speaker))

    '''
    for result in response.results:
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))
        # Print the speaker_tag of each word
        for word in alternative.words:
            print(u"Word: {}".format(word.word))
            print(u"Speaker tag: {}".format(word.speaker_tag))


        print("results:")
        print('Transcript: {}'.format(result.alternatives[0].transcript))
        return 'Transcript: {}'.format(result.alternatives[0].transcript)
        '''