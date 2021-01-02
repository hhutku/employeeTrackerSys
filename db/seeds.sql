INSERT INTO department (name) 
VALUES ("Finance"),("HR"),("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES ("Accountant",70000,1),("Recruiter", 80000, 2),("Engineer",90000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tonny","Wind",1,null),("Rob","william",1,1),("Jade","Brown",2,1),("Nile","Long",2,1),("Miss","Short",3,null),
("Olsen","Monday",3,5),("Tom","Silver",3,5),("Ben","Ten",3,5),("Heidi","Alp",3,5),("Super","Man",3,5);


