// Sistema do Farma Fácil

// Sistema de página ativa no menu
function highlightActivePage() {
    console.log('Iniciando highlightActivePage...');
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Página atual:', currentPage);
    
    const menuLinks = document.querySelectorAll('.main-menu a');
    console.log('Links encontrados:', menuLinks.length);
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        console.log('Verificando link:', linkPage);
        
        // Comparação simples
        if (currentPage === linkPage) {
            link.classList.add('active');
            console.log('Link ativado:', linkPage);
        }
    });
}

// Sistema de autenticação
function logout() {
    localStorage.removeItem('loggedUser');
    updateMenu();
    window.location.href = 'index.html';
}

function updateMenu() {
    const logged = !!localStorage.getItem('loggedUser');
    const loginMenu = document.getElementById('loginMenu');
    const cadastroMenu = document.getElementById('cadastroMenu');
    const logoutMenu = document.getElementById('logoutMenu');
    
    if (loginMenu) loginMenu.style.display = logged ? 'none' : '';
    if (cadastroMenu) cadastroMenu.style.display = logged ? 'none' : '';
    if (logoutMenu) logoutMenu.style.display = logged ? '' : 'none';
}

// Função de cadastro
function cadastrar(event) {
    if (event) event.preventDefault();
    
    const user = document.getElementById('cadUser')?.value;
    const pass = document.getElementById('cadPass')?.value;
    const confirmPass = document.getElementById('confirmPass')?.value;
    const mensagem = document.getElementById('cadastroMsg');
    
    if (!mensagem) return false;
    
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
    
    if (!user || !pass) {
        mensagem.textContent = 'Preencha todos os campos.';
        mensagem.className = 'mensagem erro';
        return false;
    }
    
    if (pass !== confirmPass) {
        mensagem.textContent = 'As senhas não coincidem!';
        mensagem.className = 'mensagem erro';
        return false;
    }
    
    if (localStorage.getItem('user_' + user)) {
        mensagem.textContent = 'Usuário já existe!';
        mensagem.className = 'mensagem erro';
        return false;
    }
    
    localStorage.setItem('user_' + user, pass);
    mensagem.textContent = 'Cadastro realizado com sucesso!';
    mensagem.className = 'mensagem sucesso';
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
    
    return false;
}

// Função de login
function login(event) {
    if (event) event.preventDefault();
    
    const user = document.getElementById('loginUser')?.value;
    const pass = document.getElementById('loginPass')?.value;
    const mensagem = document.getElementById('loginMsg');
    
    if (!mensagem) return false;
    
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
    
    if (localStorage.getItem('user_' + user) === pass) {
        localStorage.setItem('loggedUser', user);
        mensagem.textContent = 'Login realizado com sucesso!';
        mensagem.className = 'mensagem sucesso';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        mensagem.textContent = 'Usuário ou senha incorretos!';
        mensagem.className = 'mensagem erro';
    }
    return false;
}

// Inicialização da página
function initPage() {
    console.log('=== Farma Fácil Iniciando ===');
    
    highlightActivePage();
    updateMenu();
    
    console.log('=== Farma Fácil Inicializado ===');
}

// Quando a página carregar
document.addEventListener('DOMContentLoaded', initPage);

// Tornar funções globais para o HTML
window.cadastrar = cadastrar;
window.login = login;
window.logout = logout;
window.updateMenu = updateMenu;

// Função para expandir/recolher grupos de medicamentos
document.addEventListener('DOMContentLoaded', function() {
    // Menu lateral - grupos expansíveis
    document.querySelectorAll('.group-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Destacar medicamento selecionado no menu lateral
    document.querySelectorAll('.medicine-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.medicine-item').forEach(i => {
                i.style.backgroundColor = '';
                i.style.fontWeight = 'normal';
            });
            this.style.backgroundColor = '#e8f4f8';
            this.style.fontWeight = 'bold';
        });
    });
});

