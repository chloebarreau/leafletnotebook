import io
import os

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "backend/Leaflet-8293d10532a5.json"

# Instantiates a client
client = speech.SpeechClient()

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
        sample_rate_hertz=44100,
        language_code='en-US')

    # Detects speech in the audio fileg
    response = client.recognize(config, audio)
    print("no response")
    for result in response.results:
        print("results:")
        print('Transcript: {}'.format(result.alternatives[0].transcript))
        return 'Transcript: {}'.format(result.alternatives[0].transcript)