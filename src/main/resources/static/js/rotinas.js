function carregarTabela(){
	$('#tabela').DataTable();
}

$(function() {
	$('[rel="tooltip"]').tooltip();
});

$(function() {
	$('[data-toggle="modal"]').click(function() {
	  $('[role="alert"]').html('');
	  $('[role="alert"]').removeClass();
	});
});

function FormataStringData(data) {
	var dia  = data.split("-")[2];
	var mes  = data.split("-")[1];
	var ano  = data.split("-")[0];
	
	return dia + '/' + mes + '/' + ano;
}

function limparCampos(){
	$("#txtNome").val('');
	$("#txtEmail").val('');
	$("#txtCPF").val('');
	$("#txtSenha").val('');
	$("#ddlSituacao").val('ATIVO');
}

//modal excluir
$(function() {
	$('#exclusaoModal').on('show.bs.modal', function(event) {
		console.log('abriu modal');
		
		var button = $(event.relatedTarget);
		var descricaoUsuario = button.data('usuario');
		$('#codigoUsuarioExcluir').val(button.data('codigo'));
		
		var modal = $(this);
		modal.find('.body-modal').html('Tem certeza que deseja excluir o usuário <strong>' + descricaoUsuario + '</strong>?');
		
	});
	
	$('#btnExcluir').click(function() {
		console.log($('#codigoUsuarioExcluir').val());
		deletar($('#codigoUsuarioExcluir').val());			
	});
});