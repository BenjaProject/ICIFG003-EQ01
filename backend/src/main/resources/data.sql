BEGIN;

DELETE FROM atraso;
DELETE FROM inasistencia;
DELETE FROM estudiante;
DELETE FROM curso;

INSERT INTO curso (nombre_curso)
VALUES
  ('Curso 1A'),
  ('Curso 2A'),
  ('Curso 3A'),
  ('Curso 4A'),
  ('Curso 5A');

INSERT INTO estudiante (nombre1, nombre2, apellido1, apellido2, run, id_curso)
VALUES
  ('Pedro', '1', 'Perez', 'Lopez', '10000001-1', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Benjamin', '2', 'Gomez', 'Rios', '10000002-2', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Lester', '3', 'Diaz', 'Soto', '10000003-3', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Matias', '4', 'Vega', 'Lara', '10000004-4', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Benjamin', '5', 'Mora', 'Leon', '10000005-5', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Benjamin', '6', 'Ruiz', 'Nunez', '10000006-6', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Benjamin', '7', 'Castro', 'Paz', '10000007-7', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Franco', '8', 'Silva', 'Meza', '10000008-8', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Sebastian', '9', 'Torres', 'Vera', '10000009-9', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Mauricio', '10', 'Rojas', 'Figueroa', '10000010-0', (SELECT id FROM curso WHERE nombre_curso = 'Curso 1A')),
  ('Fernando', '11', 'Perez', 'Lopez', '10000011-1', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Irina', '12', 'Gomez', 'Rios', '10000012-2', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Camila', '13', 'Diaz', 'Soto', '10000013-3', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Antonia', '14', 'Vega', 'Lara', '10000014-4', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Pablo', '15', 'Mora', 'Leon', '10000015-5', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Silvia', '16', 'Ruiz', 'Nunez', '10000016-6', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Leonardo', '17', 'Castro', 'Paz', '10000017-7', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Aldo', '18', 'Silva', 'Meza', '10000018-8', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Ignacio', '19', 'Torres', 'Vera', '10000019-9', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Carlos', '20', 'Rojas', 'Figueroa', '10000020-0', (SELECT id FROM curso WHERE nombre_curso = 'Curso 2A')),
  ('Juana', '21', 'Perez', 'Lopez', '10000021-1', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Pedro', '22', 'Gomez', 'Rios', '10000022-2', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Hector', '23', 'Diaz', 'Soto', '10000023-3', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Tomas', '24', 'Vega', 'Lara', '10000024-4', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Camila', '25', 'Mora', 'Leon', '10000025-5', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Ramona', '26', 'Ruiz', 'Nunez', '10000026-6', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Sofia', '27', 'Castro', 'Paz', '10000027-7', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Hugo', '28', 'Silva', 'Meza', '10000028-8', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Marcela', '29', 'Torres', 'Vera', '10000029-9', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Juan Carlos', '30', 'Rojas', 'Figueroa', '10000030-0', (SELECT id FROM curso WHERE nombre_curso = 'Curso 3A')),
  ('Tiane', '31', 'Perez', 'Lopez', '10000031-1', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Claudio', '32', 'Gomez', 'Rios', '10000032-2', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Tilin', '33', 'Diaz', 'Soto', '10000033-3', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Patricio', '34', 'Vega', 'Lara', '10000034-4', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Gabriela', '35', 'Mora', 'Leon', '10000035-5', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Juan', '36', 'Ruiz', 'Nunez', '10000036-6', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Victoria', '37', 'Castro', 'Paz', '10000037-7', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Lourdes', '38', 'Silva', 'Meza', '10000038-8', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Lester', '39', 'Torres', 'Vera', '10000039-9', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Benjamin', '40', 'Rojas', 'Figueroa', '10000040-0', (SELECT id FROM curso WHERE nombre_curso = 'Curso 4A')),
  ('Francisca', '41', 'Perez', 'Lopez', '10000041-1', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Pepe', '42', 'Gomez', 'Rios', '10000042-2', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Javier', '43', 'Diaz', 'Soto', '10000043-3', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Oswaldo', '44', 'Vega', 'Lara', '10000044-4', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Victor', '45', 'Mora', 'Leon', '10000045-5', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Jazmin', '46', 'Ruiz', 'Nunez', '10000046-6', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Maria', '47', 'Castro', 'Paz', '10000047-7', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Lionel', '48', 'Silva', 'Meza', '10000048-8', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Karl', '49', 'Torres', 'Vera', '10000049-9', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A')),
  ('Adolf', '50', 'Rojas', 'Figueroa', '10000050-0', (SELECT id FROM curso WHERE nombre_curso = 'Curso 5A'));

INSERT INTO inasistencia (id_estudiante, fecha, justificada)
VALUES
  ((SELECT id FROM estudiante WHERE run = '10000001-1'), '2026-05-10', false),
  ((SELECT id FROM estudiante WHERE run = '10000002-2'), '2026-05-11', true),
  ((SELECT id FROM estudiante WHERE run = '10000011-1'), '2026-05-10', false),
  ((SELECT id FROM estudiante WHERE run = '10000012-2'), '2026-05-11', false),
  ((SELECT id FROM estudiante WHERE run = '10000021-1'), '2026-05-09', true),
  ((SELECT id FROM estudiante WHERE run = '10000022-2'), '2026-05-11', false),
  ((SELECT id FROM estudiante WHERE run = '10000031-1'), '2026-05-10', false),
  ((SELECT id FROM estudiante WHERE run = '10000032-2'), '2026-05-11', true),
  ((SELECT id FROM estudiante WHERE run = '10000041-1'), '2026-05-10', false),
  ((SELECT id FROM estudiante WHERE run = '10000042-2'), '2026-05-11', false);

INSERT INTO atraso (id_estudiante, fecha, hora, razon)
VALUES
  ((SELECT id FROM estudiante WHERE run = '10000003-3'), '2026-05-10', '08:05', 'Llego tarde'),
  ((SELECT id FROM estudiante WHERE run = '10000004-4'), '2026-05-11', '08:10', 'Bus retrasado'),
  ((SELECT id FROM estudiante WHERE run = '10000013-3'), '2026-05-09', '08:07', 'Transporte'),
  ((SELECT id FROM estudiante WHERE run = '10000014-4'), '2026-05-11', '08:12', 'Trafico'),
  ((SELECT id FROM estudiante WHERE run = '10000023-3'), '2026-05-10', '08:06', 'Lluvia'),
  ((SELECT id FROM estudiante WHERE run = '10000024-4'), '2026-05-11', '08:08', 'Demora'),
  ((SELECT id FROM estudiante WHERE run = '10000033-3'), '2026-05-10', '08:04', 'Transporte'),
  ((SELECT id FROM estudiante WHERE run = '10000034-4'), '2026-05-11', '08:09', 'Imprevisto'),
  ((SELECT id FROM estudiante WHERE run = '10000043-3'), '2026-05-10', '08:03', 'Salida tardia'),
  ((SELECT id FROM estudiante WHERE run = '10000044-4'), '2026-05-11', '08:11', 'Bus');

COMMIT;
