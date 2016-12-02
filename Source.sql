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
  `promotion` varchar(1000) default '',
  `photos` varchar(500),
  `lat` FLOAT( 10, 6 ) NOT NULL ,
  `lng` FLOAT( 10, 6 ) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `UserDesInteract` (
  `idUser` int(10) NOT NULL,
  `idDestination` int(10) NOT NULL,
  `rate` int(1) default null,
  `joined` int (1) default 0,
  `notify` int(1) default 0,
  PRIMARY KEY (idUser, idDestination),
  FOREIGN KEY (idUser) REFERENCES Users(id),
  FOREIGN KEY (idDestination) REFERENCES Destinations(id)
);

INSERT INTO Users SET `idFacebook` = '0000000000000000', `displayName` = 'Test1', `gender` = 'female';
INSERT INTO Users SET `idFacebook` = '0000000000000001', `displayName` = 'Test2', `gender` = 'male';
INSERT INTO Users SET `idFacebook` = '0000000000000002', `displayName` = 'Test3', `gender` = 'female';
INSERT INTO Users SET `idFacebook` = '0000000000000003', `displayName` = 'Test4', `gender` = 'male';

INSERT INTO Destinations SET `type` = 'touristPlace', `name` = 'Nguyen Hue Walking Street', `address` = '66A Nguyễn Huệ, Bến Nghé, Quận 1', `photos`='1', `lat` = 10.774359, `lng` = 106.703565;
INSERT INTO Destinations SET `type` = 'cinema', `name` = 'Train to Busan - Lotte Cinema', `address` = 'Tầng 4, Lotte Mart, 968 Đường, 3 Tháng 2, Phường 15, District 11, Ho Chi Minh, Việt Nam', `photos`='2', `lat` = 10.764614, `lng` = 106.656823;
INSERT INTO Destinations SET `type` = 'restaurant', `name` = 'KFC Ly Thuong Kiet', `address` = '446 Lý Thường Kiệt, phường 7, Hồ Chí Minh, phường 7 Tân Bình Hồ Chí Minh, Việt Nam', `photos`='3', `lat` = 10.786990, `lng` = 106.654075;

INSERT INTO UserDesInteract SET `idUser` = 1, `idDestination` = 1, `rate` = 3, `joined` = 1, `notify` = 0;
INSERT INTO UserDesInteract SET `idUser` = 1, `idDestination` = 2, `rate` = 5, `joined` = 1, `notify` = 1;
INSERT INTO UserDesInteract SET `idUser` = 1, `idDestination` = 3, `rate` = 1, `joined` = 1, `notify` = 1;
INSERT INTO UserDesInteract SET `idUser` = 2, `idDestination` = 1, `rate` = 4, `joined` = 1, `notify` = 0;
INSERT INTO UserDesInteract SET `idUser` = 2, `idDestination` = 3, `rate` = 1, `joined` = 0, `notify` = 0;
INSERT INTO UserDesInteract SET `idUser` = 3, `idDestination` = 1, `rate` = 5, `joined` = 0, `notify` = 0;
INSERT INTO UserDesInteract SET `idUser` = 3, `idDestination` = 2, `rate` = 4, `joined` = 1, `notify` = 1;
INSERT INTO UserDesInteract SET `idUser` = 3, `idDestination` = 3, `rate` = 2, `joined` = 1, `notify` = 1;
INSERT INTO UserDesInteract SET `idUser` = 4, `idDestination` = 3, `rate` = 2, `joined` = 1, `notify` = 1;


CREATE VIEW UserPublicView AS
SELECT id, displayName, photo, gender, age
FROM Users;

CREATE VIEW Statistic AS
SELECT idDestination as id1, AVG(rate) AS rate, SUM(joined) AS joined, SUM(notify) AS notify
FROM UserDesInteract
GROUP BY idDestination;

CREATE VIEW GoingUser AS
SELECT idDestination as id2, GROUP_CONCAT(idUser) as going
FROM UserDesInteract
WHERE notify = 1
GROUP BY idDestination;

CREATE VIEW D1 AS
SELECT * FROM
(Destinations LEFT JOIN Statistic ON Destinations.id = Statistic.id1);

CREATE VIEW DestinationsView AS
SELECT *
FROM
  D1
  LEFT JOIN GoingUser ON D1.id = GoingUser.id2;
