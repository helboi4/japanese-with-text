import psycopg
import os

db_settings = {
    "host": os.getenv("DB_HOST"),
    "port" : os.getenv("DB_PORT"),
    "dbname" : os.getenv("DB_NAME"),
    "user" : os.getenv("DB_USER"),
    "connect_timeout" : os.getenv("DB_TIMEOUT")
}