// Função para ver preços
function verPrecos(medicamento) {
    const precos = {
        'Paracetamol': [
            { farmacia: 'Drogasil', preco: 'R$ 8,90' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 9,20' },
            { farmacia: 'Poupa Minas', preco: 'R$ 8,50' },
            { farmacia: 'Minas Mais', preco: 'R$ 8,70' }
        ],
        'Ibuprofeno': [
            { farmacia: 'Drogasil', preco: 'R$ 12,50' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 13,00' },
            { farmacia: 'Poupa Minas', preco: 'R$ 11,90' },
            { farmacia: 'Minas Mais', preco: 'R$ 12,30' }
        ],
        'Amoxicilina': [
            { farmacia: 'Drogasil', preco: 'R$ 15,80' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 16,20' },
            { farmacia: 'Poupa Minas', preco: 'R$ 15,50' },
            { farmacia: 'Minas Mais', preco: 'R$ 15,90' }
        ],
        'Losartana': [
            { farmacia: 'Drogasil', preco: 'R$ 18,30' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 19,00' },
            { farmacia: 'Poupa Minas', preco: 'R$ 17,80' },
            { farmacia: 'Minas Mais', preco: 'R$ 18,20' }
        ],
        'Dipirona': [
            { farmacia: 'Drogasil', preco: 'R$ 6,90' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 7,20' },
            { farmacia: 'Poupa Minas', preco: 'R$ 6,50' },
            { farmacia: 'Minas Mais', preco: 'R$ 6,70' }
        ],
        'Sildenafila': [
            { farmacia: 'Drogasil', preco: 'R$ 42,90' },
            { farmacia: 'Drogaria Araujo', preco: 'R$ 45,00' },
            { farmacia: 'Poupa Minas', preco: 'R$ 40,90' },
            { farmacia: 'Minas Mais', preco: 'R$ 41,50' }
        ]
    };

    const dados = precos[medicamento] || [
        { farmacia: 'Drogasil', preco: 'R$ --,--' },
        { farmacia: 'Drogaria Araujo', preco: 'R$ --,--' },
        { farmacia: 'Poupa Minas', preco: 'R$ --,--' },
        { farmacia: 'Minas Mais', preco: 'R$ --,--' }
    ];

    const modalHTML = `
        <div class="modal-precos" id="modalPrecos">
            <div class="modal-content">
                <button class="modal-close" onclick="fecharModal()">×</button>
                <h3 style="color: #2c3e50; margin-bottom: 20px;">💊 Preços - ${medicamento}</h3>
                <div class="precos-lista">
                    ${dados.map(item => `
                        <div class="farmacia-preco-item">
                            <span class="farmacia-nome">🏥 ${item.farmacia}</span>
                            <span class="farmacia-preco">${item.preco}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 25px; text-align: center;">
                    <button class="btn-precos" onclick="fecharModal()" style="padding: 10px 20px;">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('modalPrecos').style.display = 'flex';
}

function verInfo(medicamento) {
    alert(`Informações detalhadas sobre ${medicamento} serão exibidas aqui.`);
    // Aqui você pode implementar um modal com informações detalhadas
}

function verTodosMedicamentos() {
    alert('Redirecionando para página completa de medicamentos...');
    // window.location.href = 'medicamentos.html';
}

function fecharModal() {
    const modal = document.getElementById('modalPrecos');
    if (modal) {
        modal.remove();
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-precos')) {
        fecharModal();
    }
});

// Simulação de função de logout
function logout() {
    alert('Logout realizado com sucesso!');
    // Implementação real de logout aqui
}

// =============================================
// FUNÇÕES PARA ACOMPANHAMENTO DE PEDIDO
// =============================================

// Buscar pedido pelo código
// Buscar pedido pelo código
function buscarPedido() {
    const codigo = document.getElementById('codigoPedido').value;
    
    if (codigo === '') {
        mostrarMensagem('Por favor, digite o código do pedido', 'erro');
        return;
    }

    // CORREÇÃO: Aceitar códigos 1, 2 e 3
    if (codigo === '1' || codigo === '2' || codigo === '3') {
        document.getElementById('resultadoPedido').style.display = 'block';
        document.getElementById('pedidoNaoEncontrado').style.display = 'none';
        document.getElementById('numeroPedido').textContent = codigo;
        
        // Simular dados do pedido baseado no código
        simularDadosPedido(codigo);
        
        mostrarMensagem('Pedido encontrado com sucesso!', 'sucesso');
    } else {
        document.getElementById('resultadoPedido').style.display = 'none';
        document.getElementById('pedidoNaoEncontrado').style.display = 'block';
        mostrarMensagem('Pedido não encontrado. Verifique o código.', 'erro');
    }
}
// Simular dados do pedido (para demonstração)
function simularDadosPedido(codigo) {
    const pedidosSimulados = {
        '1': {
            cliente: 'João Silva',
            data: '15/01/2024',
            status: 'Em Processamento',
            itens: [
                { nome: 'Paracetamol 500mg', descricao: 'Caixa com 20 comprimidos', quantidade: 2, preco: 8.90 },
                { nome: 'Ibuprofeno 400mg', descricao: 'Caixa com 10 comprimidos', quantidade: 1, preco: 12.50 }
            ],
            farmacia: 'Drogasil - Centro'
        },
        '2': {
            cliente: 'Maria Santos',
            data: '16/01/2024',
            status: 'Pronto para Retirada',
            itens: [
                { nome: 'Amoxicilina 500mg', descricao: 'Caixa com 21 comprimidos', quantidade: 1, preco: 15.80 },
                { nome: 'Dipirona Sódica', descricao: 'Caixa com 10 comprimidos', quantidade: 2, preco: 6.90 }
            ],
            farmacia: 'Drogaria Araujo'
        },
        // Adicione um exemplo com código FF também
        '3': {
            cliente: 'Carlos Oliveira',
            data: '17/01/2024', 
            status: 'Entregue/Retirado',
            itens: [
                { nome: 'Losartana 50mg', descricao: 'Caixa com 30 comprimidos', quantidade: 1, preco: 18.30 }
            ],
            farmacia: 'Poupa Minas'
        }
    };

    // CORREÇÃO: Remover .toUpperCase() para funcionar com números
    const pedido = pedidosSimulados[codigo] || pedidosSimulados['1'];
    
    // Atualizar dados na página
    document.getElementById('nomeCliente').textContent = pedido.cliente;
    document.getElementById('dataPedido').textContent = pedido.data;
    document.getElementById('statusPedido').textContent = pedido.status;
    document.getElementById('farmaciaNome').textContent = pedido.farmacia;
    
    // Atualizar itens do pedido
    atualizarItensPedido(pedido.itens);
    
    // Atualizar timeline baseada no status
    atualizarTimeline(pedido.status);
}

// Atualizar itens do pedido na página
function atualizarItensPedido(itens) {
    const containerItens = document.querySelector('.itens-pedido');
    const containerTotal = document.querySelector('.pedido-total');
    
    // Limpar itens anteriores
    containerItens.innerHTML = '';
    
    let subtotal = 0;
    
    // Adicionar novos itens
    itens.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-pedido';
        itemElement.innerHTML = `
            <div class="item-info">
                <span class="item-nome">${item.nome}</span>
                <span class="item-desc">${item.descricao}</span>
            </div>
            <div class="item-quantidade">Qtd: ${item.quantidade}</div>
            <div class="item-preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
        `;
        containerItens.appendChild(itemElement);
        
        subtotal += item.preco * item.quantidade;
    });
    
    // Atualizar totais
    const taxaEntrega = 5.00;
    const total = subtotal + taxaEntrega;
    
    containerTotal.innerHTML = `
        <div class="total-line">
            <span>Subtotal:</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="total-line">
            <span>Taxa de entrega:</span>
            <span>R$ ${taxaEntrega.toFixed(2)}</span>
        </div>
        <div class="total-line final">
            <span><strong>Total:</strong></span>
            <span><strong>R$ ${total.toFixed(2)}</strong></span>
        </div>
    `;
}

// Atualizar timeline baseada no status
function atualizarTimeline(status) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Resetar todos os itens
    timelineItems.forEach(item => {
        item.classList.remove('completed', 'active');
    });
    
    // Atualizar baseado no status
    switch(status) {
        case 'Em Processamento':
            timelineItems[0].classList.add('completed');
            timelineItems[1].classList.add('completed');
            timelineItems[2].classList.add('active');
            break;
        case 'Pronto para Retirada':
            timelineItems[0].classList.add('completed');
            timelineItems[1].classList.add('completed');
            timelineItems[2].classList.add('completed');
            timelineItems[3].classList.add('active');
            break;
        case 'Entregue/Retirado':
            timelineItems.forEach(item => item.classList.add('completed'));
            break;
        default:
            timelineItems[0].classList.add('completed');
            timelineItems[1].classList.add('active');
    }
}

// Imprimir comprovante do pedido
function imprimirPedido() {
    const pedidoNumero = document.getElementById('numeroPedido').textContent;
    const pedidoData = document.getElementById('dataPedido').textContent;
    
    // Criar conteúdo para impressão
    const conteudoImpressao = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="text-align: center; color: #2563eb;">Farma Fácil - Comprovante</h2>
            <hr>
            <p><strong>Número do Pedido:</strong> ${pedidoNumero}</p>
            <p><strong>Data:</strong> ${pedidoData}</p>
            <p><strong>Status:</strong> ${document.getElementById('statusPedido').textContent}</p>
            <br>
            <h3>Itens do Pedido:</h3>
            ${document.querySelector('.itens-pedido').innerHTML}
            ${document.querySelector('.pedido-total').innerHTML}
            <br>
            <p style="text-align: center; font-size: 12px; color: #666;">
                Este é um comprovante gerado automaticamente.<br>
                Farma Fácil - ${new Date().getFullYear()}
            </p>
        </div>
    `;
    
    // Abrir janela de impressão
    const janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write(`
        <html>
            <head>
                <title>Comprovante - ${pedidoNumero}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .item-pedido { display: flex; justify-content: space-between; margin: 10px 0; }
                    .total-line { display: flex; justify-content: space-between; margin: 5px 0; }
                    .final { font-weight: bold; border-top: 1px solid #000; padding-top: 5px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>${conteudoImpressao}</body>
        </html>
    `);
    janelaImpressao.document.close();
    janelaImpressao.print();
}

// Contatar farmácia
function contatarFarmacia() {
    const farmaciaNome = document.getElementById('farmaciaNome').textContent;
    let telefone = '';
    
    // Simular telefones baseado na farmácia
    if (farmaciaNome.includes('Drogasil')) {
        telefone = '(11) 3333-4444';
    } else if (farmaciaNome.includes('Araujo')) {
        telefone = '(11) 2222-3333';
    } else {
        telefone = '(31) 99999-9999';
    }
    
    if (confirm(`Deseja ligar para ${farmaciaNome}?\nTelefone: ${telefone}`)) {
        window.location.href = `tel:${telefone}`;
    }
}

// Fazer novo pedido
function novoPedido() {
    if (confirm('Deseja fazer um novo pedido?')) {
        window.location.href = 'contato.html';
    }
}

// Contatar suporte
function contatarSuporte() {
    const telefoneSuporte = '(31) 99999-9999';
    const emailSuporte = 'suporte@farmafacil.com.br';
    
    const mensagem = `Entre em contato com nosso suporte:\n\n📞 Telefone: ${telefoneSuporte}\n📧 Email: ${emailSuporte}\n\nDeseja ligar agora?`;
    
    if (confirm(mensagem)) {
        window.location.href = `tel:${telefoneSuporte}`;
    }
}

// Mostrar mensagem para o usuário
function mostrarMensagem(mensagem, tipo) {
    // Remover mensagens anteriores
    const mensagemAnterior = document.querySelector('.mensagem-usuario');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Criar nova mensagem
    const mensagemElement = document.createElement('div');
    mensagemElement.className = `mensagem-usuario ${tipo}`;
    mensagemElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        ${tipo === 'sucesso' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    mensagemElement.textContent = mensagem;
    
    document.body.appendChild(mensagemElement);
    
    // Remover após 5 segundos
    setTimeout(() => {
        mensagemElement.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (mensagemElement.parentNode) {
                mensagemElement.remove();
            }
        }, 300);
    }, 5000);
}

// =============================================
// INICIALIZAÇÃO DA PÁGINA
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de acompanhamento de pedido
    if (window.location.pathname.includes('acompanhar-pedido')) {
        inicializarPaginaAcompanhamento();
    }
});

function inicializarPaginaAcompanhamento() {
    // Esconder resultados inicialmente
    document.getElementById('resultadoPedido').style.display = 'none';
    document.getElementById('pedidoNaoEncontrado').style.display = 'none';
    
    // Adicionar evento de Enter no campo de busca
    const inputCodigo = document.getElementById('codigoPedido');
    if (inputCodigo) {
        inputCodigo.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarPedido();
            }
        });
        
        // Focar no campo de busca
        inputCodigo.focus();
    }
    
    // Adicionar estilos para animações
    if (!document.querySelector('#estilos-animacoes')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-animacoes';
        estilos.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(estilos);
    }
}

// =============================================
// FUNÇÃO DE LOGOUT (já existente)
// =============================================

function logout() {
    if (confirm('Deseja realmente sair?')) {
        // Simular logout
        document.getElementById('loginMenu').style.display = 'inline-block';
        document.getElementById('cadastroMenu').style.display = 'inline-block';
        document.getElementById('logoutMenu').style.display = 'none';
        
        mostrarMensagem('Logout realizado com sucesso!', 'sucesso');
        
        // Redirecionar para página inicial após 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// =============================================
// FUNÇÕES DE AUTENTICAÇÃO COMPLETAS
// =============================================

// Função para fazer login (atualizada)
function fazerLogin(usuario) {
    // Esconder botões de entrar/cadastrar
    document.getElementById('loginMenu').style.display = 'none';
    document.getElementById('cadastroMenu').style.display = 'none';
    
    // Mostrar botão de sair
    document.getElementById('logoutMenu').style.display = 'inline-block';
    
    // Salvar no localStorage (compatível com seu sistema)
    localStorage.setItem('loggedUser', usuario.nome);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    
    mostrarMensagem(`Bem-vindo, ${usuario.nome}!`, 'sucesso');
    
    // Redirecionar para página inicial
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Função de logout (ATUALIZADA - substitui a existente)
function logout() {
    if (confirm('Deseja realmente sair?')) {
        // Remover dados de login
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('usuarioLogado');
        
        // Atualizar menu
        updateMenu();
        
        mostrarMensagem('Logout realizado com sucesso!', 'sucesso');
        
        // Redirecionar para página inicial
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Verificar estado de login (NOVA FUNÇÃO)
function verificarEstadoLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const loggedUser = localStorage.getItem('loggedUser');
    
    if (usuarioLogado || loggedUser) {
        // Usuário ESTÁ logado
        document.getElementById('loginMenu').style.display = 'none';
        document.getElementById('cadastroMenu').style.display = 'none';
        document.getElementById('logoutMenu').style.display = 'inline-block';
    } else {
        // Usuário NÃO está logado
        document.getElementById('loginMenu').style.display = 'inline-block';
        document.getElementById('cadastroMenu').style.display = 'inline-block';
        document.getElementById('logoutMenu').style.display = 'none';
    }
}

// =============================================
// ATUALIZAÇÃO DA INICIALIZAÇÃO
// =============================================

// Substitua a função initPage existente por esta:
function initPage() {
    console.log('=== Farma Fácil Iniciando ===');
    
    highlightActivePage();
    updateMenu();
    verificarEstadoLogin(); // ← LINHA ADICIONADA
    
    // Inicializar página de acompanhamento se necessário
    if (window.location.pathname.includes('acompanhar-pedido')) {
        inicializarPaginaAcompanhamento();
    }
    
    console.log('=== Farma Fácil Inicializado ===');
}

// =============================================
// ATUALIZAR FUNÇÕES GLOBAIS
// =============================================

// Adicione estas linhas ao final (onde estão as window.* atuais):
window.fazerLogin = fazerLogin;
window.verificarEstadoLogin = verificarEstadoLogin;