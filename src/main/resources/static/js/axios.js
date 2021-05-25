//parâmetros de conexão com o controller
const api = axios.create({
	baseURL: '/usuario',
	headers: {"Access-Control-Allow-Origin": "*"}
})

//*********************************************************************************************************
//todas as requisições são retornadas para funções resultXXXX, as mesmas deve ser implementadas em página,
//a fim de garantir flexibilidade, podendo tratar o resultado da maneira que for necessário.
//*********************************************************************************************************

async function getAll() {
	await api.get('/listar')
	.then(response => {
		resultGetAll(response.data);
	})
	.catch(error => {
		let seletor = '#msgRetorno';
		let msgRetorno = 'Erro ao buscar todos usuários.';
		mensagemErro(error, seletor, msgRetorno);
	})
}

async function getUsuario(usuario_id) {
	await api.get('/' + usuario_id)
	.then(response => {
		resultGetUsuario(response.data);
	})
	.catch(error => {
		let seletor = '#error';
		let msgRetorno = 'Erro ao buscar usuário.';
		mensagemErro(error, seletor, msgRetorno);
	})
}

async function adicionar(usuario) {
	await api.post('/cadastrar', usuario)
	.then(function (response) {
		resultAdicionar(response);
    })
    .catch(function (error) {
	    let seletor = '[role="msgAdicionar"]';
		let msgRetorno = 'Erro ao adicionar usuário.';
		mensagemErro(error, seletor, msgRetorno);
    });
}

async function editar(usuario) {
	await api.put('/' + usuario.id, usuario)
	.then(function (response) {
		resultEditar(response);
    })
    .catch(function (error) {
		let seletor = '[role="msgAdicionar"]';
		let msgRetorno = 'Erro ao editar usuário.';
		mensagemErro(error, seletor, msgRetorno);
    });
}

async function deletar(id) {
	await api.delete('/excluir/' + id)
	.then(function (response) {
		resultDeletar(response);
    })
    .catch(function (error) {
		let seletor = '[role="msgExcluir"]';
		let msgRetorno = 'Erro ao excluir usuário.';
		mensagemErro(error, seletor, msgRetorno);
    });
}

function mensagemErro(error, seletor, msgRetorno){
	$(seletor).addClass('alert alert-warning');
	console.log(error.message);
	console.log("STATUS: " + error.response.status);
	
	if (error.response) {
		// A Solicitação foi feita, mas o servidor retornou erro
		if(seletor.length > 0)
			$(seletor).append(msgRetorno + "<br>");
			
		error.response.data.errors.map(function(erro){
		    $(seletor).append(erro.defaultMessage + "<br>");
			console.log(erro.defaultMessage);
		})
    } else if (error.request) {
		// A solicitação foi feita, mas nenhuma resposta foi recebida
		$(seletor).append(error.request);
		console.log(error.request);
    } else {
		// Algo aconteceu ao configurar a solicitação que acionou um erro
		$(seletor).addClass('alert alert-danger');
		$(seletor).append("Erro: " + error.message);
		console.log('Error', error.message);
    }
}