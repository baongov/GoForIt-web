USE GOFORITDB;

DROP DATABASE GOFORITDB;

CREATE DATABASE GOFORITDB;

USE GOFORITDB;
CREATE TABLE `Users` (
`id` int(10) NOT NULL auto_increment,
`idFacebook` varchar(40) NOT NULL,
`displayName` varchar(40) NOT NULL,
`photo` varchar(200),
`email` varchar(100),
`gender` char(6) NOT NULL,
`address` varchar(50) default '',
`age` int(2),
PRIMARY KEY (`id`)
);
INSERT INTO Users SET `idFacebook` = '1152419461324591', `displayName` = 'Anonimity', `photo` = NULL, `email` = 'anonimity@xyz.com', `gender` = 'female', `address` = NULL, `age` = 18;
