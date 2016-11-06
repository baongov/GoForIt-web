USE GOFORITDB;

DROP DATABASE GOFORITDB;

CREATE DATABASE GOFORITDB;

USE GOFORITDB;
CREATE TABLE `Users` (
`id` int(10) NOT NULL auto_increment,
`idFacebook` varchar(40) NOT NULL,
`displayName` varchar(40) NOT NULL,
`gender` char(1) enum('M','F') NOT NULL,
`address` varchar(50) default '',
`age` int(2) NOT NULL,
PRIMARY KEY (`id`)
);
