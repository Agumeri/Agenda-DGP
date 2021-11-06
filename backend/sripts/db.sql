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

CREATE TABLE IF NOT EXISTS profesor(
    id_usuario INT NOT NULL,
    id_profesor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_usuario,id_profesor),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);
CREATE TABLE IF NOT EXISTS alumno_tutoriza(
    id INT NOT NULL,
    id_alumno INT NOT NULL AUTO_INCREMENT,
    id_profesor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_alumno),
    FOREIGN KEY (id) REFERENCES usuario(id),
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor)
);

INSERT INTO alumno_tutoriza (id, id_profesor) VALUES 
    ('1', '1'),
     ('2', '2');