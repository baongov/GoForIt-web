USE GOFORITDB;

DROP DATABASE GOFORITDB;

CREATE DATABASE GOFORITDB;

USE GOFORITDB;
CREATE TABLE `Users` (
  `id` int(10) NOT NULL auto_increment,
  `idFacebook` varchar(40) NOT NULL,
  `displayName` varchar(40) NOT NULL,
  `photo` varchar(500),
  `email` varchar(100),
  `gender` char(6) NOT NULL,
  `address` varchar(50) default '',
  `age` int(2),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Destinations` (
  `id` int(10) NOT NULL auto_increment,
  `type` char(15) NOT NULL CHECK (`type` IN('cinema','restaurant','show','streetfood','touristPlace','other')),
  `name` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `description` varchar(1000) default '',
  `rate` int(1) default 0,
  `promotion` varchar(1000) default '',
  `photos` varchar(500),
  `lat` FLOAT( 10, 6 ) NOT NULL ,
  `lng` FLOAT( 10, 6 ) NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO Users SET `idFacebook` = '1152419461324591', `displayName` = 'Anonimity', `photo` = NULL, `email` = 'anonimity@xyz.com', `gender` = 'female', `address` = NULL, `age` = 18;

INSERT INTO Destinations SET `type` = 'touristPlace', `name` = 'Nguyen Hue Walking Street', `address` = '66A Nguyễn Huệ, Bến Nghé, Quận 1', `photos`='1', `lat` = 10.774359, `lng` = 106.703565;
INSERT INTO Destinations S

ET `type` = 'cinema', `name` = 'Train to Busan - Lotte Cinema', `address` = 'Tầng 4, Lotte Mart, 968 Đường, 3 Tháng 2, Phường 15, District 11, Ho Chi Minh, Việt Nam', `photos`='2', `lat` = 10.764614, `lng` = 106.656823;
INSERT INTO Destinations SET `type` = 'restaurant', `name` = 'KFC Ly Thuong Kiet', `address` = '446 Lý Thường Kiệt, phường 7, Hồ Chí Minh, phường 7 Tân Bình Hồ Chí Minh, Việt Nam', `photos`='3', `lat` = 10.786990, `lng` = 106.654075;
