use brtest;

DROP TABLE IF EXISTS oppdrag;
DROP TABLE IF EXISTS rute;	
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS bruker;

CREATE TABLE rute (
	rute_id INT PRIMARY KEY AUTO_INCREMENT,
	rute_navn VARCHAR(64) NOT NULL
);

CREATE TABLE oppdrag(
	oppdrag_id INT PRIMARY KEY AUTO_INCREMENT,
	tittel VARCHAR(64) NOT NULL,
	beskrivelse VARCHAR(512) NOT NULL,
	pris REAL,
	dato_mottatt DATE,
	rute_id INT NOT NULL,
	dato DATE,
	utfort BOOLEAN DEFAULT false,
	FOREIGN KEY (rute_id) REFERENCES rute(rute_id)
);

CREATE TABLE bruker(
	bruker_id INT PRIMARY KEY AUTO_INCREMENT,
	brukernavn VARCHAR(32) UNIQUE NOT NULL,
	passord VARCHAR(256) NOT NULL,
	fornavn VARCHAR(32),
	etternavn VARCHAR(32)
);

CREATE TABLE admin(
	bruker_id INT PRIMARY KEY,
	FOREIGN KEY (bruker_id) REFERENCES bruker(bruker_id)
);

CREATE TRIGGER datetrigger
BEFORE INSERT ON oppdrag
FOR EACH ROW
	SET NEW.dato_mottatt=date(now());

INSERT INTO rute (rute_navn) VALUES ('Oslo/Østlandet'), ('Ålesund/Vestnes/Molde'), ('Kristiansund/Smøla'), ('Kristiansund/Tustna/Aure'), ('Trondheim/Rindal/Surnadalen'), ('Containere'), ('Kranbil'), ('Søppelbil');

INSERT INTO oppdrag (tittel, beskrivelse, dato, rute_id) VALUES
	('Kirkemateriale', '2 paller med kors til Hopen kirke fra Oslo', DATE(now()), 1),
	('Planker', '3 paller med planker til Trondheim', DATE(now()), 5),
	('Gurispelet', 'Materialer til gurispelet', DATE(now()), 3),
	('Vindu', '25x vindu til Kristiansund', DATE(now()), 3),
	('Søppel', 'Søppel må vekk!', DATE(now()), 8),
	('Vindu', '3x vinduer til Trondheim', DATE(now()), 5),
	('Søppel', 'Søppel etter gudstjeneste må fjernes', DATE(now()), 8);

INSERT INTO oppdrag (tittel, beskrivelse, rute_id, dato, utfort) VALUES
	('Glassmalerier', 'Glassmalerier fra Ålesund', 2, DATE(now()), true),
	('Biler', '3 nye biler til kommunearbeidere fra Trondheim', 5, DATE(now()), true),
	('Treverk', 'Treverk til Molde', 2, DATE(now()), true);

INSERT INTO bruker (brukernavn, fornavn, etternavn, passord) VALUES ("sindrtho", "Sindre", "Thomassen", "$2b$10$pIka8NNW1fRI1Isl9BizxOxxaJxoSE8GESpr.QjXEGN36vzpd7crK");

INSERT INTO admin VALUES (1);