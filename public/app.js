// Função para carregar a lista de todos do servidor
function loadTodos() {
  axios.get('http://localhost:3000/api/todos')
    .then(response => {
      const todos = response.data; // Obtém os todos da API
      const todoList = document.getElementById('todo-list'); // Seleciona o elemento da lista
      todoList.innerHTML = ''; // Limpa a lista antes de renderizar os itens

      todos.forEach(todo => {
        const li = document.createElement('li'); // Cria um elemento de lista para cada todo
        li.style.display = 'flex'; // Define o layout flexível para alinhar itens horizontalmente
        li.style.justifyContent = 'space-between'; // Espaço entre o título e o botão
        li.style.alignItems = 'center'; // Alinha verticalmente os elementos

        // Cria um span para o título da tarefa
        const titleSpan = document.createElement('span');
        titleSpan.textContent = todo.title; // Define o título da tarefa

        // Cria um botão "Excluir"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir'; // Define o texto do botão
        deleteButton.className = 'delete-button'; // Adiciona uma classe CSS para estilizar
        deleteButton.onclick = () => deleteTodo(todo.id); // Passa o ID do todo para a função deleteTodo

        // Adiciona o título e o botão ao item da lista
        li.appendChild(titleSpan); // Adiciona o título ao item
        li.appendChild(deleteButton); // Adiciona o botão ao lado do título

        // Adiciona o item da lista ao elemento pai
        todoList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os todos:', error); // Loga qualquer erro no console
    });
}

// Função para adicionar um novo todo
function addTodo() {
  const input = document.getElementById('todo-input'); // Obtém o campo de entrada
  const title = input.value; // Obtém o valor digitado no campo
  if (title.trim()) { // Verifica se o título não está vazio
    axios.post('http://localhost:3000/api/todos', { title })
      .then(response => {
        loadTodos(); // Atualiza a lista após adicionar a tarefa
        input.value = ''; // Limpa o campo de entrada
      })
      .catch(error => {
        console.error('Erro ao adicionar o todo:', error); // Loga qualquer erro no console
      });
  }
}

// Função para deletar um todo
function deleteTodo(id) {
  axios.delete(`http://localhost:3000/api/todos/${id}`) // Faz a requisição DELETE para a API
    .then(response => {
      alert('Tarefa excluída com sucesso!'); // Alerta o usuário sobre a exclusão
      loadTodos(); // Atualiza a lista após excluir
    })
    .catch(error => {
      console.error('Erro ao excluir o todo:', error); // Loga qualquer erro no console
      alert('Não foi possível excluir a tarefa.'); // Alerta o usuário em caso de erro
    });
}

// Carrega os todos ao inicializar
loadTodos();
