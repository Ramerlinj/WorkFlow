from fastapi import FastAPI

app = FastAPI()
app.title = "API WorkFlow"
app.description = "Esta es la API de Workflow"

@app.get("/", tags=["Home"])
def home ():
    return {"messag": "Hello, World!"}