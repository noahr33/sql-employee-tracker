const mysql = require('mysql2')
const inquirer = require('inquirer')
const consoleTable = require('console.table')

require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_db',
})

connection.connect(function (err) {
  if (err) throw err
  console.log(`
  --   /$$$$$$$$ /$$      /$$ /$$$$$$$  /$$        /$$$$$$  /$$     /$$/$$$$$$$$ /$$$$$$$$
  --  | $$_____/| $$$    /$$$| $$__  $$| $$       /$$__  $$|  $$   /$$/ $$_____/| $$_____/
  --  | $$      | $$$$  /$$$$| $$  \  $$| $$      | $$  \  $$ \   $$ /$$/| $$      | $$
  --  | $$$$$   | $$ $$/$$ $$| $$$$$$$/| $$      | $$  | $$  \   $$$$/ | $$$$$   | $$$$$
  --  | $$__/   | $$  $$$| $$| $$____/ | $$      | $$  | $$   \   $$/  | $$__/   | $$__/
  --  | $$      | $$\   $ | $$| $$      | $$      | $$  | $$    | $$   | $$      | $$
  --  | $$$$$$$$| $$ \ /  | $$| $$      | $$$$$$$$|  $$$$$$/    | $$   | $$$$$$$$| $$$$$$$$
  --  |________/|__/     |__/|__/      |________/ \ ______/     |__/   |________/|________/
  --   /$$      /$$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$
  --  | $$$    /$$$ /$$__  $$| $$$ | $$ /$$__  $$ /$$__  $$| $$_____/| $$__  $$
  --  | $$$$  /$$$$| $$  \  $$| $$$$| $$| $$  \  $$| $$  \ __/| $$      | $$  \  $$
  --  | $$ $$/$$ $$| $$$$$$$$| $$ $$ $$| $$$$$$$$| $$ /$$$$| $$$$$   | $$$$$$$/
  --  | $$  $$$| $$| $$__  $$| $$  $$$$| $$__  $$| $$|_  $$| $$__/   | $$__  $$
  --  | $$\   $ | $$| $$  | $$| $$\   $$$| $$  | $$| $$  \  $$| $$      | $$  \  $$
  --  | $$ \ /  | $$| $$  | $$| $$ \   $$| $$  | $$|  $$$$$$/| $$$$$$$$| $$  | $$
  --  |__/     |__/|__/  |__/|__/  \ __/|__/  |__/ \ ______/ |________/|__/  |__/
  `)
  promptUser()
})

const promptUser = () => {
  inquirer
    .prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Please Select an Option',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add A Department',
          'Add A Role',
          'Add An Employee',
          'Update An Employee Role',
        ],
      },
    ])
    .then((answer) => {
      const { choices } = answer
      switch (choices) {
        case 'View All Departments':
          return allDepartments()
        case 'View All Roles':
          return allRoles()
        case 'View All Employees':
          return allEmployees()
        case 'Add A Department':
          return addDepartment()
        case 'Add A Role':
          return addRole()
        case 'Add An Employee':
          return addEmployee()
        case 'Update An Employee Role':
          return updateEmployee()
      }
    })
    .catch((err) => {
      if (err) throw err
    })
}

const allDepartments = () => {
  const sql = `SELECT * FROM department;`
  connection.query(sql, (err, res) => {
    if (err) throw err
    console.table(res)
    promptUser()
  })
}

const allRoles = () => {
  const sql = `
  SELECT roles.id, roles.title, roles.salary, department.id, department.name FROM roles JOIN department ON roles.department_id = department.id;`
  connection.query(sql, (err, res) => {
    if (err) throw err
    console.table(res)
    promptUser()
  })
}

const allEmployees = () => {
  const sql = `SELECT * FROM employee`
  connection.query(sql, (err, res) => {
    if (err) throw err
    console.table(res)
    promptUser()
  })
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'departmentName',
        type: 'input',
        message: 'What would you like to name the new department?',
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?);`
      connection.query(sql, answer.departmentName, (err, res) => {
        if (err) throw err
        console.log(
          `\n ${answer.departmentName} was successfully added to your database. \n`
        )
        promptUser()
      })
    })
}

const addRole = () => {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err
    let departments = res.map((department) => ({
      name: department.name,
      value: department.id,
    }))
    inquirer
      .prompt([
        {
          name: 'roleName',
          type: 'input',
          message: 'What is the name of the role?',
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the salary for this role?',
        },
        {
          name: 'whichDepartment',
          type: 'list',
          message: 'Which department do you want to add this to?',
          choices: departments,
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`
        connection.query(
          sql,
          [answer.roleName, answer.roleSalary, answer.whichDepartment],
          (err, res) => {
            if (err) throw err
            console.log(
              `\n ${answer.name} was successfully added to your database. \n`
            )
            promptUser()
          }
        )
      })
  })
}

const addEmployee = () => {}

const updateEmployee = () => {}
