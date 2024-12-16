-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 02:04 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `username`, `product_id`) VALUES
(1, 'Admin', 1),
(2, 'Admin', 2),
(3, 'Admin', 1),
(4, 'Admin', 1),
(5, 'User', 2),
(6, 'User', 2),
(7, 'User', 3),
(8, 'User', 2),
(9, 'Admin', 1),
(10, 'Admin', 1),
(11, 'Admin', 1),
(12, 'Admin', 1),
(13, 'user', 2),
(14, 'user', 2),
(15, 'Admin', 23),
(16, 'Admin', 6),
(17, 'Admin', 5),
(18, 'Admin', 23),
(19, 'Admin', 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`) VALUES
(1, 'Product A', '100.00'),
(2, 'Product B', '200.00'),
(3, 'Product C', '300.00'),
(4, 'Wireless Mouse', '19.99'),
(5, 'Mechanical Keyboard', '49.99'),
(6, 'Laptop Stand', '29.99'),
(7, 'USB-C Hub', '24.99'),
(8, 'Noise Cancelling Headphones', '199.99'),
(9, 'Webcam Full HD 1080p', '39.99'),
(10, 'External SSD 1TB', '89.99'),
(11, 'Smartphone Tripod', '14.99'),
(12, 'Gaming Monitor 27\"', '299.99'),
(13, 'Bluetooth Speaker', '34.99'),
(14, 'Power Bank 10000mAh', '19.99'),
(15, 'Ergonomic Office Chair', '199.99'),
(16, '4K Ultra HD TV 55\"', '599.99'),
(17, 'Fitness Tracker', '59.99'),
(18, 'Portable Projector', '149.99'),
(19, 'Wireless Earbuds', '69.99'),
(20, 'Smart Home Assistant', '49.99'),
(21, 'Action Camera 4K', '129.99'),
(22, 'Electric Kettle', '29.99'),
(23, 'Coffee Machine', '79.99');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Admin', '$2b$10$5reNCQ.y/3RoeqZO7dm45uvYW5jJdgIbEjepa01NIdnL9Ojji4F0i'),
(2, 'User', '$2b$10$twoVNq6FQGdVKYGQrV5Ni.JY6a3P0saz6uRzUi1XpHkpjjWkk302i');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
