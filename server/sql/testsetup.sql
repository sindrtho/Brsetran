use brtest;

DROP TABLE IF EXISTS fraktfaktor;
DROP TABLE IF EXISTS container_utleie;
DROP TABLE IF EXISTS container;
DROP TABLE IF EXISTS utleie;
DROP TABLE IF EXISTS frakt;
DROP TABLE IF EXISTS oppdrag;
DROP TABLE IF EXISTS kunde;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS sjafor;

CREATE TABLE sjafor(
	sjafor_id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(64),
	salt VARCHAR(128) UNIQUE NOT NULL,
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	tlf VARCHAR(20)
);

CREATE TABLE admin(
	admin_id INT,
	FOREIGN KEY (admin_id) REFERENCES sjafor(sjafor_id),
	PRIMARY KEY (admin_id)
);

CREATE TABLE kunde(
	kunde_id INT PRIMARY KEY AUTO_INCREMENT,
	navn VARCHAR(64) UNIQUE NOT NULL,
	telefon VARCHAR(12),
	email VARCHAR(128),
	adresse VARCHAR(128),
	postnummer VARCHAR(4),
	kommune VARCHAR(64)
);

CREATE TABLE oppdrag(
	oppdrag_id INT PRIMARY KEY AUTO_INCREMENT,
	beskrivelse VARCHAR(128) NOT NULL,
	pris REAL,
	dato_mottatt DATE,
	kunde_id INT,
	
	privat_kunde_navn VARCHAR(64),
	privat_kunde_addresse VARCHAR(128),

	sjafor_id INT,
	utfort BOOLEAN DEFAULT false,
	FOREIGN KEY (kunde_id) REFERENCES kunde(kunde_id),
	FOREIGN KEY (sjafor_id) REFERENCES sjafor(sjafor_id)
);

CREATE TABLE frakt(
	oppdrag_id INT,
	fraktfaktor REAL DEFAULT 1.0,
	fra VARCHAR(64) NOT NULL,
	til VARCHAR(64) NOT NULL,
	last VARCHAR(64) NOT NULL,
	dato DATE,
	FOREIGN KEY (oppdrag_id) REFERENCES oppdrag(oppdrag_id)
);

CREATE TABLE utleie(
	oppdrag_id INT,
	dato_planlagt DATE,
	dato_for_innhenting DATE,
	dato_utsatt DATE,
	dato_innhentet DATE,
	FOREIGN KEY (oppdrag_id) REFERENCES oppdrag(oppdrag_id)
);

CREATE TABLE container(
	container_id INT PRIMARY KEY
);

CREATE TABLE container_utleie(
	container_id INT,
	oppdrag_id INT,
	FOREIGN KEY (container_id) REFERENCES container(container_id),
	FOREIGN KEY (oppdrag_id) REFERENCES utleie(oppdrag_id),
	PRIMARY KEY (container_id, oppdrag_id)
);

CREATE TABLE fraktfaktor(
	fra VARCHAR(64) UNIQUE NOT NULL,
	smola INT NOT NULL,
	kristiansund INT NOT NULL,
	trondheim INT NOT NULL,
	bergen INT NOT NULL,
	kristiansand INT NOT NULL,
	oslo INT NOT NULL
);


INSERT INTO sjafor (username, password, salt, first_name, last_name, tlf) VALUES
	('a', 'b', 'c', 'd', 'e', '12345678'),
	('dsf', 'ergds', 'aewrfas', 'vdsbds', 'bhfs', '64973185'),
	('yrnf', 'xvzdrtr', 'sdht', 'waefdv', 'vrtsg', '12378954'),
	('asdjfgasu', 'awiygf', 'casid', 'zqfsgdf', 'bfsdfvs', '95175364'),
	('aufirrv', 'adiucgaui', 'acsuiui', 'csd', 'sgrg', '12398766');

INSERT INTO admin VALUES (2);

INSERT INTO kunde (navn, telefon, email, adresse, postnummer, kommune) VALUES
	('sdfasdd', 'assdf', 'sdfasfd', 'dsfasdasdg', '3124', 'dsaffaafsgsa'),
	('sdfasdf', 'assdf', 'sdfasfd', 'dsfasdasdg', '3124', 'dsaffaafsgsa'),
	('sdfasdg', 'assdf', 'sdfasfd', 'dsfasdasdg', '3124', 'dsaffaafsgsa'),
	('sdfasdh', 'assdf', 'sdfasfd', 'dsfasdasdg', '3124', 'dsaffaafsgsa'),
	('sdfasdj', 'assdf', 'sdfasfd', 'dsfasdasdg', '3124', 'dsaffaafsgsa');

INSERT INTO oppdrag (beskrivelse, dato_mottatt, kunde_id, sjafor_id) VALUES
	('a', now(), 3, 1),
	('sadfd', now(), 1, 3),
	('sdfaasiug', now(), 4, 1),
	('fsiu', now(), 2, 2),
	('sdfiausg', now(), 1, 5);

INSERT INTO oppdrag (beskrivelse, dato_mottatt, kunde_id, sjafor_id, utfort) VALUES
	('fsdhgf', now(), 3, 1, true),
	('dsgsdhs', now(), 5, 5, true),
	('sfasda', now(), 1, 1, true);

INSERT INTO utleie (oppdrag_id, dato_planlagt) VALUES
	(1, now()),
	(2, now()),
	(3, now()),
	(4, now()),
	(5, now()),
	(6, now()),
	(7, now()),
	(8, now());

INSERT INTO container VALUES
	(427),
	(553),
	(165),
	(853),
	(364),
	(555),
	(885),
	(221),
	(135),
	(543);

INSERT INTO container_utleie VALUES (553, 1), (221, 1), (135, 2), (555, 3), (885, 4), (427, 5), (427, 6), (555, 7), (853, 7), (364, 8);