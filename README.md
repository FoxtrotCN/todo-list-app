# ToDoList App 📋

Aplicación mínima funcional (MVP) para gestionar tareas, construida con **FastAPI** 🚀 y **React Native + Expo (TypeScript)** ⚛. Permite realizar todas las operaciones CRUD siguiendo una arquitectura RESTful con buenas prácticas y modularidad.

---

## 🛠 Stack

**Backend:** Python 3.12, FastAPI, SQLModel, Pydantic  
**Frontend:** React Native, Expo, TypeScript, Axios

---

## ⚡ Funcionalidades

- Crear, listar, actualizar y eliminar tareas (CRUD)
- Marcar tareas como completadas o pendientes
- Navegación entre pantallas y refresco automático de la lista
- Componentes reutilizables (`TodoCard`)

---

## 🚀 Instalación

### Backend

``` bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
cd app
fastapi dev main.py
```

### Frontend

```bash
cd frontend
cd app
npm install
npm start
presiona i para correr en el emulador de iOS
presiona a para correr en el emulador de Android

