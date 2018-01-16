DROP DATABASE IF EXISTS okc;
CREATE DATABASE okc;

USE okc;

CREATE TABLE Users (
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Coupons (
  id int NOT NULL AUTO_INCREMENT,
  imgUrl varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  price varchar(50) NOT NULL,
  discount varchar(50) NOT NULL,
  merchant varchar(50) NOT NULL,
  finePrint varchar(50) NOT NULL,
  description varchar(50) NOT NULL,
  url varchar(50) NOT NULL,
  saved varchar(50) DEFAULT "null",
  pureUrl varchar(50) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES user(id)
);


-- If first time loading database remember to comment out the drop database the first time.
