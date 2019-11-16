import requests
import time
import csv

# If you are using a Jupyter notebook, uncomment the following line.
# %matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
from PIL import Image
from io import BytesIO
import re
import os  


# convert list of timestamps and notes to dict with timestamps as keys and notes as values
def convert(list): 
    res_dict = {list[i]: list[i + 1] for i in range(0, len(list), 2)} 
    return res_dict

def getText(image_path):
# Add your Computer Vision subscription key and endpoint to your environment variables.
    if "COMPUTER_VISION_SUBSCRIPTION_KEY" in os.environ:
        subscription_key = os.environ["COMPUTER_VISION_SUBSCRIPTION_KEY"]
    else:
        print(
            "\nSet the COMPUTER_VISION_SUBSCRIPTION_KEY environment variable.\n**Restart your shell or IDE for changes to take effect.**"
        )
        sys.exit()

    if "COMPUTER_VISION_ENDPOINT" in os.environ:
        endpoint = os.environ["COMPUTER_VISION_ENDPOINT"]

    text_recognition_url = endpoint + "vision/v2.1/read/core/asyncBatchAnalyze"

    ''' The following are used to analyze image URLs
    # Set image_url to the URL of an image that you want to analyze.
    image_url = "https://4.bp.blogspot.com/-pEv65fV9gxg/WIjaLJkFHxI/AAAAAAAAXDY/32Tyscwfp1IlVRWze_jhlWmINlNgBlPEACLcB/s1600/yt-timestamps-clickable.png"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}
    data = {"url": image_url}
    response = requests.post(text_recognition_url, headers=headers, json=data)
    response.raise_for_status()
    

    # Get local image to analyze
    image_path = "/Users/gkzhou/Dropbox/Code/leafletnotebook/backend/testnotes.JPG"
'''

    image_data = open(image_path, "rb").read()
    headers = {'Ocp-Apim-Subscription-Key': subscription_key,
            'Content-Type': 'application/octet-stream'}
    params = {'visualFeatures': 'Categories,Description,Color'}
    response = requests.post(
        text_recognition_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()


    # Extracting text requires two API calls: One call to submit the
    # image for processing, the other to retrieve the text found in the image.

    # Holds the URI used to retrieve the recognized text.
    operation_url = response.headers["Operation-Location"]

    # The recognized text isn't immediately available, so poll to wait for completion.
    analysis = {}
    poll = True
    while poll:
        response_final = requests.get(
            response.headers["Operation-Location"], headers=headers
        )
        analysis = response_final.json()
        print(analysis)
        time.sleep(1)
        if "recognitionResults" in analysis:
            poll = False
        if "status" in analysis and analysis["status"] == "Failed":
            poll = False

    polygons = []
    justText = []
    if "recognitionResults" in analysis:
        # Extract the recognized text, with bounding boxes.
        polygons = [
            (line["boundingBox"], line["text"])
            for line in analysis["recognitionResults"][0]["lines"]
        ]
        justText = [line["text"] for line in analysis["recognitionResults"][0]["lines"]] # extracts only the text


    # Display the image and overlay it with the extracted text.
    plt.figure(figsize=(15, 15))

    # This is for images from a URL
    #image = Image.open(BytesIO(requests.get(image_url).content))

    # Use for images from local drive
    image = Image.open(BytesIO(image_data))

    ax = plt.imshow(image)
    for polygon in polygons:
        vertices = [
            (polygon[0][i], polygon[0][i + 1]) for i in range(0, len(polygon[0]), 2)
        ]
        text = polygon[1]
        patch = Polygon(vertices, closed=True, fill=False, linewidth=2, color="y")
        ax.axes.add_patch(patch)
        plt.text(vertices[0][0], vertices[0][1], text, fontsize=20, va="top")

    text = " ".join(justText)
    text = re.split(r'(\d*:*\d+:\d+)', text)  # need to figure out a regex way to accept multipl correct time formats

    # Create dictionary called "notes" of timestamps called and the notes that come after each timestamp
    notes = {}
    if not text[0].startswith("\d*:*\d+:\d+"): # if notes don't start with timestamp, add beginning as assumed "title"
        notes["title"] = text[0]
        del text[0] 

    notes.update(convert(text))
    print(notes) # convert rest of list to dict and add onto dict
    return notes

    '''
    # read dictionary into csv
    with open('test.csv', 'w') as f:
        for key in notes.keys():
            f.write("%s,%s\n"%(key,notes[key]))
            '''
