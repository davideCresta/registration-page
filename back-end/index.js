const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(bodyParser());

const cors = require("cors");

const allowedOrigins = ["http://localhost:8080"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Errore CORS"));
    }
  },
};

app.use(cors(corsOptions));

const jwt = require("jsonwebtoken");
const jwtSecretKey = "chiave";

app.post("/api/authenticate", (req, res) => {
  const { username, password } = req.body;

  if (username === "testAimage" && password === "testAimage") {

    const token = jwt.sign({ username }, jwtSecretKey, { expiresIn: "1h" });

    res.status(200).json({
      msg: "Authentication successful",
      token,
    });
  } else {
    res.status(401).json({
      msg: "Authentication failed",
    });
  }
});

const connection = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11654271",
  password: "IG9gbriAcR",
  database: "sql11654271",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to MySql server");
});

app.get("/", (req, res) => {
  res.send("SERVER");
});

function validateName(name) {
  let errors = [];
  if (name.length == 0) {
    errors.push("Campo nome vuoto");
  }

  if (name.length > 50) {
    errors.push("Lunghezza nome superiore a 50 caratteri");
  }
  return errors;
}

function validateSurname(surname) {
  let errors = [];
  if (surname.length == 0) {
    errors.push("Campo cognome vuoto");
  }

  if (surname.length > 50) {
    errors.push("Lunghezza cognome superiore a 50 caratteri");
  }

  return errors;
}

function validateContactNo(contactno) {
  let errors = [];

  if (contactno.length == 0) {
    errors.push("Campo telefono vuoto");
  }

  if (contactno.length < 10) {
    errors.push("Lunghezza telefono 10 caratteri");
  }

  if (contactno.length > 10) {
    errors.push("Lunghezza telefono 10 caratteri");
  }

  if (!/[0-9]/g.test(contactno)) {
    errors.push("Campo telefono può contenere solo numeri");
  }

  return errors;
}

function validateEmail(email) {
  let errors = [];

  if (email.length == 0) {
    errors.push("Campo email vuoto");
  }

  if (email.length > 100) {
    errors.push("Lunghezza email superiore 100 caratteri");
  }

  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
      email
    )
  ) {
    errors.push("Email non valida");
  }

  return errors;
}

function validateCourse(course) {
  let errors = [];
  if (
    course !== "React" &&
    course !== "Vue" &&
    course !== "NodeJS" &&
    course !== "MongoDB"
  ) {
    errors.push("Corso non valido");
  }
  return errors;
}

app.post("/api/user", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const contactno = req.body.contactno;
  const course = req.body.course;

  const errName = validateName(name);
  const errSurname = validateSurname(surname);
  const errEmail = validateEmail(email);
  const errContactNo = validateContactNo(contactno);
  const errCourse = validateCourse(course);

  if (
    errName.length ||
    errSurname.length ||
    errEmail.length ||
    errContactNo.length ||
    errCourse.length
  ) {
    res.status(400).json({
      msg: "Errore nella validazione",
      errors: {
        name: errName,
        surname: errSurname,
        email: errEmail,
        contactno: errContactNo,
        course: errCourse,
      },
    });
  } else {
    const user = {
      name,
      surname,
      email,
      contactno,
      course,
    };

    const duplicateCheckQuery = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(duplicateCheckQuery, (err, results) => {
      if (err) {
        res.status(500).json({
          msg: "Errore DB",
        });
      } else if (results.length > 0) {
        updateExistingUser(res, user);
      } else {
        insertNewUser(res, user);
      }
    });
  }
});

function updateExistingUser(res, user) {
  const { name, surname, email, contactno, course } = user;
  const updateQuery = `UPDATE users SET name = '${name}', surname = '${surname}', contactno = '${contactno}', course = '${course}' WHERE email = '${email}'`;

  connection.query(updateQuery, (err, updateResult) => {
    if (err) {
      res.status(500).json({
        msg: "Errore DB dati non aggiornati",
      });
    } else {
      res.status(200).json({
        msg: "Dati utente aggiornati con successo!",
      });
    }
  });
}

function insertNewUser(res, user) {
  const { name, surname, email, contactno, course } = user;
  const insertQuery = `INSERT INTO users (name, surname, contactno, email, course) VALUES ('${name}', '${surname}', '${contactno}', '${email}', '${course}')`;

  connection.query(insertQuery, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "Qualcosa è andato storto, riprova",
      });
    } else {
      res.status(200).json({
        msg: "Utente registrato con successo!",
      });
    }
  });
}

app.get("/api/users", (req, res) => {
  let query = "SELECT * FROM users";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Errore nella query al database:", err);
      res.status(500).json({
        msg: "Errore: server interno",
      });
    } else {
      res.status(200).json({
        msg: "Tutti i dati sono stati recuperati con successo",
        data: result,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started ...");
});
