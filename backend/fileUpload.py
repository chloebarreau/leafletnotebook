# Run this before uploading files!!!

import sys
sys.path.append('/Users/gkzhou/Dropbox/Code/leafletnotebook/backend') # without this line it says there's no module named "leafletvision"
import os
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

print(sys.path)
import leafletvision

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__))
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    if request.method == 'POST':
        target=os.path.join(UPLOAD_FOLDER,'static')

        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload")
        file = request.files['file'] 
        filename = secure_filename(file.filename)
        destination="/".join([target, filename])
        file.save(destination)

        session['uploadFilePath']=destination

        text = leafletvision.getText(destination)
        return jsonify(filename=filename, destination=destination, text=text)
    else:
        return "getting"

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)