function validacaoCampos() {
    const data = document.getElementById("data").value
    const agora = new Date();
    const dataCliente = new Date(data);

    const valor = document.getElementById("valor").value

    const nome = document.getElementById("nome")

    const descricao = document.getElementById("descricao")

    if (agora > dataCliente) {
        alert("A data selecionada é inválida!")
        return
    } else if (valor <= 0 || valor > 100000) {
        alert("Coloque um valor válido!")
        return
    } else if (nome == null || nome.trim() === "" || descricao.trim() === "" || descricao == null) {
        alert("Atenção certifique-se de que os campos estão preenchidos")
        return
    } else {
        enviarDados()
    }
}

function enviarDados(){

}