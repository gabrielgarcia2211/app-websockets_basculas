-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: serial-bd
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `control`
--

DROP TABLE IF EXISTS `control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime DEFAULT NULL,
  `registro` bigint(20) NOT NULL,
  `id_bascula` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bascula_id_IDX` (`id`) USING BTREE,
  KEY `control_FK` (`id_bascula`),
  CONSTRAINT `control_FK` FOREIGN KEY (`id_bascula`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `control`
--

LOCK TABLES `control` WRITE;
/*!40000 ALTER TABLE `control` DISABLE KEYS */;
INSERT INTO `control` VALUES (135,'2022-04-23 15:56:13',44,1),(136,'2022-04-23 15:56:19',11,1),(137,'2022-04-23 15:56:30',55,1),(138,'2022-04-23 15:56:32',88,1),(139,'2022-04-23 15:56:34',99,1),(140,'2022-04-23 15:56:36',99,1),(141,'2022-04-23 15:56:38',99,1),(142,'2022-04-23 15:56:40',66,1),(143,'2022-04-23 15:57:02',88,1),(144,'2022-04-24 15:29:45',11,2),(145,'2022-04-24 15:30:07',222,2),(146,'2022-04-24 15:31:16',11,3),(147,'2022-04-24 15:31:28',40,3),(148,'2022-04-24 15:36:06',0,4),(149,'2022-04-24 15:42:41',22,2),(150,'2022-04-24 15:42:45',222,2),(151,'2022-04-24 15:42:46',2,2),(152,'2022-04-24 15:42:46',0,2),(153,'2022-04-24 15:42:46',2,2),(154,'2022-04-24 15:42:46',2,2),(155,'2022-04-24 15:42:47',2,2),(156,'2022-04-24 15:42:47',22,2),(157,'2022-04-24 15:42:47',2,2),(158,'2022-04-24 15:42:47',2,2),(159,'2022-04-24 15:44:42',2,2),(160,'2022-04-24 15:44:43',2,2),(161,'2022-04-24 15:44:45',2,2),(162,'2022-04-24 15:45:29',11,2),(163,'2022-04-24 15:45:32',2,2),(164,'2022-04-24 15:45:52',2,2),(165,'2022-04-24 15:47:09',11,4),(166,'2022-04-24 15:47:53',22,4),(167,'2022-04-24 15:48:35',1,2),(168,'2022-04-24 15:48:39',22,4),(169,'2022-04-24 15:49:23',11,4),(170,'2022-04-24 15:49:26',66,4);
/*!40000 ALTER TABLE `control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(11) NOT NULL,
  `registro` datetime DEFAULT NULL,
  `id_bascula` int(11) DEFAULT NULL,
  `bloqueado` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'maria','2022-04-24 15:40:27',1,0),(2,'arturo','2022-04-24 15:40:55',2,0),(3,'garcia','2022-04-16 19:54:01',3,0),(4,'francisco','2022-04-16 19:54:01',4,0),(5,'maria','2022-04-16 19:54:01',5,0),(6,'david','2022-04-16 19:54:01',6,0),(7,'juan','2022-04-16 19:54:01',7,0),(8,'francisco','2022-04-16 19:54:01',8,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'serial-bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-24 15:52:49
