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
        mostrarAlerta('error', 'Falha no Cadastro', 'Preencha todos os campos obrigatórios antes de enviar.');
    } else if (isNaN(valor) || valor <= 0 || valor > 100000) {
        mostrarAlerta('error', 'Falha no Cadastro', 'Preencha todos os campos obrigatórios antes de enviar.');
    } else if (nome === "" || descricao === "") {
        mostrarAlerta('error', 'Falha no Cadastro', 'Preencha todos os campos obrigatórios antes de enviar.');
    } else if (select === "") {
        mostrarAlerta('error', 'Falha no Cadastro', 'Preencha todos os campos obrigatórios antes de enviar.');
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
        mostrarAlerta('success', 'Cadastro Realizado!', 'A peça foi registrada com sucesso no sistema.');
        
        
    } catch (erro) {
        console.error('Erro:', erro);
    }
}


/* MODAL */

function mostrarAlerta(tipo, titulo, mensagem) {
    const overlay = document.getElementById('alertOverlay');
    const modal = document.getElementById('alertModal');
    const iconContainer = document.getElementById('alertIcon');
    const titleEl = document.getElementById('alertTitle');
    const messageEl = document.getElementById('alertMessage');

    
    modal.className = `alert-modal ${tipo}`;

  
    titleEl.textContent = titulo;
    messageEl.textContent = mensagem;


    if (tipo === 'success') {
        iconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>`;
    } else if (tipo === 'error') {
        iconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`;
    } else if (tipo === 'warning') {
        iconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`;
    }

   
    overlay.classList.add('active');
}


function fecharAlerta() {
    const overlay = document.getElementById('alertOverlay');
    overlay.classList.remove('active');
}