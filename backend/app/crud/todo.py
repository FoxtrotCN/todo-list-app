from datetime import datetime

from sqlmodel import select
from ..core.db import SessionDep
from ..models.todo import ToDo
from ..schemas.todo import TodoCreate, TodoUpdate

# Create

def create_todo(session: SessionDep, todo: TodoCreate) -> ToDo:
    todo = ToDo.from_orm(todo)
    todo.created_at = datetime.utcnow()
    todo.updated_at = datetime.utcnow()
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


# Read
def read_todos(session: SessionDep) -> list[ToDo]:
    return session.exec(select(ToDo)).all()


# Update
def update_todo(session: SessionDep, todo_id: int, to_do: TodoUpdate) -> ToDo | None:
    todo = session.get(ToDo, todo_id)
    if not todo:
        return None

    for key, value in to_do.dict(exclude_unset=True).items():
        setattr(todo, key, value)

    todo.updated_at = datetime.utcnow()
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


# Delete
def delete_todo(session: SessionDep, todo_id: int) -> ToDo | None:
    todo = session.get(ToDo, todo_id)
    if not todo:
        return None
    session.delete(todo)
    session.commit()
    return todo
