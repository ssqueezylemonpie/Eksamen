# User Guide

## What this project is

This is a simple ticket management web app built with Python and Flask. It shows ticket counts, lets you add new tickets, and stores data in a MariaDB database.

## What you need before you start

- Python 3 installed.
- MariaDB or MySQL installed.
- A text editor and terminal / command prompt.
- Basic comfort opening a folder and running a command.

## Install dependencies

### Windows

1. Open PowerShell or Command Prompt.
2. Navigate to the project folder. Example:

```powershell
cd C:\path\to\Eksamen
```

3. Install the required Python packages:

```powershell
python -m pip install --upgrade pip
python -m pip install flask mariadb
```

If `python` is not found, try `py` instead:

```powershell
py -m pip install --upgrade pip
py -m pip install flask mariadb
```

### macOS

1. Open Terminal.
2. Navigate to the project folder:

```bash
cd /path/to/Eksamen
```

3. Install the required Python packages:

```bash
python3 -m pip install --upgrade pip
python3 -m pip install flask mariadb
```

If your system uses `python` instead of `python3`, replace `python3` with `python`.

### Linux

1. Open Terminal.
2. Navigate to the project folder:

```bash
cd /path/to/Eksamen
```

3. Install the required Python packages:

```bash
python3 -m pip install --upgrade pip
python3 -m pip install flask mariadb
```

If your system uses `python` instead of `python3`, replace `python3` with `python`.

## Install MariaDB / MySQL

### Windows

1. Download MariaDB from https://mariadb.org/download/ or install MySQL from https://dev.mysql.com/downloads/.
2. Follow the installer instructions.
3. Remember your database username and password.
4. Open `MariaDB x.x Command Line Client` or use PowerShell with the `mysql` command.

### macOS

Use Homebrew if you have it installed:

```bash
brew install mariadb
brew services start mariadb
```

If you prefer MySQL:

```bash
brew install mysql
brew services start mysql
```

### Linux

On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install mariadb-server
sudo systemctl start mariadb
```

On Fedora/CentOS:

```bash
sudo dnf install mariadb-server
sudo systemctl start mariadb
```

## Create the database and tables

1. Open your database shell.

- Windows: use the MariaDB Command Line Client or `mysql` in PowerShell.
- macOS / Linux: use Terminal and run `sudo mariadb` or `mysql -u root -p`.

2. Run these commands:

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

3. Exit the database shell:

```sql
EXIT;
```

## Configure the project

Open `app.py` and check the `get_db_connection()` function. Update the connection settings if your database username, password, host, or port are different.

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

If you changed your MariaDB password during setup, replace `1234` with the correct password.

## Run the app

From the project folder, start the app.

### Windows

```powershell
python app.py
```

### macOS / Linux

```bash
python3 app.py
```

If your system uses `python` instead of `python3`, use `python app.py`.

Open your browser and go to:

```text
http://localhost:5000
```

## How to use the app

On the homepage you will see:

- Total number of tickets.
- Number of open tickets.
- A form to create a new ticket.
- A list of existing tickets.

To add a ticket:

1. Enter a title.
2. Choose a ticket status.
3. Select a user from the dropdown.
4. Click the button to create the ticket.

The ticket is saved in the database and the page updates automatically.

## Common problems and solutions

- App does not start:
  - Make sure Flask and mariadb packages are installed.
  - Check that you are running the command from the project folder.

- Browser shows an error or blank page:
  - Verify that the app is running and using port `5000`.
  - Open `http://localhost:5000` exactly.

- Database connection error:
  - Open `app.py` and confirm the host, user, password, database, and port values.
  - Make sure MariaDB service is running.

- No users appear in the dropdown:
  - Check that the `users` table contains at least one record.
  - Use the SQL `INSERT INTO users (...) VALUES (...)` command if needed.

## What this project does

- Connects to a MariaDB database.
- Shows total tickets and open tickets.
- Displays tickets with assigned user names.
- Lets you add new tickets.

## Stop the app

Press `Ctrl+C` in the terminal where the app is running.

## Beginner tips

- This app runs locally on your computer.
- The password in `app.py` is only for local testing.
- In a real project, do not hardcode passwords in source code.
- You can change the text or styles in `templates/index.html` and `static/style.css`.
