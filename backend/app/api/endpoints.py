from fastapi import APIRouter, HTTPException
from ..core.db import SessionDep
from ..models.todo import ToDo
from ..schemas.todo import TodoCreate, TodoRead, TodoUpdate
from ..crud.todo import create_todo, read_todos, update_todo, delete_todo

router = APIRouter()

@router.post("/todos", response_model=TodoRead)
def create(todo: TodoCreate, session: SessionDep):

    return create_todo(session, todo)

@router.get("/todos", response_model=list[TodoRead])
def read(session: SessionDep):
    return read_todos(session)


@router.put("/todos/{todo_id}", response_model=TodoRead)
def update(todo_id: int, todo: TodoUpdate, session: SessionDep):
    todo = update_todo(session, todo_id, todo)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.delete("/todos/{todo_id}", response_model=ToDo)
def delete(todo_id: int, session: SessionDep):
    todo = delete_todo(session, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo
