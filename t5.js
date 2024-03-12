const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  {
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "5abf6783",
  },
  {
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "5abf674563",
  },
];

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
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex].email = email ? email : users[userIndex].email;
    users[userIndex].firstName = firstName
      ? firstName
      : users[userIndex].firstName;
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
