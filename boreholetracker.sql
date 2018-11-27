-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 27, 2018 at 02:37 PM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boreholetracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `boreholes`
--

DROP TABLE IF EXISTS `boreholes`;
CREATE TABLE IF NOT EXISTS `boreholes` (
  `BoreholeID` int(11) NOT NULL AUTO_INCREMENT,
  `BoreholeName` varchar(255) NOT NULL,
  `BoreholeType` varchar(255) NOT NULL,
  `Latitude` float(10,6) NOT NULL,
  `Longitude` float(10,6) NOT NULL,
  `Elevation` double(10,2) NOT NULL,
  `BoreholeActive` bit(1) NOT NULL,
  PRIMARY KEY (`BoreholeID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `waterlevels`
--

DROP TABLE IF EXISTS `waterlevels`;
CREATE TABLE IF NOT EXISTS `waterlevels` (
  `ReadingID` int(11) NOT NULL AUTO_INCREMENT,
  `ReadingDate` date NOT NULL,
  `WaterReading` double(10,2) NOT NULL,
  `BoreholeID` int(11) NOT NULL,
  `ReadingActive` bit(1) NOT NULL,
  PRIMARY KEY (`ReadingID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
