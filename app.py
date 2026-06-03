from flask import Flask, render_template
import mariadb

app = Flask(__name__)

def get_db_connection():
    return mariadb.connect(
        host="localhost",
        user="root",
        password="1234",
        database="eksamen",
        port=3306
    )

@app.route("/")
def index():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tickets")
    tickets = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template(
        "index.html",
        title="Ticket System",
        tickets=tickets
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)