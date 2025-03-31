from datetime import datetime
from app.model.base_model import Task as TaskModel
from app.schema.schema import Task as TaskInterface

class TaskServices():
    
    def __init__(self, db) -> None:
        self.db = db


    def get_tasks(self):
        result = self.db.query(TaskModel).all()
        return result

    def get_task_by_id(self, idTask: int):
        result = self.db.query(TaskModel).filter(TaskModel.id == idTask).first()
        return result

    def post_task(self, task: TaskInterface):
        new = TaskModel(**{
                "title": task.title,
                "user_email": task.user_email,
                "description": task.description,
                "status": task.status,
                "created": task.created or datetime.utcnow(),
                "updated": task.updated or datetime.utcnow(),
            })
        self.db.add(new)
        self.db.commit()
        self.db.refresh(new)
        return new

    def put_task(self, idTask: int, task_data: TaskInterface):
        task = self.get_task_by_id(idTask)

        if not task:
            return 'Not found'

        task.title = task_data.title
        task.description = task_data.description
        task.status = task_data.status
        task.updated = datetime.utcnow()

        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task(self, idTask: int):
        task = self.get_task_by_id(idTask)

        if not task:
            return 'Not found'

        self.db.query(TaskModel).filter(TaskModel.id == idTask).delete()
        self.db.commit()
        return task