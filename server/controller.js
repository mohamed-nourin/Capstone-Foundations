require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;
const { User } = require("./models");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

module.exports = {
    seed: (req, res) => {
      sequelize
        .query(`
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS tasks;
          DROP TABLE IF EXISTS categories;
  
          CREATE TABLE categories (
            category_id serial primary key, 
            name varchar
          );
  
          CREATE TABLE users (
            user_id SERIAL PRIMARY KEY, 
            username VARCHAR,
            password VARCHAR,
            email VARCHAR
          );
  
          CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY,
            name VARCHAR,
            priority INTEGER,
            category_id INTEGER REFERENCES categories(category_id)
          );
  
          INSERT INTO users (username, password, email)
          VALUES ('user123', '$2b$10$NbztUhX6qoQZbeX2Q8zgruGzzKQOjMX5txPkW4wXGKaojO/WxDJkG', 'user123@gmail.com');
  
          INSERT INTO categories (name)
          VALUES ('Personal'),
                 ('Work'),
                 ('School/Study'),
                 ('Shopping'),
                 ('Finance'),
                 ('Travel'),
                 ('Health and Wellness'),
                 ('Social Events');
        `)
        .then(() => {
          console.log("DB seeded!");
          res.sendStatus(200);
        })
        .catch((err) => console.log("error seeding DB", err));
    },
  
    loginUser: (req, res) => {
        const { username, password } = req.body;
      
        console.log("Received username:", username);
        console.log("Received password:", password);
      
        User.findOne({
          where: {
            username: username
          }
        })
        .then((user) => {
          if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                console.error("Error comparing passwords:", err);
                res.status(500).send({ message: "Error logging in." });
              } else {
                console.log("bcrypt result:", result);
                if (result) {
                  res.status(200).send({ message: "Login successful", user });
                } else {
                  res.status(401).send({ message: "Invalid username or password" });
                }
              }
            });
          } else {
            res.status(401).send({ message: "Invalid username or password" });
          }
        })
        .catch((err) => {
          console.error("Error querying database:", err);
          res.status(500).send({ message: "Error logging in." });
        });
      },
  
    createUser: (req, res) => {
        const { username, password, email } = req.body;
      
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error:", err);
            res.status(500).send({ message: "Error creating user." });
          } else {
            sequelize
              .query(
                `
                INSERT INTO users (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING *;
                `,
                {
                  bind: [username, hashedPassword, email],
                  type: sequelize.QueryTypes.INSERT
                }
              )
              .then((dbRes) => {
                const createdUser = dbRes[0][0];
                res.status(200).send(createdUser);
              })
              .catch((err) => {
                console.error("Error:", err);
                res
                  .status(500)
                  .send({ message: "Error creating user. Please try again later." });
              });
          }
        });
      },

    getUsers: (req, res) => {
        sequelize.query(`
        SELECT * FROM "users";
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(500).send(err));
    },
    
    getCategories: (req, res) => {
        sequelize.query(`select * from categories;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },
    
    addTask: (req, res) => {
        const { name, priority, category_id } = req.body;
        sequelize
        .query(`
        INSERT INTO tasks (name, priority, category_id)
        VALUES ('${name}', ${priority}, ${category_id})
        RETURNING *;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(500).send(err));
    },
    
    getTasks: (req, res) => {
        sequelize
        .query(`
        SELECT tasks.task_id, tasks.name, tasks.priority, categories.category_id, categories.name AS category
        FROM tasks
        JOIN categories ON tasks.category_id = categories.category_id
        ORDER BY tasks.priority DESC
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(500).send(err));
    },
    
    deleteTask: (req, res) => {
        const { id } = req.params
        sequelize.query(`
        DELETE FROM tasks
        WHERE task_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(500).send(err))
    }
};