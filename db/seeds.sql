-- seeded data
INSERT INTO department (name)
VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 75000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Manager', 80000.00, 2),
  ('Marketing Coordinator', 55000.00, 2),
  ('Accountant', 60000.00, 3),
  ('Financial Analyst', 70000.00, 3),
  ('HR Manager', 85000.00, 4),
  ('HR Coordinator', 55000.00, 4);

  INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Johnson', 3, NULL),
  ('Amy', 'Lee', 4, 3),
  ('Michael', 'Brown', 5, 3),
  ('Jessica', 'Davis', 6, 3),
  ('Emily', 'Wilson', 7, 3),
  ('Brian', 'Anderson', 8, 7);


-- Queries test
--SELECT role.title, employee.last_name, role.title
--FROM employee
--JOIN role ON employee.role_id = role.id;
