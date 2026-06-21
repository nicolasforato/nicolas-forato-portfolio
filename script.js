// ==========================================
// Scroll Spy: Marca o menu enquanto rola a tela
// ==========================================
const secoes = document.querySelectorAll('section');
const linksMenu = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let secaoAtual = '';
    
    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop;
        // O -150 compensa a altura do header fixo e dá uma margem melhor
        if (scrollY >= (topoSecao - 150)) {
            secaoAtual = secao.getAttribute('id');
        }
    });

    // Correção: Garante que o menu "Contato" acenda se o usuário rolar até o limite do fim da página
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
        secaoAtual = 'contato';
    }

    // Atualiza a marcação no menu
    linksMenu.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href').includes(secaoAtual)) {
            link.classList.add('ativo');
        }
    });
});

// ==========================================
// Validação e Envio de Formulário (Formspree)
// ==========================================
const formulario = document.getElementById('form-contato');
const divStatus = document.getElementById('mensagem-status');

// Função pra exibir mensagens na tela (verde pra sucesso, vermelho pra erro)
function exibirMensagem(texto, tipo) {
    divStatus.innerText = texto;
    divStatus.style.color = tipo === 'erro' ? '#e74c3c' : '#27ae60';
    divStatus.style.marginBottom = '15px';
    divStatus.style.fontWeight = 'bold';
}

formulario.addEventListener('submit', function(evento) {
    // Segura o formulário pra não recarregar a página
    evento.preventDefault(); 
    divStatus.innerText = ''; // Limpa mensagens anteriores

    // Coleta os dados e limpa espaços sobrando
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validações básicas
    if (nome === '' || email === '' || mensagem === '') {
        exibirMensagem('Por favor, preencha todos os campos.', 'erro');
        return; 
    }

    if (!email.includes('@') || !email.includes('.')) {
        exibirMensagem('Por favor, insira um e-mail válido.', 'erro');
        return;
    }

    // Se chegou até aqui, os dados estão corretos.
    // Vamos empacotar tudo e mandar pro Formspree sem sair da página (via Fetch API)
    const dadosEnvio = new FormData(formulario);

    exibirMensagem('Enviando...', 'sucesso'); // Feedback temporário
    divStatus.style.color = '#3498db'; // Azulzinho enquanto carrega

    fetch(formulario.action, {
        method: formulario.method,
        body: dadosEnvio,
        headers: {
            'Accept': 'application/json'
        }
    }).then(resposta => {
        if (resposta.ok) {
            // Sucesso real com a mensagem escolhida!
            exibirMensagem(`Mensagem enviada com sucesso, ${nome}! Obrigado pelo contato.`, 'sucesso');
            formulario.reset(); // Limpa a caixa de texto
        } else {
            exibirMensagem('Ops! Ocorreu um problema ao enviar. Tente novamente.', 'erro');
        }
    }).catch(erro => {
        exibirMensagem('Erro de conexão. Verifique sua internet.', 'erro');
    });
});

// ==========================================
// Toggle Tema Claro / Escuro
// ==========================================
const btnTema = document.getElementById('btn-tema');
const body = document.body;

btnTema.addEventListener('click', () => {
    // Liga e desliga a classe no CSS
    body.classList.toggle('tema-escuro');
    
    // Troca a etiqueta do botão
    if (body.classList.contains('tema-escuro')) {
        btnTema.innerText = '☀️ Claro';
    } else {
        btnTema.innerText = '🌙 Escuro';
    }
});