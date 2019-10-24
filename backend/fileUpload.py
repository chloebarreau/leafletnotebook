# Run this before uploding 

import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__))
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    return "hello"
    target=os.path.join(UPLOAD_FOLDER,'test_upload_docs')

    print(target)

    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload")
    logger.info("file!!")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)

    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)