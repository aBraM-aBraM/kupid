from io import BytesIO

from fastapi import FastAPI, UploadFile
from kupid import attractiveness_tester

app = FastAPI()


# Example request
# with open("woman.jpg", "rb") as fo:
#     import requests
#     print(requests.post("http://localhost:6969/uploadfile/", files={'file': fo}).text)

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    file_content = file.file.read()

    file_object = BytesIO(file_content)
    return attractiveness_tester.load(file_object)
