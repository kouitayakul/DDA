create table Users (
  code int,
  stars int,
  primary key (code)
);

create table Employee_Users (
	  empId int,
    userId int,
    primary key (empId, userId),
    foreign key (userId) references Users(code)
);

create table Jobs (
  jobId int,
  name char(20),
  description varchar(100),
  primary key (jobId)
);

create table Users_Have_Jobs (
	  userId int,
    jobId int,
    primary key (userId, jobId),
    foreign key (userId) references Users(code),
    foreign key (jobId) references Jobs(jobId)
);

create table SubJobs (
  subJobId int,
  jobId int,
  title varchar(100),
  description varchar(100),
  imgLink varchar(1000),
  orderNumber int,
  primary key (subJobId),
  foreign key (jobId) references Jobs(jobId)
);





    
	