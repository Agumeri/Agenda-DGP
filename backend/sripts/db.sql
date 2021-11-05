CREATE DATABASE IF NOT EXISTS dgp;

USE dgp;

CREATE TABLE IF NOT EXISTS usuario(
    id INT NOT NULL AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    contraseña CHAR(60) NOT NULL,
    permisos INT NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO usuario (nombre_usuario, contraseña, permisos, correo_electronico) VALUES 
    ('prueba1', 'prueba1', '0','prueba1'),
     ('prueba2', 'prueba2', '0','prueba2');