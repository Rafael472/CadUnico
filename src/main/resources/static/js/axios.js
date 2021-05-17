const api = axios.create({
	baseURL: '/usuario',
	headers: {"Access-Control-Allow-Origin": "*"}
})

async function getAll() {
	// Inicia requisição AJAX com o axios
	await api.get('/listar')
	.then(response => {
		resultGetAll(response.data);
		//função resultGetAll deve ser iplementado na pagina recebendo parâmetro usuarios;
	})
	.catch(error => {
		console.log(error)
		$('#error').addClass('alert alert-danger');
		$('#error').html('Erro inesperado. ' + error);
	})
}

async function save(usuario) {
	await api.post('/cadastrar', usuario)
	.then(function (response) {
		$('[role="msgAdicionar"]').addClass('alert alert-success');
		$('[role="msgAdicionar"]').html('Usuário cadastrado com sucesso.');
    })
    .catch(function (err) {
		$('[role="msgAdicionar"]').addClass('alert alert-warning');
	    $('[role="msgAdicionar"]').html('Erro ao salvar usuário. \n' + err.message);
    });
}

async function deletar(id) {
	await api.delete('/excluir/' + id)
	.then(function (response) {
		getAll();
		$('#exclusaoModal').modal('hide');
		return true;
    })
    .catch(function (err) {
		$('[role="msgExcluir"]').addClass('alert alert-warning');
	    $('[role="msgExcluir"]').html('Erro ao excluir usuário. \n' + err.message);
	    return false;
    });
}