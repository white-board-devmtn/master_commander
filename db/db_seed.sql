CREATE TABLE Users (
	user_id serial NOT NULL,
	firstName varchar(100) NOT NULL,
	lastName varchar(100) NOT NULL,
	email varchar(200) NOT NULL UNIQUE,
	number int(11) NOT NULL,
	img TEXT(2000) NOT NULL,
	teacher bool NOT NULL DEFAULT 'false',
	hash TEXT NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY (user_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Class (
	class_id serial NOT NULL,
	course_id int NOT NULL,
	start_date varchar(50) NOT NULL,
	end_date varchar(50) NOT NULL,
	CONSTRAINT Class_pk PRIMARY KEY (class_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Ass (
	ass_id serial NOT NULL,
	class_id int NOT NULL,
	ass_name varchar(300) NOT NULL,
	ass_description varchar(1000) NOT NULL,
	grade_possible int(3) NOT NULL,
	due_date varchar(50) NOT NULL,
	CONSTRAINT Ass_pk PRIMARY KEY (ass_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Lecture (
	lecture_id serial NOT NULL,
	class_id int NOT NULL,
	lecture_date varchar(50) NOT NULL,
	lecture_title varchar(200) NOT NULL,
	lecture_description varchar(1000) NOT NULL,
	lecture_video TEXT,
	CONSTRAINT Lecture_pk PRIMARY KEY (lecture_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE user_ass (
	user_ass_id serial NOT NULL,
	ass_id int NOT NULL,
	user_id int NOT NULL,
	grade varchar(2),
	complete bool NOT NULL DEFAULT 'false',
	ass_link TEXT NOT NULL,
	CONSTRAINT user_ass_pk PRIMARY KEY (user_ass_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Events (
	event_id serial NOT NULL UNIQUE,
	user_id int NOT NULL,
	event_description varchar(1000) NOT NULL,
	event_title varchar(200) NOT NULL,
	event_date varchar(50) NOT NULL,
	CONSTRAINT Events_pk PRIMARY KEY (event_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE User_Class (
	user_class_id serial NOT NULL,
	user_id int NOT NULL,
	class_id int NOT NULL,
	CONSTRAINT User_Class_pk PRIMARY KEY (user_class_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Messages (
	message_id serial NOT NULL,
	user_id int NOT NULL,
	class_id int NOT NULL,
	message varchar(500) NOT NULL,
	CONSTRAINT Messages_pk PRIMARY KEY (message_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Course (
	course_id serial NOT NULL,
	course_name varchar(300) NOT NULL,
	course_description varchar(1000) NOT NULL,
	CONSTRAINT Course_pk PRIMARY KEY (course_id)
) WITH (
  OIDS=FALSE
);




ALTER TABLE Class ADD CONSTRAINT Class_fk0 FOREIGN KEY (course_id) REFERENCES Course(course_id);

ALTER TABLE Ass ADD CONSTRAINT Ass_fk0 FOREIGN KEY (class_id) REFERENCES Class(class_id);

ALTER TABLE Lecture ADD CONSTRAINT Lecture_fk0 FOREIGN KEY (class_id) REFERENCES Class(class_id);

ALTER TABLE user_ass ADD CONSTRAINT user_ass_fk0 FOREIGN KEY (ass_id) REFERENCES Ass(ass_id);
ALTER TABLE user_ass ADD CONSTRAINT user_ass_fk1 FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE Events ADD CONSTRAINT Events_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE User_Class ADD CONSTRAINT User_Class_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE User_Class ADD CONSTRAINT User_Class_fk1 FOREIGN KEY (class_id) REFERENCES Class(class_id);

ALTER TABLE Messages ADD CONSTRAINT Messages_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Messages ADD CONSTRAINT Messages_fk1 FOREIGN KEY (class_id) REFERENCES Class(class_id);

