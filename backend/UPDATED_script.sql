CREATE TABLE Users (
  code int,
  stars int,
  name varchar(100),
  PRIMARY KEY (code)
);

CREATE TABLE Employee_Users (
  empId int,
  userId int,
  PRIMARY KEY (empId, userId),
  FOREIGN KEY (userId) REFERENCES Users(code)
);

CREATE TABLE Jobs (
  jobId int,
  name char(20),
  description varchar(100),
  PRIMARY KEY (jobId)
);

CREATE TABLE Users_Have_Jobs (
  userId int,
  jobId int,
  PRIMARY KEY (userId, jobId),
  FOREIGN KEY (userId) REFERENCES Users(code),
  FOREIGN KEY (jobId) REFERENCES Jobs(jobId)
);

CREATE TABLE SubJobs (
  subJobId int,
  jobId int,
  title varchar(100),
  description varchar(100),
  imgLink varchar(1000),
  orderNumber int,
  PRIMARY KEY (subJobId),
  FOREIGN KEY (jobId) REFERENCES Jobs(jobId)
);





    
	
