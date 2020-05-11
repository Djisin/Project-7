-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2020 at 02:46 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project7`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `commentId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `postId` int(20) NOT NULL,
  `commentText` text COLLATE latin1_general_ci DEFAULT NULL,
  `likes` int(5) DEFAULT 0,
  `comUserLikes` longtext COLLATE latin1_general_ci DEFAULT '{"usersLiked":[]} 	',
  `dislikes` int(5) DEFAULT 0,
  `comUserDislikes` longtext COLLATE latin1_general_ci DEFAULT '{"usersDisliked":[]} 	',
  `comTimeCreated` datetime DEFAULT NULL,
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`commentId`) USING HASH,
  KEY `userId` (`userId`,`postId`),
  KEY `postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commentId`, `userId`, `postId`, `commentText`, `likes`, `comUserLikes`, `dislikes`, `comUserDislikes`, `comTimeCreated`, `edited`, `timeEdited`) VALUES
(1, 44, 40, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]}', '2020-03-23 00:00:00', 0, NULL),
(2, 44, 40, 'llllllllllllllllljjuy', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-03-11 00:00:00', 0, NULL),
(4, 17, 30, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Suspendisse sed nisi lacus sed. Varius morbi enim nunc faucibus a pellentesque. Sed sed risus pretium quam. Sit amet commodo nulla facilisi nullam vehicula. Non tellus orci ac auctor augue mauris augue neque. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Nibh ipsum consequat nisl vel pretium. Amet cursus sit amet dictum sit amet. Convallis a cras semper auctor neque vitae. In est ante in nibh mauris cursus mattis molestie. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Iaculis eu non diam phasellus vestibulum lorem. Leo duis ut diam quam nulla porttitor massa. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh.', 2, '{\"usersLiked\":[56,17]}', 0, '{\"usersDisliked\":[]}', '2020-03-23 17:34:10', 1, '2020-03-23 07:16:09'),
(22, 44, 40, 'ghjk', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-03-24 16:20:22', 1, '2020-03-25 12:06:44'),
(24, 44, 40, 'fffffffffffffffffffffffffffffffff', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '1970-01-01 01:00:00', 0, NULL),
(29, 17, 44, 'rr43r3r34r34r43r3', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-03-25 12:44:07', 0, NULL),
(32, 17, 40, 'da nesto pise da nije bzvzl89', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-03-27 12:20:28', 1, '2020-05-01 14:28:49'),
(49, 17, 40, 'novi komentar?', 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]} 	', '2020-05-01 14:28:49', 0, NULL),
(55, 17, 119, 'kom?', 1, '{\"usersLiked\":[64]}', 0, '{\"usersDisliked\":[]} 	', '2020-05-09 10:35:18', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comseclevel`
--

DROP TABLE IF EXISTS `comseclevel`;
CREATE TABLE IF NOT EXISTS `comseclevel` (
  `comSecLevId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) DEFAULT NULL,
  `postId` int(20) DEFAULT NULL,
  `commentId` int(20) DEFAULT NULL,
  `comSecLevText` text COLLATE latin1_general_ci DEFAULT NULL,
  `likes` int(20) NOT NULL DEFAULT 0,
  `dislikes` int(20) NOT NULL DEFAULT 0,
  `comUserLikes` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersLiked":[]}',
  `comUserDislikes` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersDisliked":[]}',
  `timeCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`comSecLevId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  KEY `commentId` (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `comseclevel`
--

INSERT INTO `comseclevel` (`comSecLevId`, `userId`, `postId`, `commentId`, `comSecLevText`, `likes`, `dislikes`, `comUserLikes`, `comUserDislikes`, `timeCreated`, `edited`, `timeEdited`) VALUES
(3, 17, 40, 22, 'sdfsdsfsdf', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 12:44:34', 0, NULL),
(4, 17, 40, 22, 'opet promenjen?', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 12:44:38', 1, '2020-03-30 14:12:42'),
(5, 17, 40, 1, 'sdfsdfsdfsdf', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 12:44:42', 0, NULL),
(6, 17, 40, 32, 'sdfsdfsdfsdfsdfvdc df vdf vdfvd', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 12:44:49', 0, NULL),
(7, 17, 44, 32, 'werwerwer', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 13:13:29', 0, NULL),
(8, 17, 44, 32, 'werwerwerwerwrwer', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 13:13:36', 0, NULL),
(9, 17, 40, 22, 'promenjen 1?', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-27 13:34:51', 1, '2020-03-30 14:12:42'),
(18, 17, 40, 24, 'hgfhfhfhfhfh hffhfg', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-28 13:07:59', 0, NULL),
(19, 17, 40, 24, 'opet', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-28 13:08:09', 0, NULL),
(20, 17, 40, 32, 'radi i dalje?\n', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-28 14:25:49', 0, NULL),
(21, 44, 40, 32, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-28 15:10:43', 0, NULL),
(22, 44, 44, 29, 'sfdsdfdsfdssfdfsfs', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-28 18:22:19', 0, NULL),
(29, 44, 40, 2, 'nkuuiuhyggh7io', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-03-31 09:10:09', 0, NULL),
(37, 17, NULL, NULL, NULL, 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-01 09:58:32', 0, NULL),
(38, 17, NULL, NULL, NULL, 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-01 10:02:26', 0, NULL),
(39, 17, 40, NULL, NULL, 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-01 10:15:33', 0, NULL),
(40, 17, 40, NULL, NULL, 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-01 10:17:42', 0, NULL),
(45, 17, 119, 55, 'kom', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-09 13:05:59', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hackreports`
--

DROP TABLE IF EXISTS `hackreports`;
CREATE TABLE IF NOT EXISTS `hackreports` (
  `reportId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `fieldAttempt` text COLLATE latin1_general_ci NOT NULL,
  `fieldHTML` text COLLATE latin1_general_ci NOT NULL,
  `location` text COLLATE latin1_general_ci NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mmcomment`
--

DROP TABLE IF EXISTS `mmcomment`;
CREATE TABLE IF NOT EXISTS `mmcomment` (
  `mmCommentId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `mmPostId` int(20) NOT NULL,
  `commentText` text COLLATE latin1_general_ci DEFAULT NULL,
  `likes` int(5) DEFAULT 0,
  `comUserLikes` longtext COLLATE latin1_general_ci DEFAULT '{"usersLiked":[]} 	',
  `dislikes` int(5) DEFAULT 0,
  `comUserDislikes` longtext COLLATE latin1_general_ci DEFAULT '{"usersDisliked":[]} 	',
  `comTimeCreated` datetime DEFAULT NULL,
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`mmCommentId`) USING HASH,
  KEY `userId` (`userId`,`mmPostId`),
  KEY `postId` (`mmPostId`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `mmcomment`
--

INSERT INTO `mmcomment` (`mmCommentId`, `userId`, `mmPostId`, `commentText`, `likes`, `comUserLikes`, `dislikes`, `comUserDislikes`, `comTimeCreated`, `edited`, `timeEdited`) VALUES
(49, 17, 33, 'normalno da nesto pise', 0, '{\"usersLiked\":[]}', 2, '{\"usersDisliked\":[17,44]}', '2020-04-22 21:09:16', 1, '2020-04-23 10:42:45'),
(50, 17, 24, 'promena 25', 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[17]}', '2020-04-22 21:09:16', 1, '2020-04-23 10:42:45'),
(52, 17, 24, 'nesto lepo?', 0, '{\"usersLiked\":[]}', 2, '{\"usersDisliked\":[17,62]}', '2020-04-23 10:42:45', 1, '2020-04-29 09:59:23'),
(54, 17, 33, 'lnllklk', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-04-23 10:42:45', 1, '2020-04-29 09:59:23'),
(55, 17, 32, 'clean edit?g', 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]}', '2020-04-23 10:42:45', 1, '2020-04-29 09:59:23'),
(56, 17, 33, 'text', 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[17]}', '2020-04-23 10:42:45', 1, '2020-04-29 09:59:23'),
(57, 17, 32, 'Da nesto lepo pise?', 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]}', '2020-04-23 10:42:45', 1, '2020-04-29 09:59:23'),
(58, 17, 32, 'scscscs', 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[17]}', '2020-04-23 10:42:45', 0, NULL),
(59, 17, 3, 'fgd', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-25 12:04:14', 0, NULL),
(61, 17, 3, 'hgwefjudxsg', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-25 12:04:14', 0, NULL),
(62, 44, 32, 'gjunm', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-26 12:44:05', 0, NULL),
(63, 17, 33, 'da izmenim nesto?', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-26 12:44:05', 1, '2020-04-29 09:59:23'),
(64, 17, 24, 'pera?', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-27 15:12:54', 0, NULL),
(65, 17, 42, 'koment?', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-04-29 09:59:23', 0, NULL),
(66, 44, 42, 'mbmbmbmb', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-29 09:59:23', 0, NULL),
(67, 44, 26, 'mbmbmbmbmbmb', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-04-29 09:59:23', 0, NULL),
(70, 17, 42, 'sad?', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-05-01 12:06:41', 0, NULL),
(71, 17, 42, 'a sad?', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-05-01 12:06:41', 0, NULL),
(72, 17, 42, 'da li?', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-05-01 12:06:41', 0, NULL),
(73, 17, 42, 'jj77', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-05-01 14:28:49', 1, '2020-05-01 14:28:49'),
(75, 62, 60, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 0, '{\"usersLiked\":[]} 	', 0, '{\"usersDisliked\":[]} 	', '2020-05-07 22:00:13', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mmcomseclevel`
--

DROP TABLE IF EXISTS `mmcomseclevel`;
CREATE TABLE IF NOT EXISTS `mmcomseclevel` (
  `mmComSecLevId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) DEFAULT NULL,
  `mmPostId` int(20) DEFAULT NULL,
  `mmCommentId` int(20) DEFAULT NULL,
  `comSecLevText` text COLLATE latin1_general_ci DEFAULT NULL,
  `likes` int(20) NOT NULL DEFAULT 0,
  `dislikes` int(20) NOT NULL DEFAULT 0,
  `comUserLikes` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersLiked":[]}',
  `comUserDislikes` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersDisliked":[]}',
  `timeCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`mmComSecLevId`),
  KEY `userId` (`userId`),
  KEY `postId` (`mmPostId`),
  KEY `commentId` (`mmCommentId`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `mmcomseclevel`
--

INSERT INTO `mmcomseclevel` (`mmComSecLevId`, `userId`, `mmPostId`, `mmCommentId`, `comSecLevText`, `likes`, `dislikes`, `comUserLikes`, `comUserDislikes`, `timeCreated`, `edited`, `timeEdited`) VALUES
(48, 17, 33, 49, 'ada', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-23 08:42:45', 1, '2020-04-29 09:59:23'),
(52, 17, 3, 59, 'dfhjjgegrhrt', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-25 10:04:14', 0, NULL),
(53, 17, 3, 59, 'gdfgdhdhdh', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-25 10:04:14', 0, NULL),
(54, 44, 32, 55, 'bhjmkl;,.', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-26 10:44:05', 0, NULL),
(56, 17, 42, 65, 'a ovde?', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-29 07:59:23', 1, '2020-04-29 09:59:23'),
(57, 44, 42, 65, 'mbmbmmbmbm', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-04-29 07:59:23', 0, NULL),
(59, 17, 42, 66, '080808kkk', 0, 0, '{\"usersLiked\":[]}', '{\"usersDisliked\":[]}', '2020-05-01 12:28:49', 1, '2020-05-01 14:28:49');

-- --------------------------------------------------------

--
-- Table structure for table `mmpost`
--

DROP TABLE IF EXISTS `mmpost`;
CREATE TABLE IF NOT EXISTS `mmpost` (
  `mmPostId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `postText` text COLLATE latin1_general_ci DEFAULT NULL,
  `postMMField` text COLLATE latin1_general_ci DEFAULT NULL,
  `embed` tinyint(1) NOT NULL DEFAULT 0,
  `postLikes` int(10) NOT NULL DEFAULT 0,
  `postUsersLiked` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{"usersLiked":[]}' CHECK (json_valid(`postUsersLiked`)),
  `postDislikes` int(10) NOT NULL DEFAULT 0,
  `postUsersDisliked` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{"usersDisliked":[]} ' CHECK (json_valid(`postUsersDisliked`)),
  `timeCreated` timestamp NULL DEFAULT NULL,
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`mmPostId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `mmpost`
--

INSERT INTO `mmpost` (`mmPostId`, `userId`, `postText`, `postMMField`, `embed`, `postLikes`, `postUsersLiked`, `postDislikes`, `postUsersDisliked`, `timeCreated`, `edited`, `timeEdited`) VALUES
(3, 17, 'samo post 2', NULL, 0, 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[17]}', '2020-04-11 11:50:11', 0, NULL),
(9, 17, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyecYl3T2PgJbMiyrmsg4-z8ekSEDE1PRdlNssbd9SM1_W3ebZ&usqp=CAU', 1, 1, '{\"usersLiked\":[62]}', 1, '{\"usersDisliked\":[17]}', '2020-04-11 12:02:09', 0, NULL),
(24, 17, 'dffdf', NULL, 0, 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]}', '2020-04-15 07:23:57', 0, NULL),
(26, 17, 'obisao sliku', NULL, 0, 1, '{\"usersLiked\":[17]}', 0, '{\"usersDisliked\":[]}', '2020-04-15 07:25:47', 1, '2020-04-17 10:58:19'),
(32, 17, 'izmena ?', NULL, 0, 1, '{\"usersLiked\":[17]}', 1, '{\"usersDisliked\":[62]}', '2020-04-17 08:58:19', 1, '2020-04-26 12:44:05'),
(33, 17, 'novi post? ??', NULL, 0, 2, '{\"usersLiked\":[44,17]}', 0, '{\"usersDisliked\":[]}', '2020-04-22 09:16:44', 1, '2020-04-26 12:44:05'),
(42, 17, 'novi post kod pere h', NULL, 0, 1, '{\"usersLiked\":[64]}', 0, '{\"usersDisliked\":[]}', '2020-04-27 13:12:54', 1, '2020-05-09 18:36:08'),
(43, 44, '17:50 nnovi post', NULL, 0, 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[64]}', '2020-04-27 13:12:54', 0, NULL),
(60, 62, 'prvi possttttttttttttttttt', 'http://127.0.0.1:3000/images/IMG-20191222-WA0051.jpg1589180682959.jpg', 0, 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]} ', '2020-05-07 20:00:13', 1, '2020-05-11 09:04:43'),
(103, 44, NULL, 'http://127.0.0.1:3000/images/giphy.webp1589182893770.webp', 0, 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]} ', '2020-05-11 07:41:34', 0, NULL),
(104, 17, NULL, 'http://127.0.0.1:3000/images/b55e3bafe484a0ead34d5e3849bd1e11.gif1589187652782.gif', 0, 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]} ', '2020-05-11 09:00:52', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mmreports`
--

DROP TABLE IF EXISTS `mmreports`;
CREATE TABLE IF NOT EXISTS `mmreports` (
  `mmReportId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `mmPostId` int(20) NOT NULL,
  `mmCommentId` int(20) DEFAULT NULL,
  `mmComSecLevId` int(20) DEFAULT NULL,
  `reportReason` text COLLATE latin1_general_ci DEFAULT NULL,
  `timeReported` timestamp NOT NULL DEFAULT current_timestamp(),
  `whoCreatedPost` text COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`mmReportId`),
  KEY `userId` (`userId`),
  KEY `mmPostId` (`mmPostId`),
  KEY `mmCommentId` (`mmCommentId`),
  KEY `mmComSecLevId` (`mmComSecLevId`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `mmreports`
--

INSERT INTO `mmreports` (`mmReportId`, `userId`, `mmPostId`, `mmCommentId`, `mmComSecLevId`, `reportReason`, `timeReported`, `whoCreatedPost`) VALUES
(88, 44, 42, NULL, NULL, 'Spam', '2020-04-29 17:56:07', '17'),
(89, 44, 42, 65, NULL, 'Spam', '2020-04-29 17:56:44', '17'),
(95, 44, 33, 49, 48, 'Spam', '2020-04-29 18:13:57', '17'),
(98, 17, 60, NULL, NULL, 'Spam', '2020-05-09 19:35:28', '62');

-- --------------------------------------------------------

--
-- Table structure for table `moreuserinfo`
--

DROP TABLE IF EXISTS `moreuserinfo`;
CREATE TABLE IF NOT EXISTS `moreuserinfo` (
  `userInfoId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `personalLine` text COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`userInfoId`),
  UNIQUE KEY `userId_2` (`userId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `moreuserinfo`
--

INSERT INTO `moreuserinfo` (`userInfoId`, `userId`, `personalLine`) VALUES
(2, 17, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'),
(4, 44, 'There should be something written here'),
(5, 52, ''),
(15, 62, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ips'),
(16, 63, 'Share your thoughts'),
(18, 65, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `postId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `postTitle` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `postText` text COLLATE latin1_general_ci DEFAULT NULL,
  `postPicture` text COLLATE latin1_general_ci DEFAULT NULL,
  `postLikes` int(10) NOT NULL DEFAULT 0,
  `postUserLiked` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersLiked":[]}',
  `postDislikes` int(10) NOT NULL DEFAULT 0,
  `postUserDisliked` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"usersDisliked":[]}',
  `postTimeCreated` timestamp NULL DEFAULT NULL,
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `timeEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`postId`) USING HASH,
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`postId`, `userId`, `postTitle`, `postText`, `postPicture`, `postLikes`, `postUserLiked`, `postDislikes`, `postUserDisliked`, `postTimeCreated`, `edited`, `timeEdited`) VALUES
(3, 17, 'Monaliza', 'sfsdfsdfsfdThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', NULL, 50, '{\"usersLiked\":[]} ', 47, '{\"usersDisliked\":[]} 	', '2020-03-08 14:57:15', 1, '2020-03-21 12:11:07'),
(7, 17, 'Monaliza i 40 lekara', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 34, '{\"usersLiked\":[62,17]}', 0, '{\"usersDisliked\":[]} 	', '2020-03-14 19:27:00', 1, '2020-03-22 12:39:23'),
(10, 17, 'Monaliza i njeni memoari', '    pace-around: items are evenly distributed in the line with equal space around them. Note that visually the spaces aren\'t equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.    space-evenly: items are distributed so that the spacing between any two items (and the space to the edges) is equal.Note that that browser support for these values is nuanced. For example, space-between never got support from some versions of Edge, and start/end/left/right aren\'t in Chrome yet. MDN has detailed charts. The safest values are flex-start, flex-end, and center.There are also two additional keywords you can pair with these values: safe and unsafe. Using safe ensures that however you do this type of positioning, you can\'t push an element such that it renders off-screen (e.g. off the top) in such a way the content can\'t be scrolled too (called \"data loss\"). ', NULL, 65, '{\"usersLiked\":[]} ', 66, '{\"usersDisliked\":[]} 	', '2020-03-16 16:34:34', 1, '2020-03-22 12:40:01'),
(20, 17, 'Monaliza bezi od kuce', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', NULL, 0, '{\"usersLiked\":[]} ', 0, '{\"usersDisliked\":[]} 	', '2020-03-16 20:15:22', 1, '2020-03-21 12:10:07'),
(21, 17, 'Monaliza i dva monaha', 'When the requirements get more complex like uploading multiple files or a folder, showing previews etc. it is encouraged to use some more sophisticated solutions. They usually use flash fallbacks for the file dialog and XHR2 so they can support rich features even in ancient browsers.Bene StudioReact Native, React, Cloud, Full Stack DevelopmentFollow', NULL, 0, '{\"usersLiked\":[]} ', 0, '{\"usersDisliked\":[]} 	', '2020-03-16 20:19:23', 1, '2020-03-21 12:09:38'),
(22, 44, 'Monaliza krece na sluzbeni put', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 23, '{\"usersLiked\":[]} ', 0, '{\"usersDisliked\":[]} 	', '2020-03-20 14:27:07', 0, NULL),
(23, 44, 'Monaliza se vraca sa sluzbenog puta trudna', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', NULL, 0, '{\"usersLiked\":[]} ', 0, '{\"usersDisliked\":[]} 	', '2020-03-20 19:38:44', 0, NULL),
(24, 44, 'Monaliza kad se vratila neocekivano trudna', 'There are two options available, destination and filename. They are both functions that determine where the file should be stored.\n\ndestination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. \'/tmp/uploads\'). If no destination is given, the operating system’s default directory for temporary files is used.\n\nNote: You are responsible for creating the directory when providing destination as a function. When passing a string, multer will make sure that the directory is created for you.\n\nfilename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn’t include any file extension.\n\nNote: Multer will not append any file extension for you, your function should return a filename complete with an file extension.\n\nEach function gets passed both the request (req) and some information about the file (file) to aid with the decision.\n\nNote that req.body might not have been fully populated yet. It depends on the order that the client transmits fields and files to the server.', NULL, 0, '{\"usersLiked\":[]} ', 7, '{\"usersDisliked\":[56]}', '2020-03-20 19:52:22', 0, NULL),
(25, 17, 'Monaliza jedva prezivljava trudnocu', '<p>Nullam est arcu, faucibus non pharetra varius, pharetra vitae libero. Nullam aliquam accumsan magna, id lobortis justo aliquet ut. Maecenas eget arcu sit amet dui imperdiet interdum id ac purus. Etiam a convallis mi. Vivamus finibus sapien quis lorem ultrices malesuada. Donec sed dolor mauris. Donec ut mi sit amet nisl suscipit eleifend. Phasellus posuere est a sollicitudin varius. Vestibulum a nulla a ligula dictum blandit. Suspendisse egestas tortor lectus, elementum aliquet purus commodo et. Proin elementum, tortor at sollicitudin blandit, libero turpis volutpat ante, et aliquet ligula velit id eros. Proin accumsan, justo eget dignissim imperdiet, est nulla maximus arcu, iaculis porta quam nisi ut odio.Aenean lobortis, augue eget faucibus tempor, tellus ante accumsan sem, eget varius erat erat ut sem. Duis ultrices maximus nunc, id dapibus quam mollis nec. Sed non dolor quam. Integer libero eros, rhoncus tempor elit nec, feugiat maximus enim. Vestibulum vel rutrum elit. Nam elementum risus vitae finibus auctor. Nulla sit amet tincidunt eros. Nunc sed posuere diam. Aenean eget vestibulum lacus, ac finibus nibh. Proin orci sapien, consectetur quis feugiat in, porttitor at lacus. Nullam ante metus, hendrerit commodo sodales iaculis, feugiat in est. Nullam ultrices, orci in scelerisque tempor, purus diam venenatis arcu, eu gravida neque nibh ut est. In ut eleifend elit, scelerisque dictum neque. Quisque iaculis aliquet dui, sit amet tincidunt est fermentum nec. Vestibulum cursus nisi sit amet ante rutrum, quis fringilla diam tempus. Nullam varius metus a nibh fermentum, eu dignissim augue dapibus.</p>', NULL, 1, '{\"usersLiked\":[56]}', 0, '{\"usersDisliked\":[]} 	', '2020-03-20 19:55:12', 1, '2020-05-09 22:31:24'),
(30, 44, 'Monaliza i nepoznati prolaznik', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', NULL, 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-03-22 11:46:31', 0, NULL),
(40, 17, 'Some random post Title', ' Nam nibh elit, scelerisque vitae massa quis, aliquet porta nulla. Nullam sodales sodales felis, id posuere quam commodo ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor tristique justo sollicitudin tristique. Ut libero sapien, facilisis at nisl egestas, gravida cursus lacus. Donec in eros sollicitudin libero iaculis pharetra. Nulla et sem rhoncus, posuere risus vel, consectetur tellus. Ut consequat mattis felis, ut finibus eros cursus ac. Nunc quis felis ex. Sed fermentum sit amet lorem non gravida. Ut suscipit varius purus, sed tempus nulla dignissim nec.Praesent nec faucibus sem. Vestibulum consectetur molestie consequat. Pellentesque tempor mi tellus, nec ullamcorper magna egestas vel. Donec est felis, ultricies non pulvinar at, molestie et tellus. Curabitur vitae magna nec risus lobortis eleifend et ut quam. Pellentesque sagittis ex id risus commodo molestie. Vestibulum massa dolor, auctor vel turpis quis, condimentum congue eros. Quisque tempor porttitor sapien eget ultricies. Sed pellentesque libero nisi, ut pellentesque velit euismod vel. Ut feugiat venenatis metus, id sodales neque pulvinar hendrerit. Sed efficitur in ipsum a blandit. ', 'http://127.0.0.1:3000/images/DSC_9917.JPG1588358803793.jpg', 0, '{\"usersLiked\":[]}', 1, '{\"usersDisliked\":[52]}', '2020-03-22 14:13:25', 1, '2020-05-01 20:46:43'),
(44, 17, 'Some random post Title', 'freThis work includes material that may be protected as a trademark in some jurisdictions. If you want to use it, you have to ensure that you have the legal right to ', 'http://127.0.0.1:3000/images/DSC_9920.JPG1588358780400.jpg', 1, '{\"usersLiked\":[64]}', 0, '{\"usersDisliked\":[]} 	', '2020-03-24 15:42:01', 1, '2020-05-04 11:53:56'),
(110, 17, 'novisssss', '<h1 style=\"text-align: center;\"><strong>mika</strong></h1>\n<p style=\"text-align: left;\">Returns the editors content area container element. The this element is the one who holds the iframe or the editable element. Returns the editors content area container element. The this element is the one who holds the iframe or the editable element. Returns the editors content area container element. The this element is the one who holds the iframe or the editable element. Returns the editors content area container element. The this element is the one who holds the iframe or the editable element.&nbsp;</p>\n<ol>\n<li style=\"text-align: left;\">Returns the editors content area container element. The this element is the one who holds the iframe or the editable element. Returns the editors content area container element. The this element is the one who holds the iframe or the editable element.&nbsp;</li>\n<li style=\"text-align: left;\">Returns the editors content area container element. The this element is the one who holds the iframe or the editable</li>\n<li style=\"text-align: left;\">&nbsp;</li>\n<li style=\"text-align: left;\">&lt;a&gt;javasctript:&lt;/a&gt;</li>\n<li style=\"text-align: left;\">Returns the editors content area container element. The this element is the one who holds the iframe or the editable element.&nbsp;</li>\n</ol>', NULL, 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-05-04 17:06:08', 1, '2020-05-11 11:15:51'),
(119, 62, 'Milica i Nzm', '<h1 style=\"text-align: center;\"><span style=\"background-color: #ffffff;\"><em><strong>Lorem ipsum</strong></em></span></h1>\r\n<div>\r\n<h5><em>What is Lorem Ipsum?</em></h5>\r\n<p style=\"text-align: justify;\"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n</div>\r\n<div>\r\n<h2>Why do we use it?</h2>\r\n<p style=\"padding-left: 40px;\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\r\n</div>\r\n<div>\r\n<h2>Where does it come from?</h2>\r\n<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>\r\n</div>', 'http://127.0.0.1:3000/images/FB_IMG_1579891472849.jpg1588887132202.jpg', 1, '{\"usersLiked\":[62]}', 0, '{\"usersDisliked\":[]}', '2020-05-07 21:32:12', 1, '2020-05-08 13:00:46'),
(129, 17, 'Lorem Lorem', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget enim ultricies, eleifend augue nec, dictum justo. Ut sed felis aliquam, auctor metus et, scelerisque erat. Vivamus vitae sem aliquet risus elementum vestibulum vel non leo. Suspendisse ipsum nisi, maximus eu tempor non, hendrerit at sapien. Aliquam vehicula mi vitae congue blandit. Nunc ut tristique nisi, at bibendum massa. Nam vel mauris vel ligula pharetra egestas vel id arcu. Donec varius quis est nec placerat. Aliquam at quam in dui iaculis feugiat. Sed ut interdum est. Quisque ut feugiat tellus, vitae iaculis nisl. Cras sit amet tempus lorem. Nunc sollicitudin varius enim, sit amet accumsan nunc imperdiet in.&nbsp;</p>', 'http://127.0.0.1:3000/images/IMG_20190202_121616_430.jpg1589208258704.jpg', 0, '{\"usersLiked\":[]}', 0, '{\"usersDisliked\":[]}', '2020-05-11 09:05:01', 1, '2020-05-11 16:44:18');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
CREATE TABLE IF NOT EXISTS `reports` (
  `reportId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `postId` int(20) NOT NULL,
  `commentId` int(20) DEFAULT NULL,
  `comSecLevId` int(20) DEFAULT NULL,
  `reportReason` text COLLATE latin1_general_ci DEFAULT NULL,
  `timeReported` timestamp NOT NULL DEFAULT current_timestamp(),
  `whoCreatedPost` text COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  KEY `commentId` (`commentId`),
  KEY `comSecLevId` (`comSecLevId`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`reportId`, `userId`, `postId`, `commentId`, `comSecLevId`, `reportReason`, `timeReported`, `whoCreatedPost`) VALUES
(75, 17, 40, 22, NULL, 'Spam', '2020-05-01 15:15:45', '44'),
(76, 17, 40, 1, NULL, 'Spam', '2020-05-01 15:22:26', '44'),
(78, 62, 7, NULL, NULL, 'Fake news', '2020-05-07 21:41:54', '17');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `username` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `password` text COLLATE latin1_general_ci NOT NULL,
  `firstName` text COLLATE latin1_general_ci DEFAULT NULL,
  `lastName` text COLLATE latin1_general_ci DEFAULT NULL,
  `timeCreated` datetime NOT NULL,
  `timeUpdated` timestamp NOT NULL DEFAULT current_timestamp(),
  `postsSeen` longtext COLLATE latin1_general_ci NOT NULL DEFAULT '{"seen":[]}',
  `userPicture` text COLLATE latin1_general_ci NOT NULL DEFAULT 'img/userDef.jpg',
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`) USING HASH,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `email`, `username`, `password`, `firstName`, `lastName`, `timeCreated`, `timeUpdated`, `postsSeen`, `userPicture`, `admin`) VALUES
(17, 'pera@pera.com', 'Pera-peric', '$2b$10$mXlKQE5wAjrxvziYEpUfJuB1ZPDNqRe4XdKHpriTbR1SpYxZX7/VC', 'Pera', 'Peric', '2020-03-08 15:36:22', '2020-03-08 14:36:22', '{\"seen\":[45,44,40,30,7,25,20,110,114,119,22,129]}', 'http://127.0.0.1:3000/images/FB_IMG_1579891427295.jpg1589125169640.jpg', 0),
(44, 'zika@pera.com', 'zikic-zicka236666666', '$2b$10$mXlKQE5wAjrxvziYEpUfJuB1ZPDNqRe4XdKHpriTbR1SpYxZX7/VC', 'Zika', 'Zikic', '2020-03-19 13:03:51', '2020-03-19 12:03:51', '{\"seen\":[45,40,129]}', 'http://127.0.0.1:3000/images/2207f911fc087e09155f6100d57395c2.jpg1589040197181.jpg', 0),
(52, 'mika@pera.com', 'mikaCar', '$2b$10$mXlKQE5wAjrxvziYEpUfJuB1ZPDNqRe4XdKHpriTbR1SpYxZX7/VC', 'Mika', 'Mikic', '2020-04-02 16:50:44', '2020-04-02 14:50:44', '{\"seen\":[40,45,110]}', 'img/userDef.jpg', 1),
(62, 'jova@pera.com', 'jovica123', '$2b$10$sM5bYYSlXPLO3SEF95AUhenUMy9Up7j1NFsyOAdurGdjWrKhuR806', 'Jova', 'Jovic', '2020-05-07 22:00:13', '2020-05-07 21:27:21', '{\"seen\":[119,7,20,40,110,25]}', 'http://127.0.0.1:3000/images/IMG-20191221-WA0039.jpg1588887238489.jpg', 0),
(63, 'mira@pera.com', 'jkbiauhcuu', '$2b$10$cJ91GYWjbYFxGX/sBMcDleDINh0LAdG7YBBWwOCv2KUP./VBS4.Xi', 'mira', 'pira', '2020-05-09 10:35:18', '2020-05-09 13:11:00', '{\"seen\":[]}', 'img/userDef.jpg', 0),
(65, '1234@pera.com', 'snkgnlks', '$2b$10$C0rQNzyFlQmrdZrghNMgUuNVRrZocwjXfYdwWSS/w8Zrk/PpqlEy2', 'dfb', 'nkdfnkl', '2020-05-10 13:48:45', '2020-05-10 15:28:35', '{\"seen\":[]}', 'img/userDef.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usersocnetws`
--

DROP TABLE IF EXISTS `usersocnetws`;
CREATE TABLE IF NOT EXISTS `usersocnetws` (
  `userSocialNetwId` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `facebook` text COLLATE latin1_general_ci DEFAULT NULL,
  `twitter` text COLLATE latin1_general_ci DEFAULT NULL,
  `linkendIn` text COLLATE latin1_general_ci DEFAULT NULL,
  `userWebSite` text COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`userSocialNetwId`),
  UNIQUE KEY `userId_2` (`userId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `usersocnetws`
--

INSERT INTO `usersocnetws` (`userSocialNetwId`, `userId`, `facebook`, `twitter`, `linkendIn`, `userWebSite`) VALUES
(1, 17, 'https://www.facebook.com/hhhhhhhhhhhhhhhhhh', NULL, NULL, NULL),
(3, 44, NULL, NULL, NULL, NULL),
(5, 52, NULL, NULL, NULL, NULL),
(16, 62, NULL, NULL, NULL, NULL),
(17, 63, NULL, NULL, NULL, NULL),
(19, 65, NULL, NULL, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE CASCADE;

--
-- Constraints for table `comseclevel`
--
ALTER TABLE `comseclevel`
  ADD CONSTRAINT `comseclevel_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `comseclevel_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE CASCADE,
  ADD CONSTRAINT `comseclevel_ibfk_3` FOREIGN KEY (`commentId`) REFERENCES `comment` (`commentId`) ON DELETE CASCADE;

--
-- Constraints for table `hackreports`
--
ALTER TABLE `hackreports`
  ADD CONSTRAINT `hackreports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `mmcomment`
--
ALTER TABLE `mmcomment`
  ADD CONSTRAINT `mmcomment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmcomment_ibfk_2` FOREIGN KEY (`mmPostId`) REFERENCES `mmpost` (`mmPostId`) ON DELETE CASCADE;

--
-- Constraints for table `mmcomseclevel`
--
ALTER TABLE `mmcomseclevel`
  ADD CONSTRAINT `mmcomseclevel_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmcomseclevel_ibfk_2` FOREIGN KEY (`mmPostId`) REFERENCES `mmpost` (`mmPostId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmcomseclevel_ibfk_3` FOREIGN KEY (`mmCommentId`) REFERENCES `mmcomment` (`mmCommentId`) ON DELETE CASCADE;

--
-- Constraints for table `mmpost`
--
ALTER TABLE `mmpost`
  ADD CONSTRAINT `mmpost_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `mmreports`
--
ALTER TABLE `mmreports`
  ADD CONSTRAINT `mmreports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmreports_ibfk_2` FOREIGN KEY (`mmPostId`) REFERENCES `mmpost` (`mmPostId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmreports_ibfk_3` FOREIGN KEY (`mmCommentId`) REFERENCES `mmcomment` (`mmCommentId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mmreports_ibfk_4` FOREIGN KEY (`mmComSecLevId`) REFERENCES `mmcomseclevel` (`mmComSecLevId`) ON DELETE CASCADE;

--
-- Constraints for table `moreuserinfo`
--
ALTER TABLE `moreuserinfo`
  ADD CONSTRAINT `moreuserinfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`commentId`) REFERENCES `comment` (`commentId`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`comSecLevId`) REFERENCES `comseclevel` (`comSecLevId`) ON DELETE CASCADE;

--
-- Constraints for table `usersocnetws`
--
ALTER TABLE `usersocnetws`
  ADD CONSTRAINT `usersocnetws_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
