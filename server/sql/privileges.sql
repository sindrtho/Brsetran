REVOKE ALL PRIVILEGES ON brsetran.* FROM 'username'@'%';

GRANT INSERT, DELETE, UPDATE ON brsetran.oppdrag, brsetran.frakt, brsetran.utleie, brsetran.container_utleie TO 'username'@'%';
GRANT INSERT, DELETE, UPDATE ON brsetran.oppdrag, brsetran.frakt, brsetran.utleie, brsetran.container_utleie, brsetran.container, brsetran.sjafor, brsetran.kunde, brsetran.bil TO 'adminusername'@'%';

GRANT SELECT ON brsetran.oppdrag, brsetran.frakt, brsetran.utleie, brsetran.container_utleie, brsetran.container, brsetran.sjafor, brsetran.kunde, brsetran.bil TO 'username'@'%';
GRANT SELECT ON brsetran.admin TO 'adminusername'@'%';