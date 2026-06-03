# User Guide

## What this project is

This is a simple ticket management web app built with Python and Flask. It shows ticket counts, lets you add new tickets, and stores data in a MariaDB database.

## What you need before you start

1. Python 3 installed.
2. MariaDB (or MySQL compatible database) installed.
3. A terminal/command line.

## Install Python dependencies

Open a terminal in the project folder (`/home/stian/eksamen/Eksamen`) and run:

```bash
python3 -m pip install flask mariadb
```

If your system uses `python` instead of `python3`, use:

```bash
python -m pip install flask mariadb
```

## Set up the database

The app expects a MariaDB database named `eksamen` and two tables: `users` and `tickets`.

1. Start MariaDB.
2. Open the MariaDB shell:

```bash
sudo mariadb
```

3. Run the following SQL commands:

```sql
CREATE DATABASE eksamen;
USE eksamen;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL
);

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  user_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username) VALUES
  ('Aleks'),
  ('John'),
  ('Theo');
```

4. Exit the MariaDB shell:

```sql
EXIT;
```

## Configure the database connection

Open `app.py` and check the `get_db_connection()` function. Make sure the database settings match your MariaDB setup:

```python
def get_db_connection():
    return mariadb.connect(
        host="localhost",
        user="root",
        password="1234",
        database="eksamen",
        port=3306
    )
```

If your username, password, host, or port are different, update them here.

## Run the app

From the project folder, run:

```bash
python3 app.py
```

If the app starts successfully, open a browser and go to:

```text
http://localhost:5000
```

## How to use the app

On the homepage you will see:

- Total tickets count
- Open tickets count
- A form to add a new ticket
- A table listing all existing tickets

To add a ticket:

1. Enter a title.
2. Choose a status (`Open`, `In progress`, or `Done`).
3. Choose a user from the list, or leave it unassigned.
4. Click `Create ticket`.

The ticket saves to the database and the page refreshes with the new ticket.

## Troubleshooting

- If the page does not load, make sure Flask is installed.
- If the app fails to connect to the database, check the `user`, `password`, `database`, and `port` values in `app.py`.
- If you see an empty user dropdown, make sure the `users` table contains at least one record.

## Notes for complete beginners

- This app is designed to run locally on your computer.
- It does not include advanced security or production settings.
- Do not use the default password `1234` in a real project. Change it to a stronger one.
- If you want to stop the app, press `Ctrl+C` in the terminal where it is running.

## Optional improvements

- Add user login and authentication.
- Add ticket editing and deletion.
- Use environment variables for the database password instead of hardcoding it.
