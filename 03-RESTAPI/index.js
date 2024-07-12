import express from "express";
import fs from "fs";

const app = express();
const PORT = 8000;

// Function to read users from JSON file
const readUsersFromFile = () => {
  const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
  return JSON.parse(data);
};

// Function to write users to JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users, null, 2));
};

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
  fs.appendFile("log.txt", `${Date.now()}: ${req.method} : ${req.path}\n`, () => {
    next();
  });
});

// Routes

// Server-side rendering for browsers
app.get("/users", (req, res) => {
  const users = readUsersFromFile();
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

// REST APIs
app.get("/api/users", (req, res) => {
  const users = readUsersFromFile();
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const users = readUsersFromFile();
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  try {
    writeUsersToFile(users);
    return res.status(201).json({ status: "success", id: newUser.id });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Failed to write to file" });
  }
});

// Combined route for GET, PATCH, and DELETE
app.route("/api/users/:id")
  .get((req, res) => {
    const users = readUsersFromFile();
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json("User not found");
    return res.json(user);
  })
  .patch((req, res) => {
    const users = readUsersFromFile();
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return res.status(404).json("User not found");

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    try {
      writeUsersToFile(users);
      return res.json({ status: "success", user: updatedUser });
    } catch (err) {
      return res.status(500).json({ status: "error", message: "Failed to write to file" });
    }
  })
  .delete((req, res) => {
    const users = readUsersFromFile();
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return res.status(404).json("User not found");

    users.splice(userIndex, 1);

    try {
      writeUsersToFile(users);
      return res.json({ status: "success", message: "User deleted" });
    } catch (err) {
      return res.status(500).json({ status: "error", message: "Failed to write to file" });
    }
  });

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
