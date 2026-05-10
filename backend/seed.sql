BEGIN;

-- Clear existing data to avoid duplicates
DELETE FROM atraso;
DELETE FROM inasistencia;
DELETE FROM estudiante;
DELETE FROM curso;

-- Cursos
INSERT INTO curso (nombre_curso)
VALUES
  ('Primero Medio A'),
  ('Segundo Medio A'),
  ('Tercero Medio B');

-- Estudiantes
INSERT INTO estudiante (nombre1, nombre2, apellido1, apellido2, run, id_curso)
VALUES
  ('Ana', 'Maria', 'Perez', 'Lopez', '11.111.111-1', (SELECT id FROM curso WHERE nombre_curso = 'Primero Medio A')),
  ('Luis', 'Andres', 'Gonzalez', 'Rojas', '22.222.222-2', (SELECT id FROM curso WHERE nombre_curso = 'Primero Medio A')),
  ('Camila', 'Sofia', 'Diaz', 'Munoz', '33.333.333-3', (SELECT id FROM curso WHERE nombre_curso = 'Segundo Medio A')),
  ('Javier', 'Ignacio', 'Silva', 'Torres', '44.444.444-4', (SELECT id FROM curso WHERE nombre_curso = 'Tercero Medio B'));

-- Inasistencias
INSERT INTO inasistencia (id_estudiante, fecha, justificada)
VALUES
  ((SELECT id FROM estudiante WHERE run = '11.111.111-1'), '2026-05-01', false),
  ((SELECT id FROM estudiante WHERE run = '22.222.222-2'), '2026-05-02', true),
  ((SELECT id FROM estudiante WHERE run = '33.333.333-3'), '2026-05-03', false);

-- Atrasos
INSERT INTO atraso (id_estudiante, fecha, hora, razon)
VALUES
  ((SELECT id FROM estudiante WHERE run = '11.111.111-1'), '2026-05-02', '08:10', 'Llegada tarde por trafico'),
  ((SELECT id FROM estudiante WHERE run = '33.333.333-3'), '2026-05-04', '08:05', 'Problemas de transporte'),
  ((SELECT id FROM estudiante WHERE run = '44.444.444-4'), '2026-05-05', '08:12', 'Retraso en casa');

COMMIT;
