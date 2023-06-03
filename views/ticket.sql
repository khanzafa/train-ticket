-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 03 Jun 2023 pada 16.00
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Bookings`
--

CREATE TABLE `Bookings` (
  `booking_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `passenger_id` int(11) NOT NULL,
  `payment_status` enum('PAID','PENDING') NOT NULL,
  `user_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Bookings`
--

INSERT INTO `Bookings` (`booking_id`, `ticket_id`, `passenger_id`, `payment_status`, `user_id`) VALUES
(453, 1515, 28, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(454, 1521, 28, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(455, 1515, 65, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(456, 1521, 65, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(457, 1515, 94, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(458, 1521, 94, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(459, 1515, 90, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8'),
(460, 1521, 90, 'PAID', 'c0b4cd07-9844-4349-8ad8-177c6beb40a8');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Passengers`
--

CREATE TABLE `Passengers` (
  `passenger_id` int(11) NOT NULL,
  `type_id` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Passengers`
--

INSERT INTO `Passengers` (`passenger_id`, `type_id`, `fullname`, `title`, `phone_number`, `email`) VALUES
(1, 'Amet reprehenderit ', 'Perry Berry', 'Error enim accusanti', '+1 (122) 775-2366', 'vipaqyhyzi@mailinator.com'),
(6, 'Similique dolor quis', 'Lars Hale', 'Voluptas amet non l', '+1 (938) 903-8805', 'heqotodipy@mailinator.com'),
(8, 'Nam voluptatibus cum', 'Sopoline Lambert', 'Dolore consequatur d', '+1 (931) 218-5624', 'julidaba@mailinator.com'),
(9, 'Aperiam eos rerum e', 'Hakeem Estrada', 'Sapiente a architect', '+1 (342) 992-4234', 'suzyx@mailinator.com'),
(20, 'Debitis et atque eiu', 'Caesar Barlow', 'Illum quod natus Na', '+1 (603) 118-8286', 'legu@mailinator.com'),
(24, 'Est elit corrupti', 'Noel Parrish', 'Accusantium ad itaqu', '+1 (686) 533-9963', 'pekokat@mailinator.com'),
(26, 'Voluptas esse conseq', 'Chaim Gamble', 'Nemo quibusdam volup', '+1 (628) 536-5697', 'joqymapi@mailinator.com'),
(28, 'Aut accusamus est in', 'Ashton Hall', 'Sit sed voluptatem', '+1 (846) 644-2628', 'pati@mailinator.com'),
(29, 'Neque voluptate sapi', 'Ori Adkins', 'Dolor numquam repreh', '+1 (926) 863-3185', 'kikapo@mailinator.com'),
(32, 'Laboris ex officiis ', 'Willow Williams', 'Exercitationem aut i', '+1 (977) 781-9178', 'nutimof@mailinator.com'),
(34, 'Consequatur ut sit ', 'Keegan Stephens', 'Quaerat maiores inci', '+1 (908) 157-5877', 'fejojiriv@mailinator.com'),
(39, 'Sed velit omnis tene', 'Deirdre Vincent', 'Omnis rerum possimus', '+1 (747) 633-8917', 'jucuc@mailinator.com'),
(43, 'Ab esse est excepte', 'Maxwell Gill', 'Illum ex quam eos ', '+1 (109) 292-4216', 'nytemewor@mailinator.com'),
(53, 'Dignissimos ullam se', 'Nora Sharpe', 'Consequuntur sunt q', '+1 (194) 438-7359', 'tajupobige@mailinator.com'),
(55, 'Aliquam sit sunt it', 'Ezekiel Morris', 'Dolores nemo quia qu', '+1 (469) 527-9408', 'cytapen@mailinator.com'),
(57, 'Eum neque dolores ve', 'Maxine Bell', 'Repudiandae inventor', '+1 (451) 718-4292', 'romufysymi@mailinator.com'),
(59, 'Sint fugiat debiti', 'Troy Joyner', 'Quia et consequatur', '+1 (231) 847-1678', 'covij@mailinator.com'),
(61, 'Adipisicing quod cum', 'Vladimir Stafford', 'Rerum sint adipisci ', '+1 (736) 788-9478', 'qimypofixa@mailinator.com'),
(65, 'Ullam aliquid omnis ', 'Keaton Dunn', 'Deserunt culpa bland', '+1 (302) 238-6413', 'kotyhim@mailinator.com'),
(70, 'Alias et eveniet es', 'Kylynn Bradley', 'Do laboriosam saepe', '+1 (769) 415-9119', 'fymequtyt@mailinator.com'),
(71, 'Nesciunt esse earum', 'Graiden Fry', 'Hic omnis ab praesen', '+1 (967) 336-4711', 'jucadypeko@mailinator.com'),
(74, 'Officiis quibusdam d', 'Destiny Morse', 'Consectetur perfere', '+1 (948) 534-4699', 'kasoloxi@mailinator.com'),
(75, 'Et eveniet occaecat', 'Ila Daugherty', 'Ut elit debitis nis', '+1 (447) 866-5994', 'coxafukyf@mailinator.com'),
(81, 'Est consequatur pro', 'Rae Fischer', 'Quo harum ea et veli', '+1 (511) 256-1352', 'tejarizofa@mailinator.com'),
(82, 'Dolor non explicabo', 'Haviva Kane', 'Optio aut minima do', '+1 (958) 711-5989', 'jitic@mailinator.com'),
(90, 'Cumque voluptas accu', 'Merritt Price', 'Aut porro Nam neque ', '+1 (834) 288-7721', 'venu@mailinator.com'),
(92, 'Ea corrupti reprehe', 'Nelle Stuart', 'Exercitation nemo et', '+1 (596) 939-8354', 'caqyha@mailinator.com'),
(93, 'Eiusmod molestiae ve', 'Courtney Love', 'Earum omnis ipsam ad', '+1 (348) 129-3451', 'jutyrariqo@mailinator.com'),
(94, 'Id natus itaque ita', 'Hilary Sanders', 'Sunt qui nihil dolor', '+1 (277) 193-7627', 'byge@mailinator.com'),
(95, 'Asperiores assumenda', 'Judith Travis', 'Voluptates quos nihi', '+1 (172) 821-3982', 'qoqisuzico@mailinator.com'),
(97, 'Assumenda molestiae ', 'Quemby Rush', 'Et delectus ea culp', '+1 (899) 329-2936', 'zohuc@mailinator.com'),
(98, 'Ex nemo velit eaque ', 'Francesca Salas', 'Error laboris offici', '+1 (382) 102-5858', 'caqefi@mailinator.com'),
(100, 'Sed qui qui culpa d', 'Sophia Brennan', 'Voluptatem rerum so', '+1 (518) 248-6482', 'resinikale@mailinator.com'),
(109, 'Velit magnam est N', 'Lane Boone', 'Illo commodo veritat', '+1 (575) 622-7368', 'rolufaq@mailinator.com'),
(37976, 'Quis quia voluptas c', 'Gareth Munoz', 'Fugit non quia at q', '+1 (121) 925-5229', 'momihuzen@mailinator.com'),
(46451, 'Fugiat dolor iure n', 'Kylee Stevenson', 'Nulla minus anim vel', '+1 (206) 199-3959', 'nyhezupipu@mailinator.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Stations`
--

CREATE TABLE `Stations` (
  `station_name` varchar(255) NOT NULL,
  `district_city` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Stations`
--

INSERT INTO `Stations` (`station_name`, `district_city`) VALUES
('Stasiun A', 'X'),
('Stasiun B', 'Y'),
('Stasiun C', 'Z'),
('Stasiun D', 'X'),
('Stasiun E', 'X'),
('Stasiun F', 'Y'),
('Stasiun G', 'X'),
('Stasiun H', 'Z'),
('Stasiun I', 'Y'),
('Stasiun J', 'Z');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Tickets`
--

CREATE TABLE `Tickets` (
  `ticket_id` int(11) NOT NULL,
  `train_name` varchar(255) NOT NULL,
  `departure_station` varchar(255) NOT NULL,
  `arrival_station` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `departure_date` date DEFAULT NULL,
  `departure_time` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `arrival_time` varchar(255) NOT NULL,
  `arrival_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Tickets`
--

INSERT INTO `Tickets` (`ticket_id`, `train_name`, `departure_station`, `arrival_station`, `price`, `status`, `quantity`, `departure_date`, `departure_time`, `duration`, `arrival_time`, `arrival_date`) VALUES
(1511, 'Kereta AA', 'Stasiun A', 'Stasiun B', 100.00, 'AVAILABLE', 50, '2023-06-06', '09.00', '3 jam 20 Menit', '12.20', '2023-06-06'),
(1512, 'Kereta AB', 'Stasiun A', 'Stasiun C', 150.00, 'AVAILABLE', 26, '2023-06-06', '12.00', '4 jam 10 Menit', '16.10', '2023-06-06'),
(1513, 'Kereta AC', 'Stasiun B', 'Stasiun C', 120.00, 'SOLD_OUT', 0, '2023-06-06', '14.00', '5 jam 00 Menit', '19.00', '2023-06-06'),
(1514, 'Kereta AD', 'Stasiun D', 'Stasiun A', 80.00, 'SOLD_OUT', 0, '2023-06-06', '19.00', '6 Jam 50 Menit', '01.50', '2023-06-07'),
(1515, 'Kereta AE', 'Stasiun B', 'Stasiun C', 200.00, 'AVAILABLE', 54, '2023-06-06', '04.00', '3 Jam 20 Menit', '07.20', '2023-06-06'),
(1516, 'Kereta AF', 'Stasiun C', 'Stasiun D', 90.00, 'AVAILABLE', 12, '2023-06-07', '10:30', '2 jam 40 Menit', '13:10', '2023-06-07'),
(1517, 'Kereta AG', 'Stasiun B', 'Stasiun D', 120.00, 'AVAILABLE', 30, '2023-06-07', '14:45', '4 jam 20 Menit', '19:05', '2023-06-07'),
(1518, 'Kereta AH', 'Stasiun A', 'Stasiun C', 80.00, 'SOLD_OUT', 0, '2023-06-07', '16:20', '3 jam 15 Menit', '19:35', '2023-06-07'),
(1519, 'Kereta AI', 'Stasiun D', 'Stasiun B', 110.00, 'AVAILABLE', 18, '2023-06-07', '21:00', '4 Jam 45 Menit', '01:45', '2023-06-08'),
(1520, 'Kereta AJ', 'Stasiun C', 'Stasiun A', 130.00, 'AVAILABLE', 40, '2023-06-07', '06:15', '6 Jam 30 Menit', '12:45', '2023-06-07'),
(1521, 'Kereta CA', 'Stasiun C', 'Stasiun B', 110.00, 'AVAILABLE', 40, '2023-06-09', '09.00', '2 jam 30 Menit', '11.30', '2023-06-09'),
(1522, 'Kereta CB', 'Stasiun C', 'Stasiun B', 130.00, 'AVAILABLE', 30, '2023-06-09', '12.00', '3 jam 10 Menit', '15.10', '2023-06-09'),
(1523, 'Kereta CC', 'Stasiun C', 'Stasiun B', 90.00, 'SOLD_OUT', 0, '2023-06-09', '15.30', '2 jam 40 Menit', '18.10', '2023-06-09'),
(1524, 'Kereta CD', 'Stasiun C', 'Stasiun B', 120.00, 'SOLD_OUT', 0, '2023-06-09', '19.00', '2 Jam 20 Menit', '21.20', '2023-06-09'),
(1525, 'Kereta CE', 'Stasiun C', 'Stasiun B', 150.00, 'AVAILABLE', 50, '2023-06-10', '07.00', '3 Jam 30 Menit', '10.30', '2023-06-10');

--
-- Trigger `Tickets`
--
DELIMITER $$
CREATE TRIGGER `update_ticket_status` BEFORE UPDATE ON `Tickets` FOR EACH ROW BEGIN
    IF NEW.quantity = 0 THEN
        SET NEW.status = 'SOLD_OUT';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Trains`
--

CREATE TABLE `Trains` (
  `train_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `class` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Trains`
--

INSERT INTO `Trains` (`train_name`, `capacity`, `class`) VALUES
('Kereta AA', 100, 'Business'),
('Kereta AB', 150, 'Economy'),
('Kereta AC', 120, 'Business'),
('Kereta AD', 200, 'Economy'),
('Kereta AE', 80, 'Executive'),
('Kereta AF', 180, 'Business'),
('Kereta AG', 120, 'Economy'),
('Kereta AH', 90, 'Executive'),
('Kereta AI', 150, 'Economy'),
('Kereta AJ', 200, 'Business'),
('Kereta CA', 100, 'Business'),
('Kereta CB', 150, 'Economy'),
('Kereta CC', 120, 'Business'),
('Kereta CD', 200, 'Economy'),
('Kereta CE', 80, 'Executive');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Users`
--

CREATE TABLE `Users` (
  `user_id` char(36) NOT NULL,
  `resident_id` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Users`
--

INSERT INTO `Users` (`user_id`, `resident_id`, `name`, `email`, `password`, `phone`) VALUES
('4276bbb2-8754-42b1-8a8d-efa43a2e830d', '3521091103030002', 'Khanza Fadila Azhara', 'khanzafadilaazz@gmail.com', '$2b$10$b/fXJpmNy03yzE8TAAdKHuS0ojFAzJ/Y4yBLRTHhyF7js6UW3FK1S', '085784714405'),
('c0b4cd07-9844-4349-8ad8-177c6beb40a8', '11111111111111', 'Fauziyyah', 'jiaa@gmail.com', '$2b$10$oTq.AJsKwVLGnPC0DWJS1eQW2y0JYdx2tr9WcEeAwwXcwm9FsvgYu', '085123456789');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Bookings`
--
ALTER TABLE `Bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `Bookings_ibfk_1` (`ticket_id`),
  ADD KEY `Bookings_ibfk_2` (`passenger_id`),
  ADD KEY `Bookings_ibfk_3` (`user_id`);

--
-- Indeks untuk tabel `Passengers`
--
ALTER TABLE `Passengers`
  ADD PRIMARY KEY (`passenger_id`);

--
-- Indeks untuk tabel `Stations`
--
ALTER TABLE `Stations`
  ADD PRIMARY KEY (`station_name`);

--
-- Indeks untuk tabel `Tickets`
--
ALTER TABLE `Tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `Tickets_ibfk_1` (`train_name`),
  ADD KEY `Tickets_ibfk_2` (`departure_station`),
  ADD KEY `Tickets_ibfk_3` (`arrival_station`);

--
-- Indeks untuk tabel `Trains`
--
ALTER TABLE `Trains`
  ADD PRIMARY KEY (`train_name`);

--
-- Indeks untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Bookings`
--
ALTER TABLE `Bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=461;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `Tickets` (`ticket_id`),
  ADD CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`passenger_id`) REFERENCES `Passengers` (`passenger_id`),
  ADD CONSTRAINT `Bookings_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `Tickets`
--
ALTER TABLE `Tickets`
  ADD CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`train_name`) REFERENCES `Trains` (`train_name`),
  ADD CONSTRAINT `Tickets_ibfk_2` FOREIGN KEY (`departure_station`) REFERENCES `Stations` (`station_name`),
  ADD CONSTRAINT `Tickets_ibfk_3` FOREIGN KEY (`arrival_station`) REFERENCES `Stations` (`station_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
