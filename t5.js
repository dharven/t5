const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.json());

let users = []; // This will store user data temporarily

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Users retrieved", success: true, users });
});

app.post("/add", (req, res) => {
  const { email, firstName } = req.body;
  const newUser = { id: Date.now().toString(), email, firstName };
  users.push(newUser);
  res.status(200).json({ message: "User added", success: true });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;
  const user = users.find((user) => user.id === id);

  if (user) {
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    res.status(200).json({ message: "User updated", success: true });
  } else {
    res.status(404).json({ message: "User not found", success: false });
  }
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json({ success: true, user });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});
