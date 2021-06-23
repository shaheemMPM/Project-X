import os
import shutil
from model import *
from keyphrase import *
from fastapi import FastAPI, File, UploadFile
import uvicorn
import subprocess

app = FastAPI()

command = "ffmpeg -i files/test.mp4 -ab 160k -ac 2 -ar 44100 -vn files/test.wav"

@app.post("/")
async def post_video(file: UploadFile=File(...)):
    with open('files/test.mp4', "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    subprocess.call(command, shell=True)
    return{file.filename}

@app.get("/")
async def get_text():
    a = recognize('files/test.wav')
    os.remove('files/test.wav')
    os.remove('files/test.mp4')
    b = get_hotwords(a);
    return {"transcript": a, "keywords": b};

if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')