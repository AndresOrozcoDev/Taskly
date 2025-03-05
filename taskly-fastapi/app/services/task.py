from app.model.base_model import Task as TaskModel

class TaskServices():
    
    def __init__(self, db) -> None:
        self.db = db


    def get_tasks(self):
        result = self.db.query(TaskModel).all()
        return result