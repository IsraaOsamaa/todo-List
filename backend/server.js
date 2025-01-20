const express = require("express");
const oracledb = require("oracledb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Oracle DB Connection
async function initializeDb() {
  try {
    await oracledb.createPool({
      user: "todoproject",
      password: "123456",
      connectString: "localhost:1521/orcl",
    });
    console.log("Oracle DB connected");
  } catch (err) {
    console.error("Error connecting to Oracle DB:", err);
  }
}

initializeDb();

// User Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const connection = await oracledb.getConnection();

  try {
    const result = await connection.execute(
      `INSERT INTO USERS (id , username, password) VALUES (users_seq.nextval ,:username, :password)`,
      [username, password],
      { autoCommit: true }
    );

    res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error registering user" });
  } finally {
    connection.close();
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE username = :username`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ Error: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = user[2] === password; // user[1] is the password field
    // return res.json(Match : isMatch , right : user[])
    if (!isMatch) {
      return res.status(400).json({ Error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user[0] }, "todo-project_1", {
      expiresIn: "1h",
    });
    //todo add username and userId to res.json
    res.json({
      massege: "You have logged in Successfully",
      token: token,
      user: { id: user[0], username: user[1] },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error logging in" });
  } finally {
    connection.close();
  }
});

// Get Todos
app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;

  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM TODOS WHERE user_id = :userId`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error fetching todos" });
  } finally {
    connection.close();
  }
});

// Add Todo
app.post("/todos", async (req, res) => {
  const { userId, text } = req.body;

  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(
      `INSERT INTO TODOS (id , text, user_id) VALUES (todos_seq.nextval , :text, :userId)`,
      [text, userId],
      { autoCommit: true }
    );
    res.json({ message: "Todo added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error adding todo" });
  } finally {
    connection.close();
  }
});

// Delete Todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const connection = await oracledb.getConnection();
  try {
    const result = await connection.execute(
      `DELETE FROM TODOS WHERE id = :id`,
      [id],
      { autoCommit: true }
    );
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error deleting todo" });
  } finally {
    connection.close();
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
