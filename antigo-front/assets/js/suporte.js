document.getElementById("formSuporte").addEventListener("submit", function(event) {
    const assunto = document.getElementById("assunto").value;
    const descricao = document.getElementById("descricao").value;
    const erroAssunto = document.getElementById("erroAssunto");
    const erroDescricao = document.getElementById("erroDescricao");

    let erroEncontrado = false; // Flag para verificar se houve erro

    // Verificar se o campo Assunto tem mais de 70 caracteres
    if (assunto.length > 70) {
        erroAssunto.style.display = "block";  // Exibe a mensagem de erro para Assunto
        erroEncontrado = true; // Marca que houve erro no campo Assunto
    } else {
        erroAssunto.style.display = "none";  // Oculta a mensagem de erro para Assunto, se estiver dentro do limite
    }

    // Verificar se o campo Descrição tem mais de 500 caracteres
    if (descricao.length > 500) {
        erroDescricao.style.display = "block";  // Exibe a mensagem de erro para Descrição
        erroEncontrado = true; // Marca que houve erro no campo Descrição
    } else {
        erroDescricao.style.display = "none";  // Oculta a mensagem de erro para Descrição, se estiver dentro do limite
    }

    // Se houver algum erro, impede o envio do formulário
    if (erroEncontrado) {
        event.preventDefault();  // Impede o envio do formulário
    }
});