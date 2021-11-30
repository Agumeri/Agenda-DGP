--- cosas de SQL que he ido cambiando porque no servían para lo que ibamos a hacer

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
-- objeto Table --
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
