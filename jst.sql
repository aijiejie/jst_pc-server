/*
Navicat MySQL Data Transfer

Source Server         : mysql8
Source Server Version : 80017
Source Host           : 127.0.0.1:3316
Source Database       : jst

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 15:24:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_category
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_category
-- ----------------------------

-- ----------------------------
-- Table structure for t_comments
-- ----------------------------
DROP TABLE IF EXISTS `t_comments`;
CREATE TABLE `t_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `score` decimal(10,1) NOT NULL,
  `course_id` int(11) NOT NULL,
  `insert_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comments_courses` (`course_id`),
  CONSTRAINT `comments_courses` FOREIGN KEY (`course_id`) REFERENCES `t_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_comments
-- ----------------------------

-- ----------------------------
-- Table structure for t_courses
-- ----------------------------
DROP TABLE IF EXISTS `t_courses`;
CREATE TABLE `t_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_title` varchar(255) NOT NULL,
  `course_intro` text NOT NULL,
  `course_img` varchar(255) NOT NULL,
  `course_goals` text,
  `course_for_people` text,
  `teacher_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_focus` tinyint(4) NOT NULL,
  `focus_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_teacher` (`teacher_id`),
  KEY `courses_category` (`category_id`),
  CONSTRAINT `courses_category` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `courses_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `t_teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_courses
-- ----------------------------

-- ----------------------------
-- Table structure for t_menus
-- ----------------------------
DROP TABLE IF EXISTS `t_menus`;
CREATE TABLE `t_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menus
-- ----------------------------

-- ----------------------------
-- Table structure for t_teachers
-- ----------------------------
DROP TABLE IF EXISTS `t_teachers`;
CREATE TABLE `t_teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_name` varchar(255) NOT NULL,
  `teacher_avatar` varchar(255) NOT NULL,
  `teacher_intro` varchar(255) NOT NULL,
  `is_star` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_teachers
-- ----------------------------
