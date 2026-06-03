# Ticket System

A simple Flask web application for managing support tickets. The app connects to a MariaDB database, displays ticket statistics, lists all tickets, and allows users to create new tickets.

## Features

* View total number of tickets
* View number of open tickets
* List all tickets
* Assign tickets to users
* Add new tickets through a web form
* Store ticket data in MariaDB

## Technologies Used

* Python
* Flask
* MariaDB
* HTML / Jinja2
* CSS

## Project Structure

```text
project/
├── app.py
├── templates/
│   └── index.html
├── static/
│   └── style.css
└── README.md
```

## Database Setup

Create a MariaDB database named `eksamen`:

```sql
CREATE DATABASE eksamen;
USE eksamen;
```

Create the `users` table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);
```

Create the `tickets` table:

```sql
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Optional example users:

```sql
INSERT INTO users (username)
VALUES ('Aleks'), ('John'), ('Theo');
```

## Installation

Install the required Python packages:

```bash
pip install flask mariadb
```

## Configuration

In `app.py`, update the database connection if needed:

```python
return mariadb.connect(
    host="localhost",
    user="root",
    password="1234",
    database="eksamen",
    port=3306
)
```

## Running the App

Start the Flask application:

```bash
python app.py
```

Then open the app in your browser:

```text
http://localhost:5000
```

## How It Works

The homepage connects to the database and retrieves:

* Total ticket count
* Number of open tickets
* All tickets with assigned usernames
* All users for the assignment dropdown

When the form is submitted, the `/add` route inserts a new ticket into the database and redirects back to the homepage.

## Notes

This project is intended for a local exam or school environment. For production use, database credentials should not be written directly in the code. Use environment variables instead.
