const api = axios.create({
	baseURL: '/usuario',
	headers: {"Access-Control-Allow-Origin": "*"}
})

async function getAll() {
	// Inicia requisição AJAX com o axios
	await api.get('/listar')
	.then(response => {
		resultGetAll(response.data);
	})
	.catch(error => {
		console.log(error)
		$('#error').addClass('alert alert-danger');
		$('#error').html('Erro inesperado. ' + error);
	})
}

async function getUsuario(usuario_id) {
	// Inicia requisição AJAX com o axios
	await api.get('/' + usuario_id)
	.then(response => {
		let usuario = response.data;
		$("#txtNome").val(usuario.nome);
		$("#txtEmail").val(usuario.email);
		$("#txtCPF").val(usuario.cpf);
		$("#txtSenha").val(usuario.senha);
		$("#ddlSituacao").val(usuario.situacao);
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
		limparCampos();
		getAll();
    })
    .catch(function (err) {
		$('[role="msgAdicionar"]').addClass('alert alert-warning');
	    $('[role="msgAdicionar"]').html('Erro ao salvar usuário. \n' + err.message);
    });
}

async function saveUser(usuario) {
	await api.put('/' + usuario.id, usuario)
	.then(function (response) {
		$('[role="msgAdicionar"]').addClass('alert alert-success');
		$('[role="msgAdicionar"]').html('Usuário editado com sucesso.');
		limparCampos();
		getAll();
    })
    .catch(function (err) {
		$('[role="msgAdicionar"]').addClass('alert alert-warning');
	    $('[role="msgAdicionar"]').html('Erro ao editar usuário. \n' + err.message);
		console.log(err.message);
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

