from flask import Flask, render_template, request, redirect, url_for
import mariadb

app = Flask(__name__)

def get_db_connection():
    return mariadb.connect(
        host="localhost",
        user="root",
        password="1234",
        database="eksamen",   # ← your database name
        port=3306
    )

@app.route("/")
def index():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Query both tables
    cursor.execute("SELECT COUNT(*) FROM tickets")
    total_tickets = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status = 'Open'")
    open_tickets = cursor.fetchone()[0]

    # Join tickets with users to get the username too
    cursor.execute("""
        SELECT t.id, t.title, t.status, u.username, t.created_at
        FROM tickets t
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC
    """)
    tickets = cursor.fetchall()

    cursor.execute("SELECT id, username FROM users")
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template(
        "index.html",
        title="Ticket System",
        tickets=tickets,
        users=users,
        total_tickets=total_tickets,
        open_tickets=open_tickets
    )

@app.route("/add", methods=["POST"])
def add_ticket():
    title = request.form.get("title")
    status = request.form.get("status")
    user_id = request.form.get("user_id") or None

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tickets (title, status, user_id) VALUES (?, ?, ?)",
        (title, status, user_id)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


    