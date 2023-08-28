INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
('Salesperson', 100, 1),
('Sales Lead', 120, 1),
('Lead Engineer', 130, 2),
('Software Engineer', 100, 2),
('Account Manager', 95, 3),
('Accountant', 70, 3),
('Legal Team Lead', 120, 4),
('Lawyer', 90, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Frank', 'Lee', 1, 2),
('Rich', 'Jones', 2, null),
('John', 'Smith', 3, null),
('Khan', 'Sol', 4, 3),
('Kate', 'Doe', 5, null),
('Joe', 'Shmoe', 6, 5),
('Kevin', 'Lomax', 7, null),
('Bill', 'Thompson', 8, 7);