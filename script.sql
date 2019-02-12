create table Jobs (
	jobId int,
    name char(20),
    primary key (modId)
);

create table SubJobs (
	subJobId int,
    jobId int,
    stars int,
    title char,
    primary key (subJobId, jobId),
    foreign key (jobId) references Jobs(jobId)
);



    
	