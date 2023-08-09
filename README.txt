# To-Do List App

Welcome to the To-Do List App! This application helps you stay organized, manage tasks, and categorize them for better productivity. With user authentication, you can create an account, log in, and start tracking your tasks easily.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

## Description

The To-Do List App is designed to provide users with a simple and efficient way to manage tasks. It includes a front-end interface built with HTML, CSS, and JavaScript, and a back-end server implemented using Node.js, Express.js, and a PostgreSQL database to store user information, tasks, and categories.

## Features

- User authentication (Sign Up, Log In)
- Task management with priority and category
- Create, delete, and view tasks
- Organize tasks into different categories
- Responsive design for seamless usage on different devices

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.

## Usage

1. Run the back-end server:
   - Navigate to the "backend" directory.
   - Install dependencies using `npm install`.
   - Set up your PostgreSQL database and update the `.env` file with your connection details.
   - Start the server using `npm start`.

2. Run the front-end:
   - Open the "index.html," "signup.html," or "login.html" files in a web browser to access different parts of the application.

3. Sign Up:
   - On the "Sign Up" page, enter your username, email, password, and confirm your password.
   - Click the "Sign Up" button to create an account.

4. Log In:
   - On the "Log In" page, enter your username and password.
   - Click the "Log In" button to access your dashboard.

5. Dashboard:
   - After logging in, you'll be redirected to the dashboard where you can manage your tasks.
   - Add tasks, specify priority and category, and view your tasks organized by priority.

## Dependencies

- Node.js
- Express.js
- Sequelize (ORM for database)
- PostgreSQL (Database)
- Bcrypt (Password hashing)
- Axios (HTTP requests)

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, feel free to open a pull request or submit an issue.

