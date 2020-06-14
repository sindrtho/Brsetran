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
	brukernavn VARCHAR(30) UNIQUE NOT NULL,
	passord VARCHAR(64),
	salt VARCHAR(128) UNIQUE NOT NULL,
	sjafor_fornavn VARCHAR(32) NOT NULL,
	sjafor_etternavn VARCHAR(32) NOT NULL,
	tlf VARCHAR(20)
);

CREATE TABLE admin(
	admin_id INT,
	FOREIGN KEY (admin_id) REFERENCES sjafor(sjafor_id),
	PRIMARY KEY (admin_id)
);

CREATE TABLE kunde(
	kunde_id INT PRIMARY KEY AUTO_INCREMENT,
	kunde_navn VARCHAR(64) UNIQUE NOT NULL,
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

INSERT INTO sjafor (brukernavn, passord, salt, sjafor_fornavn, sjafor_etternavn, tlf) VALUES
	('perols', 'qwerty', 'c', 'Per', 'Olsen', '12345678'),
	('geisæt', 'qwerty', 's', 'Geir', 'Sætran', '64973185'),
	('sintho', 'qwerty', 't', 'Sindre', 'Thomassen', '12378954'),
	('arnsæt', 'qwerty', 'd', 'Arnt', 'Sætran', '95175364'),
	('leihel', 'qwerty', 'i', 'Leif', 'Helge', '12398766');

INSERT INTO admin VALUES (2);

INSERT INTO kunde (kunde_navn, telefon, email, adresse, postnummer, kommune) VALUES
	('Trelastlageret', '90221784', 'tre@last.lageret', 'Smøla hopen', '3124', 'Smøla'),
	('Smøla Vindu', '90221784', 'smøla@vindu.no', 'Smølavindu', '3124', 'Smøla'),
	('Hopen Kirke', '90221784', 'kirke@hopen.smøla', 'Hopen', '3124', 'Smøla'),
	('Gurisentert', '90221784', 'guri@senteret.no', 'Edøy', '3124', 'Smøla'),
	('Smøla Kommune', '90221784', 'mail@smøla.kommune', 'Hopen', '3124', 'Smøla');

INSERT INTO oppdrag (beskrivelse, kunde_id, sjafor_id, fra, til) VALUES
	('Kjøre materialer for kirke ritualer', 3, 1, 'Fredrikstad', 'Smøla'),
	('3 paller med planker til Trondheim', 1, 3, 'Smøla', 'Trondheim'),
	('Materialer til gurispelet', 4, 1, 'Molde', 'Smøla'),
	('25x vindu til Edøya', 2, 2, 'Smøla', 'Smøla'),
	('Søppel må vekk!', 4, 1, 'Smøla', 'Ålesund'),
	('3x vinduer til Trondheim', 2, 2, 'Smøla', 'Trondheim'),
	('Søppel etter gudstjeneste må fjernes', 1, 5, 'Smøla', 'Ålesund');

INSERT INTO oppdrag (beskrivelse, kunde_id, sjafor_id, fra, til, utfort) VALUES
	('Glassmalerier', 3, 1, 'Oslo', 'Smøla', true),
	('3 nye biler til kommunearbeidere', 5, 5, 'Kristiansund', 'Smøla', true),
	('Treverk', 1, 1, 'Oslo', 'Bergen', true);

INSERT INTO oppdrag (beskrivelse, kunde_id, sjafor_id, fra, til, dato) VALUES
	('Kjøre materialer for kirke ritualer', 3, 1, 'Fredrikstad', 'Smøla', '2020-04-05');