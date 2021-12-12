CREATE DATABASE IF NOT EXISTS dgp;

USE dgp;

-- Usuario table --

CREATE TABLE IF NOT EXISTS usuario(
    id INT NOT NULL AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    contraseña CHAR(60) NOT NULL,
    permisos INT NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    imagen VARCHAR(100),
    PRIMARY KEY (id)
);
INSERT INTO usuario (nombre_usuario, contraseña, permisos, correo_electronico, imagen) VALUES 
    ('prueba_admin', 'prueba_admin', '0','admin@gmail.com', 'default.jpg'),
    ('prueba_prof','prueba_prof','1','prof@gmail.com', 'juanjavier.png'),
    ('prueba_alumno', 'prueba_alumno', '2','alumno@gmail.com','maripili.png');


-- Profesor Table --

CREATE TABLE IF NOT EXISTS profesor(
    id_usuario INT NOT NULL,
    id_profesor VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id_usuario,id_profesor),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO profesor(id_usuario, id_profesor) VALUES 
    ('2', '1');

-- Alumno_autoriza table --

CREATE TABLE IF NOT EXISTS alumno_tutoriza( 
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
    id_alumno VARCHAR(100) NOT NULL,
    id_profesor VARCHAR(100) NOT NULL REFERENCES profesor(id_profesor),
    PRIMARY KEY (id_usuario, id_alumno)
); 

INSERT INTO alumno_tutoriza (id_usuario, id_alumno, id_profesor) VALUES 
    ('3', '1', '1');

-- Admin Table --

CREATE TABLE IF NOT EXISTS administrador(
    id_admin VARCHAR(100) NOT NULL,
    id_usuario_inAdmin INT NOT NULL,
    PRIMARY KEY (id_usuario_inAdmin, id_admin),
    FOREIGN KEY (id_usuario_inAdmin) REFERENCES usuario(id)
);
INSERT INTO administrador(id_admin, id_usuario_inAdmin) VALUES ('admin01','1');


-- Objeto tarea --
-- tipo 1: tarea fija
-- tipo 2: recuento de menu (ventana clases)
-- tipo 3: recuento de inventario (ventana inventario)
-- estado FALSE: no hecho 
-- estado TRUE: hecho

CREATE TABLE IF NOT EXISTS tarea(
    id_tarea varchar(100) NOT NULL,
    id_alumno varchar(100) REFERENCES alumno_tutoriza(id_alumno),
    id_tarea_multimedia varchar(100) REFERENCES multimedia(id_tarea),
    nombre varchar(100),
    tipo INT NOT NULL,
    tiempo_requerido time,
    fecha date NULL,
    hora time,
    estado BOOLEAN,
    PRIMARY KEY (id_tarea)
);

INSERT INTO tarea(id_tarea,id_alumno, id_tarea_multimedia, nombre,  tipo, tiempo_requerido, fecha, hora, estado)
VALUES ('task_1','1','task_1','poner microondas', '1','02:02:02','2002-02-02', '02:02:02', '0');


INSERT INTO tarea(id_tarea,id_alumno,  nombre, tipo, estado)
VALUES ('task_2','1','recuento de menús por clase', '2','0');

INSERT INTO tarea(id_tarea,id_alumno,  nombre, tipo,  estado)
VALUES ('task_3','1','recuento de inventario', '3','0');


CREATE TABLE IF NOT EXISTS multimedia(
    paso INT,
    id_tarea VARCHAR(100),
    url_foto LONGTEXT,
    descripcion VARCHAR(100),
    PRIMARY KEY (paso,id_tarea)
);

-- Pegar desde php my admin --

INSERT INTO multimedia( paso, id_tarea, url_foto, descripcion)
VALUES ('1','task_1','ir.png','ir a la cocina');

INSERT INTO multimedia(paso, id_tarea, url_foto, descripcion)
VALUES ('2','task_1','lavar.png','lavarse las manos');

INSERT INTO multimedia(paso, id_tarea, url_foto, descripcion)
VALUES ('3','task_1','coger.png','Coger el plato con comida');

INSERT INTO multimedia(paso, id_tarea, url_foto, descripcion)
VALUES ('4','task_1','microondas.png','Ponerlo dentro del microondas');

INSERT INTO multimedia(paso, id_tarea, url_foto, descripcion)
VALUES ('5','task_1','llevar.png','Sacarlo y llevarselo a la mesa');

-- autorizacion Table --

CREATE TABLE IF NOT EXISTS autorizacion(
    id_usuario INT NOT NULL REFERENCES alumno_tutoriza(id_usuario),
    id_alumno VARCHAR(100) NOT NULL REFERENCES alumno_tutoriza(id_alumno),
    id_autorizacion VARCHAR(100) NOT NULL,
    titulo VARCHAR(50),
    fecha date NOT NULL,
    hora time,
    PRIMARY KEY (id_usuario, id_alumno, id_autorizacion)
);

INSERT INTO autorizacion(id_usuario, id_alumno, id_autorizacion, titulo, fecha, hora)
VALUES ('2', '2', '1', 'titulo1', '2002-02-02','02:02:02');

CREATE TABLE IF NOT EXISTS realiza(
    id_usuario INT NOT NULL REFERENCES alumno_tutoriza(id_usuario),
    id_alumno VARCHAR(100) NOT NULL REFERENCES alumno_tutoriza(id_alumno),
    id_tarea VARCHAR(100) NOT NULL REFERENCES tarea(id_tarea),
    fecha_completada date,
    completada BOOLEAN,
    PRIMARY KEY (id_usuario, id_alumno, id_tarea)
);

INSERT INTO realiza(id_usuario, id_alumno, id_tarea, completada)
VALUES ('2', '2', '2', '0');

-- Inventario --

CREATE TABLE IF NOT EXISTS inventario(
    id_objeto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT DEFAULT 0,
    imagen VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_objeto)
);

INSERT INTO inventario(nombre, imagen)
VALUES ('Cartulina', 'cartulina.png'),
('Lapiz', 'lapiz.png'),
('Pegamento', 'pegamento.png');

-- clase --

CREATE TABLE IF NOT EXISTS clase(
    id_clase INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_clase)
);

INSERT INTO clase(nombre,imagen)
VALUES ('Clase Señorita Trini', 'trini.png'), ('Clase Señorita Mayte','mayte.png');

-- menu --

CREATE TABLE IF NOT EXISTS menus(
    id_menu INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_menu)
);

INSERT INTO menus(nombre, imagen)
VALUES ('Menú bajo en colesterol', 'colesterol.png'),
('Menú basal', 'basal.png'),
('Menú diabético', 'diabetes.png'),
('Menú régimen', 'regimen.png'),
('Menú sin carne', 'nocarne.png'),
('Menú sin cerdo', 'nocerdo.png'),
('Menú triturado sin proteína de leche de vaca', 'triturado.png');


-- Menu por clases --

CREATE TABLE IF NOT EXISTS menus_clase(
    id_clase INT NOT NULL REFERENCES clase(id_clase),
    id_menu INT NOT NULL REFERENCES menus(id_menu),
    cantidad INT DEFAULT 0,
    PRIMARY KEY (id_menu,id_clase)
);

INSERT INTO menus_clase(id_clase, id_menu)
VALUES 
('1','1'),
('1','2'),
('1','3'),
('1','4'),
('1','5'),
('1','6'),
('1','7'),
('2','1'),
('2','2'),
('2','3'),
('2','4'),
('2','5'),
('2','6'),
('2','7');

