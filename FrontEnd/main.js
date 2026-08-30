function validacaoCampos() {
    const data = document.getElementById("data").value
    const agora = new Date();
    const dataCliente = new Date(data);

    const valor = document.getElementById("valor").value

    const nome = document.getElementById("nome")

    const descricao = document.getElementById("descricao")

    const select = document.getElementById("perfil_input").value

    if (agora > dataCliente) {
        alert("A data selecionada é inválida!")
    } else if (valor <= 0 || valor > 100000) {
        alert("Coloque um valor válido!")
    } else if (nome == null || nome.trim() === "" || descricao.trim() === "" || descricao == null) {
        alert("Atenção certifique-se de que os campos estão preenchidos")
    } else if (select == "") {
        alert("Certifique-se de que selecionou uma opção!")
    } else {
        enviarDados(data, valor, nome, descricao, select)
    }
}

async function buscarSelect() {
    try {
        const resposta = await fetch('http://localhost:8080/pecas/select')

        if (!resposta.ok) {
            throw new Error('Error na requisição: ' + resposta.status)
        }

        const dadosSelect = await resposta.json()
    } catch (erro) {
        console.log('Erro ao pegar dados do select: ' + erro)
    }
}

async function enviarDados(data, valor, nome, descricao, select) {
    const novaPeca = { 
        nome: nome, 
        valor: valor,
        descricao: descricao,
        data: data,
        select: select 
    };

    try {
        const resposta = await fetch('https://localhost:8080/pecas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaPeca)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao enviar dados');
        }

        const resultado = await resposta.json();
        console.log('Sucesso:', resultado);
    } catch (erro) {
        console.error('Erro:', erro);
    }
}