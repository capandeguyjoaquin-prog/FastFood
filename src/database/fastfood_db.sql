CREATE DATABASE IF NOT EXISTS fastfood;
USE fastfood;

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(100) NOT NULL
);

CREATE TABLE empleados (
    id_empleado INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    cargo VARCHAR(30) NOT NULL,
    turno VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_articulo VARCHAR(100) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL,
    tipo_servicio VARCHAR(20) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    id_cliente INT NOT NULL,
    id_empleado INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

CREATE TABLE detalle_pedido (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

INSERT INTO clientes (nombre, apellido, telefono, direccion) VALUES
('Juan', 'Pérez', '1122334455', 'Calle 10 #123'),
('Maria', 'Gómez', '1133445566', 'Avenida 5 #456'),
('Lucas', 'Martinez', '1144556677', 'Calle 7 #890');

INSERT INTO empleados (nombre, cargo, turno) VALUES
('Ana', 'cajero', 'mañana'),
('Pedro', 'cocinero', 'tarde'),
('Sofia', 'repartidor', 'noche');

INSERT INTO productos (nombre_articulo, categoria, precio_unitario) VALUES
('Hamburguesa doble', 'comida', 320.00),
('Papas fritas', 'comida', 180.00),
('Gaseosa', 'bebida', 120.00),
('Flan', 'postre', 150.00);

INSERT INTO pedidos (fecha_hora, tipo_servicio, estado, id_cliente, id_empleado) VALUES
('2026-10-13 12:30:00', 'local', 'entregado', 1, 1),
('2026-10-13 18:15:00', 'delivery', 'en preparación', 2, 2),
('2026-10-13 21:00:00', 'llevar', 'pendiente', 3, 3);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, subtotal) VALUES
(1, 1, 2, 640.00),
(1, 3, 2, 240.00),
(2, 2, 1, 180.00),
(2, 4, 2, 300.00),
(3, 1, 1, 320.00);

SELECT * FROM productos WHERE precio_unitario > 150;
SELECT p.id_pedido, p.fecha_hora, p.estado, c.nombre, c.apellido
FROM pedidos p
INNER JOIN clientes c ON p.id_cliente = c.id_cliente
WHERE c.id_cliente = 2;

SELECT SUM(dp.cantidad * pr.precio_unitario) AS total_recaudado
FROM detalle_pedido dp
INNER JOIN productos pr ON dp.id_producto = pr.id_producto
INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
WHERE DATE(pe.fecha_hora) = CURDATE();
