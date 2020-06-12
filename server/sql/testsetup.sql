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
	sjafor_id INT,
	fra VARCHAR (64) NOT NULL,
	til VARCHAR(64) NOT NULL,
	prisfaktor REAL DEFAULT 1.0,
	dato DATE,
	utfort BOOLEAN DEFAULT false,
	FOREIGN KEY (kunde_id) REFERENCES kunde(kunde_id),
	FOREIGN KEY (sjafor_id) REFERENCES sjafor(sjafor_id)
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

CREATE TRIGGER datetrigger
BEFORE INSERT ON oppdrag
FOR EACH ROW
	SET NEW.dato_mottatt=date(now());

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

INSERT INTO oppdrag (beskrivelse, kunde_id, sjafor_id, fra, til) VALUES
	('a', 3, 1, 'sdfasfd', 'dsfasdasdg'),
	('sadfd', 1, 3, 'sdfasfd', 'dsfasdasdg'),
	('sdfaasiug', 4, 1, 'sdfasfd', 'dsfasdasdg'),
	('fsiu', 2, 2, 'sdfasfd', 'dsfasdasdg'),
	('sdfaasiug', 4, 1, 'sdfasfd', 'dsfasdasdg'),
	('fsiu', 2, 2, 'sdfasfd', 'dsfasdasdg'),
	('sdfiausg', 1, 5, 'sdfasfd', 'dsfasdasdg');

INSERT INTO oppdrag (beskrivelse, kunde_id, sjafor_id, fra, til, utfort) VALUES
	('fsdhgf', 3, 1, 'sdfasfd', 'dsfasdasdg', true),
	('dsgsdhs', 5, 5, 'sdfasfd', 'dsfasdasdg', true),
	('sfasda', 1, 1, 'sdfasfd', 'dsfasdasdg', true);