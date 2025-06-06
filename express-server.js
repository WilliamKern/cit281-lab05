const express = require("express");
const app = express();

const HOST = "localhost";
const PORT = 3000;

app.use(express.json());
const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

//cit/student Route
app.get("/cit/student", (req, res) => {
  res.status(200).type("application/json; charset=utf-8");
  res.send(students);
});

app.post("/cit/student", (req, res) => {
  const { first, last } = req.body;
  let newID = 0;
  for (const id of students) {
    if (id.id > newID) {
      newID = id.id;
    }
  }
  const newStudent = { id: newID + 1, first: first, last: last };
  students.push(newStudent);
  res.status(200).type("application/json; charset=utf-8");
  res.send(students);
});

//cit/student/:id Route
app.get("/cit/student/:id", (req, res) => {
  res.status(200).type("application/json; charset=utf-8");
  const { id } = req.params;
  for (const student of students) {
    if (student.id === parseInt(id)) {
      res.send(student);
      return;
    }
  }
  res.status(404).type("text/plain").send("Not found");
});
// Handle 404 for all other routs
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

//Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running at https://${HOST}:${PORT}`);
});
