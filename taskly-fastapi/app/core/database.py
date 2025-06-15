import os
from app.core.config import Configs
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

configs = Configs()

base_dir = os.path.dirname(os.path.realpath(__file__))

default_sqlite_path = os.path.join(base_dir, "local.sqlite")
database_url = configs.DATABASE_URL

engine = create_engine(database_url, echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()

print(f"Using database: {database_url}")