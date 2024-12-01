const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Conexão com o banco de dados
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',  
  port: 5432,
});

// Rota para pegar todos os todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar dados');
  }
});

// Rota para criar um novo todo
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar todo');
  }
});

// Rota para deletar um todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Todo não encontrado'); // Retorna erro 404 se o todo não existir
    }
    res.json({ message: 'Todo excluído com sucesso', todo: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir o todo');
  }
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
