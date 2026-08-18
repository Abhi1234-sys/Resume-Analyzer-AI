from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_resumes(
    job_description: str = Form(...), 
    resumes: List[UploadFile] = File(...)
):
    print(f"Received Job Description: {job_description[:50]}...")
    print(f"Number of resumes received: {len(resumes)}")
    
    
    file_names = [file.filename for file in resumes]
    print(f"File Names: {file_names}")

    
    return {
        "message": "Files received successfully!",
        "job_description_length": len(job_description),
        "received_files": file_names
    }


@app.get("/")
def read_root():
    return {"message": "Resume Analyzer API is running!"}