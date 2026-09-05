const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));


function validacaoCampos() {
    const data = document.getElementById("data").value;
    const agora = new Date();
    const dataCliente = new Date(data);

    const valor = parseFloat(document.getElementById("valor").value);

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    const select = document.getElementById("perfil_input").value;

    if (agora > dataCliente) {
        alert("A data selecionada é inválida!");
    } else if (isNaN(valor) || valor <= 0 || valor > 100000) {
        alert("Coloque um valor válido!");
    } else if (nome === "" || descricao === "") {
        alert("Atenção certifique-se de que os campos estão preenchidos");
    } else if (select === "") {
        alert("Certifique-se de que selecionou uma opção!");
    } else {
        enviarDados(data, valor, nome, descricao, select);
    }
}

async function buscarSelect() {
    try {
        const resposta = await fetch('http://localhost:8080/pecas/select');

        if (!resposta.ok) {
            throw new Error('Erro na requisição: ' + resposta.status);
        }

        const dadosSelect = await resposta.json();

        const selectEl = document.getElementById("perfil_input");
        selectEl.innerHTML = '<option value="">Selecione...</option>';
        dadosSelect.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id ?? item.valor;
            option.textContent = item.nome ?? item.label;
            selectEl.appendChild(option);
        });

    } catch (erro) {
        console.log('Erro ao pegar dados do select: ' + erro);
    }
}

buscarSelect();

async function enviarDados(data, valor, nome, descricao, select) {
    const novaPeca = {
        nome: nome,
        preco: valor,
        descricao: descricao,
        data: data,
        categoria: select,
        tipo: document.querySelector('input[name="condicao"]:checked').value 
        };

    try {
        const resposta = await fetch('http://localhost:8080/pecas', {
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