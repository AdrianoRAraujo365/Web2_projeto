/**
 * Função para validar o formulário e enviar via Ajax
 */
function validarForm() {
    var val = document.getElementById("valido");
    
    try {
        // Validação do Nome
        var x = document.forms["meuForm"]["nome"].value;
        if (x == null || x == "") {
            throw "O Nome deve ser preenchido!";
        }

        // Validação do E-mail
        var y = document.forms["meuForm"]["email"].value;
        var atpos = y.indexOf("@");
        var dotpos = y.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= y.length) {
            throw "Digite um e-mail válido!";
        }

        // Se passar nas validações acima, executa o envio
        val.style.color = "#00FF00";
        val.innerHTML = "Validando dados... Enviando Bat-sinal!";
        
        enviarAjax(y); // Chama a função de envio passando o email

    } catch (err) {
        // Exibe erro na tela caso o try falhe
        val.style.color = "#FF0000";
        val.innerHTML = "Erro: " + err;
        return false;
    }
}

/**
 * Função isolada para o envio Ajax
 */
function enviarAjax(email) {
    var mensagem = $("#message").val();
    
    $.ajax({
        url: 'http://localhost:2000/email/' + email + "/" + encodeURIComponent(mensagem),
        type: "GET",
        crossDomain: true,
        dataType: 'text',
        success: function(responsedata) {
            alert("Sucesso: " + responsedata);
            document.getElementById("valido").innerHTML = "Mensagem enviada com sucesso!";
        },
        error: function() {
            alert("Erro: Não foi possível conectar ao servidor local.");
            document.getElementById("valido").innerHTML = "Falha na conexão com o servidor.";
            document.getElementById("valido").style.color = "#FF0000";
        }
    });
}