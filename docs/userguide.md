# User Guide

## What this project is

This is a simple ticket management web app built with Python and Flask. It shows ticket counts, lets you add new tickets, and stores data in a MariaDB database.

---

## 1. Before you start

You need:

- Python 3
- MariaDB or MySQL compatible database
- A code editor (Visual Studio Code recommended)
- A terminal / command line
- A web browser

---

## 2. Install tools by operating system

### Windows

1. Install Python:
   - Go to https://www.python.org/downloads/windows
   - Download the latest Python 3 installer
   - Run the installer and check `Add Python to PATH`
   - Click `Install Now`

2. Install Visual Studio Code:
   - Go to https://code.visualstudio.com/
   - Download `Windows` version
   - Install VS Code
   - During install, check `Add to PATH` and `Open with Code`

3. Install MariaDB:
   - Go to https://mariadb.org/download/
   - Choose Windows and download the latest stable version
   - Install MariaDB and remember the root password you create

4. Open a terminal:
   - Press `Windows + R`, type `cmd`, and press Enter for Command Prompt
   - Or type `powershell` for PowerShell
   - Or open VS Code and press `Ctrl+`` (backtick)

### macOS

1. Install Python:
   - Python 3 is usually pre-installed, but install the latest from https://www.python.org/downloads/macos
   - Or use Homebrew: 
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install python
     ```

2. Install Visual Studio Code:
   - Go to https://code.visualstudio.com/
   - Download `macOS` version
   - Install VS Code

3. Install MariaDB:
   - Use Homebrew:
     ```bash
     brew install mariadb
     brew services start mariadb
     ```
   - Or download from https://mariadb.org/download/

4. Open a terminal:
   - Press `Command + Space`, type `Terminal`, and press Enter
   - Or open VS Code and press `Ctrl+`` (backtick)

### Linux

1. Install Python:
   - Most Linux distributions already include Python 3
   - Check with:
     ```bash
     python3 --version
     ```
   - If not installed, use your package manager. For Ubuntu/Debian:
     ```bash
     sudo apt update
     sudo apt install python3 python3-pip
     ```

2. Install Visual Studio Code:
   - Download from https://code.visualstudio.com/
   - Or install with Snap on Ubuntu:
     ```bash
     sudo snap install --classic code
     ```

3. Install MariaDB:
   - Ubuntu/Debian:
     ```bash
     sudo apt update
     sudo apt install mariadb-server
     sudo systemctl start mariadb
     sudo systemctl enable mariadb
     ```
   - Fedora:
     ```bash
     sudo dnf install mariadb-server
     sudo systemctl start mariadb
     sudo systemctl enable mariadb
     ```

4. Open a terminal:
   - Use the app menu and search for `Terminal`
   - Or press `Ctrl+Alt+T`
   - Or open VS Code and press `Ctrl+`` (backtick)

---

## 3. Open the project in VS Code

1. Start VS Code.
2. Click `File` → `Open Folder...`.
3. Choose the project folder: `Eksamens/Eksamen`.
4. Open `app.py` to view the main application code.

---

## 4. Install Python dependencies for this project

Open a terminal in the project folder. If you are already in VS Code, use the built-in terminal.

### Windows

```powershell
cd C:\Users\YourName\eksamen\Eksamen
python -m pip install flask mariadb
```

### macOS / Linux

```bash
cd /home/stian/eksamen/Eksamen
python3 -m pip install flask mariadb
```

If `python3` does not work, use `python` instead.

---

## 5. Set up MariaDB database and tables

The app uses a MariaDB database named `eksamen` with two tables: `users` and `tickets`.

### Start MariaDB server

- Windows: start MariaDB from the Start menu or services app.
- macOS: if installed with Homebrew, run `brew services start mariadb`.
- Linux: run `sudo systemctl start mariadb`.

### Open MariaDB shell

#### Windows PowerShell / Command Prompt

```powershell
mariadb -u root -p
```

#### macOS / Linux

```bash
sudo mariadb
```

Enter your MariaDB root password if asked.

### Create database and tables

Run these SQL commands in the MariaDB shell:

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

Then exit:

```sql
EXIT;
```

---

## 6. Configure the database connection in the app

Open `app.py` and find the `get_db_connection()` function. Update the settings to match your MariaDB account:

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

- `user`: your MariaDB username
- `password`: your MariaDB password
- `host`: usually `localhost`
- `port`: usually `3306`

> If you use a different password than `1234`, update it here.

---

## 7. Run the web app

From the project folder in a terminal:

### Windows

```powershell
python app.py
```

### macOS / Linux

```bash
python3 app.py
```

If the app starts, open your browser and go to:

```text
http://localhost:5000
```

To stop the app, press `Ctrl+C` in the terminal.

---

## 8. How to use the app

On the homepage you will see:

- Total number of tickets
- Number of open tickets
- A form to add a new ticket
- A table with existing tickets

To create a ticket:

1. Enter a ticket title.
2. Choose a status: `Open`, `In progress`, or `Done`.
3. Choose a user or leave it empty.
4. Click `Create ticket`.

The page will reload and show the new ticket.

---

## 9. Common terminal commands

### Change directory to the project folder

Windows:

```powershell
cd C:\Users\YourName\eksamen\Eksamen
```

macOS / Linux:

```bash
cd /home/stian/eksamen/Eksamen
```

### Install Python packages

```bash
python3 -m pip install flask mariadb
```

### Run the app

```bash
python3 app.py
```

### Stop the app

Press `Ctrl+C`

---

## 10. Troubleshooting

- If `python3` is not found, try `python`.
- If `pip install` fails, check that Python is installed and added to your PATH.
- If the app cannot connect to MariaDB, verify the username, password, database name, host, and port in `app.py`.
- If the web page does not appear, make sure `http://localhost:5000` is entered exactly.
- If no users appear in the dropdown, ensure the `users` table has records.

---

## 11. Notes for beginners

- This project runs locally on your computer only.
- Do not use the example password `1234` in a real project.
- For production, use secure database credentials and environment variables.
- If you are not sure what a command does, ask or search for that command name before running it.
