from fastapi import FastAPI
from .core.db import create_db_and_tables
from .api import endpoints


app = FastAPI()
app.include_router(endpoints.router, prefix="/api/v1/todos", tags=["todos"])


@app.on_event("startup")
def on_startup():
    create_db_and_tables()



