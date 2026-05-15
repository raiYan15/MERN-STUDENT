-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminid` int NOT NULL AUTO_INCREMENT,
  `adminname` varchar(100) NOT NULL,
  `adminemail` varchar(100) NOT NULL,
  `adminpass` varchar(255) NOT NULL,
  PRIMARY KEY (`adminid`),
  UNIQUE KEY `adminemail` (`adminemail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Admin Name','admin@example.com','$2b$12$pGdftzx1xawuI8JkEpAW9.8cbeiOxzA8XxMqSVPVdxaTaftk7r/Z.');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `facultyid` int NOT NULL AUTO_INCREMENT,
  `facultyname` varchar(100) NOT NULL,
  `facultyemail` varchar(100) NOT NULL,
  `facultypassword` varchar(255) NOT NULL,
  PRIMARY KEY (`facultyid`),
  UNIQUE KEY `facultyemail` (`facultyemail`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Updated Faculty1','updatedfaculty@example.com','newfacultypass'),(2,'Second Faculty','faculty1@example.com','$2b$12$3tRDtL3H7ftk5zQHJw9CROuv9aLo60deAmhOXiNdt9D7ZgYbeDgAu'),(3,'Renuka devi Kota','renukadevikota37@gmail.com','$2b$12$tpeyZ62/n8Ly51P1FJ4zAu5LrATsnpx8G/YEp/l8Dq6F7ESg1zxKu'),(4,'dwef','jkvnjfn@gmail.com','$2b$12$r3uvb./hyVvQXDUXU22FQOHtbA4RQxBVDtmlPA8KzZLTHAzxU6pe2'),(5,'faculty','faculty@faculty.com','$2b$12$1t/EW/3tywXT7GV0I7UOXOaCATe/Sx2HnCJu9DWwfDb0H1BAYIzmK'),(6,'haii','haaii@faculty.com','$2b$12$WbQpVUfetWbcTgjYD/FtZul5iGbFs0QWq35gdgEcD74849Aj6ij42');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `studentid` int NOT NULL AUTO_INCREMENT,
  `studentname` varchar(100) NOT NULL,
  `studentmail` varchar(250) DEFAULT NULL,
  `studentpassword` text,
  `facultyid` int DEFAULT NULL,
  `studentphn` bigint DEFAULT NULL,
  PRIMARY KEY (`studentid`),
  KEY `facultyid` (`facultyid`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`facultyid`) REFERENCES `faculty` (`facultyid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Updated Student 1','updated@example.com','newpassword123',3,9123456780),(2,'Two Student ','student2@example.com','$2b$12$rg5/K4ZzDJrxRrCtikjr5e5BWSy78M6X.h8bVQPaet1ZrNK7PBPvS',2,9030728864),(3,'akshay','akshayguptha@gmail.com','$2b$12$GRd8pk/zdRpvGl4NVysBAOImWWV9Vd5XP0gyLz.u/2tWzvaldlpMK',2,6304581226),(4,'aksejf','wef2@gmail.com','$2b$12$dhKHBSXXIkzvE.QjnVY7OuUKhVJfxxd84HbXhdO0VutrQTVwEcILu',2,2345667754),(5,'guptha @','guptha@student.com','$2b$12$b/hQrF01TdZkd/yvq/e6NOVeAdh.PCT7umWDr4hKMIItD0IRhw4qe',2,6281168530),(6,'sujatha','sujatha@gmail.com','$2b$12$BQLHMHVxGSRbtNtgVhQdt.CgbhSO.T0R/pBSdUJpdamHhtNTIyZQa',1,6281168530),(7,'aksahay','aksahay@gmail.com','$2b$12$gM50aC3Rgov019jOTEG5EOQtYEwJOt3C8Az6KXRnGhDM/mVh28te6',2,6304581226);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_progress`
--

DROP TABLE IF EXISTS `student_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_progress` (
  `student_id` int NOT NULL,
  `date` date NOT NULL,
  `status` text,
  `todo_id` int DEFAULT NULL,
  KEY `student_id` (`student_id`),
  KEY `todo_id` (`todo_id`),
  CONSTRAINT `student_progress_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`studentid`) ON DELETE CASCADE,
  CONSTRAINT `student_progress_ibfk_2` FOREIGN KEY (`todo_id`) REFERENCES `todo_list` (`serial_number`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_progress`
--

LOCK TABLES `student_progress` WRITE;
/*!40000 ALTER TABLE `student_progress` DISABLE KEYS */;
INSERT INTO `student_progress` VALUES (2,'2025-05-28','completed',40),(3,'2025-05-28','not completed',41),(4,'2025-05-28','not completed',42),(2,'2025-05-28','not completed',43),(3,'2025-05-28','not completed',44),(4,'2025-05-28','not completed',45),(5,'2025-05-28','not completed',46),(2,'2025-05-28','not completed',47),(3,'2025-05-28','not completed',48),(4,'2025-05-28','not completed',49),(5,'2025-05-28','not completed',50),(2,'2025-05-28','not completed',51),(3,'2025-05-28','not completed',52),(4,'2025-05-28','not completed',53),(5,'2025-05-28','not completed',54),(7,'2025-05-28','not completed',55);
/*!40000 ALTER TABLE `student_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_list`
--

DROP TABLE IF EXISTS `todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_list` (
  `serial_number` int NOT NULL AUTO_INCREMENT,
  `facultyid` int NOT NULL,
  `studentid` int NOT NULL,
  `task_description` text NOT NULL,
  `dead_line` datetime NOT NULL,
  PRIMARY KEY (`serial_number`),
  KEY `facultyid` (`facultyid`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `todo_list_ibfk_1` FOREIGN KEY (`facultyid`) REFERENCES `faculty` (`facultyid`),
  CONSTRAINT `todo_list_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list`
--

LOCK TABLES `todo_list` WRITE;
/*!40000 ALTER TABLE `todo_list` DISABLE KEYS */;
INSERT INTO `todo_list` VALUES (40,2,2,'complete module 2','2025-05-28 11:49:00'),(41,2,3,'complete module 2','2025-05-28 11:49:00'),(42,2,4,'complete module 2','2025-05-28 11:49:00'),(43,2,2,'make a project','2025-05-30 01:00:00'),(44,2,3,'make a project','2025-05-30 01:00:00'),(45,2,4,'make a project','2025-05-30 01:00:00'),(46,2,5,'make a project','2025-05-30 01:00:00'),(47,2,2,'complete a project','2025-05-28 13:00:00'),(48,2,3,'complete a project','2025-05-28 13:00:00'),(49,2,4,'complete a project','2025-05-28 13:00:00'),(50,2,5,'complete a project','2025-05-28 13:00:00'),(51,2,2,'complete project','2025-06-02 22:00:00'),(52,2,3,'complete project','2025-06-02 22:00:00'),(53,2,4,'complete project','2025-06-02 22:00:00'),(54,2,5,'complete project','2025-06-02 22:00:00'),(55,2,7,'complete project','2025-06-02 22:00:00');
/*!40000 ALTER TABLE `todo_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 14:46:05
