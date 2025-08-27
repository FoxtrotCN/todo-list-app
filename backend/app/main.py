from fastapi import FastAPI
from .core.db import create_db_and_tables
from .api import endpoints


app = FastAPI()
app.include_router(endpoints.router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()



