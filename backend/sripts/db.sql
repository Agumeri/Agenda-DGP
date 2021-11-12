CREATE DATABASE IF NOT EXISTS dgp;

USE dgp;
-----------------
-- Usuario table --
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
    ('pruebaAdmin','admin1234','0','pruebaAdmin@prueba'),
     ('prueba2', 'prueba2', '0','prueba2');
------------------
-- Profesor Table --
CREATE TABLE IF NOT EXISTS profesor(
    id_usuario INT NOT NULL,
    id_profesor VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id_usuario,id_profesor),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO profesor(id_usuario, id_profesor) VALUES 
    ('3', '1'),
    ('2', '2');
------------------------
-- Alumno_autoriza table
CREATE TABLE IF NOT EXISTS alumno_tutoriza( 
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
    id_alumno VARCHAR(100) NOT NULL,
    id_profesor VARCHAR(100) NOT NULL REFERENCES profesor(id_profesor),
    PRIMARY KEY (id_usuario, id_alumno)
); 

INSERT INTO alumno_tutoriza(id_usuario, id_alumno, id_profesor) VALUES 
    ('1', '1', '1'),
    ('2', '2', '2');

-- Tabla medio válida --
CREATE TABLE IF NOT EXISTS alumno_tutoriza( 
    id_usuario INT NOT NULL, 
    id_alumno INT NOT NULL, 
    id_profesor VARCHAR(100) NOT NULL, 
    CONSTRAINT FK_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT FK_id_profesor FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor)
);

INSERT INTO alumno_tutoriza (id, id_profesor) VALUES 
    ('1', '1'),
    ('2', '2');
--------------
--Admin Table --
CREATE TABLE IF NOT EXISTS admin(
    id_admin VARCHAR(100) NOT NULL,
    id_usuario_inAdmin INT NOT NULL,
    PRIMARY KEY (id_usuario_inAdmin, id_admin),
    FOREIGN KEY (id_usuario_inAdmin) REFERENCES usuario(id)
);
INSERT INTO admin (id_admin, id_usuario_inAdmin) VALUES ('admin01','2');
----------------
--inventario Table --
CREATE TABLE IF NOT EXISTS inventario(
    id_inventario varchar(100) NOT NULL PRIMARY KEY
);
INSERT INTO inventario(id_inventario) VALUES ('inventario1');
----------------------------
--gestiona_inventario Table --
CREATE TABLE IF NOT EXISTS gestiona_inventario(
    id_gestiona_inventario varchar(100) NOT NULL UNIQUE,
    id_tarea_inGestInv varchar(100) NOT NULL,
    id_comanda_inGestInv varchar(100) NOT NULL,
    id_inventario_inGestInv varchar(100) NOT NULL,
    PRIMARY KEY (id_gestiona_inventario, id_tarea_inGestInv, id_comanda_inGestInv, id_inventario_inGestInv),
    FOREIGN KEY (id_inventario_inGestInv) REFERENCES inventario(id_inventario)
);
INSERT INTO gestiona_inventario(id_gestiona_inventario, id_tarea_inGestInv, id_comanda_inGestInv, id_inventario_inGestInv) 
VALUES ('gestiona_desdeSQL', 'tarea1','comanda1','inventario1');
----------------
--objeto Table --
CREATE TABLE IF NOT EXISTS objetos(
    id_objeto varchar(100) NOT NULL,
    id_inventario_inObjeto varchar(100) NOT NULL,
    nombre_objeto VARCHAR(100),
    cantidad_objetos INT,
    categoria varchar(300),
    PRIMARY KEY (id_objeto, id_inventario_inObjeto),
    FOREIGN KEY (id_inventario_inObjeto) REFERENCES inventario(id_inventario)
);
INSERT INTO objetos(id_objeto, id_inventario_inObjeto, nombre_objeto, cantidad_objetos, categoria)
VALUES ('objeto1', 'inventario1', 'boligrafo', '32', 'escritura');


-- Objeto tarea --
CREATE TABLE IF NOT EXISTS tarea(
    id_tarea varchar(100) NOT NULL,
    id_alumno varchar(100) NOT NULL,
    tipo varchar(50) NOT NULL,
    tiempo_requerido time,
    fecha date NOT NULL,
    hora time,
    PRIMARY KEY (id_tarea,id_alumno),
    FOREIGN KEY (id_alumno) REFERENCES alumno_tutoriza(id_alumno)
)

CREATE TABLE IF NOT EXISTS tarea(
    id_tarea varchar(100) NOT NULL,
    id_alumno varchar(100) NOT NULL REFERENCES alumno_tutoriza(id_alumno),
    tipo varchar(50) NOT NULL,
    tiempo_requerido time,
    fecha date NOT NULL,
    hora time,
    PRIMARY KEY (id_tarea,id_alumno)
)