function carregarTabela(){
	$('#tabela').DataTable({
        "ordering": [[ 1, "asc" ]]
    });
}

$(function() {
	$('[rel="tooltip"]').tooltip();
});

$(function() {
	$('[data-toggle="modal"]').click(function() {
	  $('[role="msgAdicionar"]').html('');
	  $('[role="msgAdicionar"]').removeClass();
	});
});

//Formata String de yyyy-mm-dd para dd/mm/yyyy
function FormataStringData(data) {
	var dia  = data.split("-")[2];
	var mes  = data.split("-")[1];
	var ano  = data.split("-")[0];
	
	return dia + '/' + mes + '/' + ano;
}

//limpa campos do modal Adicionar/Editar
function limparCampos(){
	$("#txtNome").val('');
	$("#txtEmail").val('');
	$("#txtCPF").val('');
	$("#txtSenha").val('');
	$("#ddlSituacao").val('ATIVO');
}


//carrega modal adicionar/editar
$(function() {
	$('#adicionarEditarModal').on('show.bs.modal', function(event) {
		$('[role="msgAdicionar"]').removeClass();
		$('[role="msgAdicionar"]').html('');
		$('#codigoUsuarioEditar').val('');
		$('#acao').val('');
		limparCampos();
		
		var button = $(event.relatedTarget);
		const acao = button.data('acao');
		
		if(acao == "EDITAR"){
			$("#adicionarEditarTitle").html('Editar Usuário');
			$("#btnGravar").html('Editar');
			$('#acao').val('EDITAR');
			$('#codigoUsuarioEditar').val(button.data('codigo'));
			
			let id = button.data('codigo');
			getUsuario(id);
		}else{
			$("#adicionarEditarTitle").html('Adicionar Usuário');
			$('#acao').val('ADICIONAR');
			$("#btnGravar").html('Adicionar');
		}	
	});
	
	$('#btnGravar').click(function() {
		//prepara campo para mensage de retorno
		$('[role="msgAdicionar"]').removeClass();
		$('[role="msgAdicionar"]').html('');
		$('#msgRetorno').removeClass();
		$('#msgRetorno').html('');
		
		let acao = $('#acao').val();
		let usuario = {
				"nome":  $("#txtNome").val(),
				"email": $("#txtEmail").val(),
				"cpf":   $("#txtCPF").val(),
				"senha": $("#txtSenha").val(),
				"situacao": $("#ddlSituacao").val()
		};
		if(acao == 'EDITAR'){
			usuario.id = $('#codigoUsuarioEditar').val();
			editar(usuario);
		}else{
			adicionar(usuario);	
		}
	});
});

//carrega modal excluir
$(function() {
	$('#exclusaoModal').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var descricaoUsuario = button.data('usuario');
		$('#codigoUsuarioExcluir').val(button.data('codigo'));
		$('#nomeUsuarioExcluir').val(descricaoUsuario);
		
		var modal = $(this);
		modal.find('.body-modal').html('Tem certeza que deseja excluir o usuário <strong>' + descricaoUsuario + '</strong>?');
		
	});
	
	$('#btnExcluir').click(function() {
		deletar($('#codigoUsuarioExcluir').val());
		
	});
});