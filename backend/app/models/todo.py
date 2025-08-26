from datetime import datetime
from sqlmodel import Field, SQLModel


class ToDo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str | None = Field(default=None, max_length=120)
    description: str | None = Field(default=None, max_length=500)
    completed: bool | None = Field(default=False)
    created_at: datetime = Field(default=datetime.today())
    updated_at: datetime | None = Field(default=None)

