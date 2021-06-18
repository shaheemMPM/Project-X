import os
import shutil
from model import *
from fastapi import FastAPI, File, UploadFile


app = FastAPI()

out_file_path = "./files/file1.wav"

@app.post("/")
async def post_voice(file: UploadFile=File(...)):
    with open('files/test.wav', "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return{file.filename}

@app.get("/")
async def get_text():
    a = recognize('files/test.wav')
    os.remove('files/test.wav')
    return{a}