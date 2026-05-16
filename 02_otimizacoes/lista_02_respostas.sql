-- 1
SELECT * FROM aluno;

-- 2
SELECT nome, curso FROM aluno;

-- 3
SELECT nome FROM aluno WHERE curso='Computacao'

-- 4
SELECT nome FROM aluno WHERE cidade='Maringa'

-- 5
SELECT nome FROM aluno ORDER BY nome ASC;

-- 6
SELECT nome, ano_ingresso FROM aluno ORDER BY ano_ingresso DESC;

-- 7
SELECT nome, ano_ingresso FROM aluno WHERE ano_ingresso >= 2022;

-- 8
SELECT nome FROM aluno WHERE nome LIKE 'A%';

-- 9
SELECT nome FROM aluno WHERE curso='Computacao' or curso='Engenharia';

-- 10
SELECT nome FROM disciplina WHERE carga_horaria BETWEEN 60 AND 80;

-- 11
SELECT COUNT(*) AS n_alunos FROM aluno;

-- 12
SELECT AVG(nota) as media_notas FROM matricula;

-- 13
SELECT * FROM matricula ORDER BY nota DESC LIMIT 1;

-- 14
SELECT * FROM matricula ORDER BY nota LIMIT 1;

-- 15
SELECT SUM(carga_horaria) as soma_carga_horaria FROM disciplina;

-- 16
SELECT curso, COUNT(*) AS alunos_por_curso FROM aluno GROUP BY curso;

-- 17
SELECT cidade, COUNT(*) AS alunos_por_cidade FROM aluno GROUP BY cidade;

-- 18
SELECT situacao, AVG(nota) as media_das_notas FROM matricula GROUP BY situacao;

-- 19
SELECT semestre, COUNT(*) AS n_matriculas FROM matricula GROUP BY semestre;

-- 20
SELECT curso FROM aluno GROUP BY curso HAVING COUNT(*) > 1;

-- 21
SELECT nome, situacao FROM aluno 
JOIN matricula ON aluno.id = matricula.aluno_id;

-- 22
SELECT aluno.nome, disciplina.nome FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
JOIN disciplina ON disciplina.id = matricula.disciplina_id;

-- 23
SELECT aluno.nome, disciplina.nome, matricula.nota FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
JOIN disciplina ON disciplina.id = matricula.disciplina_id;

-- 24
SELECT aluno.nome, disciplina.nome, departamento FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
JOIN disciplina ON disciplina.id = matricula.disciplina_id
WHERE departamento='Computacao';

-- 25
SELECT nome, situacao FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
WHERE situacao = 'Reprovado' GROUP BY nome;

-- 26
SELECT aluno.nome, disciplina.nome, curso FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
JOIN disciplina ON disciplina.id = matricula.disciplina_id
WHERE aluno.curso='Computacao';

-- 27 
SELECT nome, AVG(nota) as media_notas FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
GROUP BY nome;

-- 28
SELECT aluno.nome, COUNT(disciplina.nome) as n_disciplinas FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
JOIN disciplina ON disciplina.id = matricula.disciplina_id
GROUP BY aluno.nome;

-- 29
SELECT nome, AVG(nota) as media_notas FROM aluno
JOIN matricula ON aluno.id = matricula.aluno_id
GROUP BY nome HAVING AVG(nota) > 8;

-- 30
SELECT departamento, COUNT(disciplina_id) as matriculas FROM disciplina
JOIN matricula ON disciplina.id = matricula.disciplina_id
GROUP BY departamento;
