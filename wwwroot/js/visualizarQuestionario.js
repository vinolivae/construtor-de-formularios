function CarregarInformacoes() {
    const parametros = new URLSearchParams(window.location.search);
    const buscarPerguntaURL = `https://localhost:5001/pergunta/questionario/${parametros.get('id')}`;
    const buscarRespostaURL = 'https://localhost:5001/resposta/pergunta/';
    document.querySelector('.questionario-titulo').innerHTML = parametros.get('nome');

    fetch(buscarPerguntaURL)
        .then(response => response.json())
        .then(perguntas => {
            perguntas.forEach(pergunta => {
                fetch(buscarRespostaURL + pergunta.id)
                    .then(response => response.json())
                    .then(respostas => AdicionarPerguntaAPagina(pergunta, respostas))
            })
        })
        .catch(error => console.error('Não foi possivel buscar o item', error));
}
function AdicionarPerguntaAPagina(pergunta, respostas) {
    const perguntaDiv = document.createElement('div');
    const tituloH2 = document.createElement('h2');
    const respostasDiv = document.createElement('div');
    const respostaLabel = document.createElement('label');

    respostaLabel.innerHTML = 'Respostas:';
    respostasDiv.id = pergunta.id;
    perguntaDiv.classList.add('pergunta');
    tituloH2.classList.add('pergunta-titulo');
    tituloH2.innerHTML = pergunta.titulo;
    respostasDiv.classList.add('respostas');

    if (respostas.length < 1) {
        const semRespostaDiv = document.createElement('div');
        semRespostaDiv.innerHTML = 'Não há respostas para esta pergunta';
        respostasDiv.appendChild(semRespostaDiv);
    }

    respostas.forEach(resposta => {
        const respostaText = document.createElement('textarea');
        respostaText.classList.add('resposta');
        respostaText.disabled = true;
        respostaText.value = resposta.titulo;
        respostasDiv.appendChild(respostaText);
    })

    perguntaDiv.appendChild(tituloH2);
    perguntaDiv.appendChild(respostaLabel);
    perguntaDiv.appendChild(respostasDiv);

    document.querySelector('.perguntas').appendChild(perguntaDiv);
}
function ResponderQuestionario() {
    const listaDeRespostasDiv = document.querySelectorAll('.respostas');

    listaDeRespostasDiv.forEach(listaDeRespostas => {
        const listaDeRespostaText = document.createElement('textarea');
        listaDeRespostaText.classList.add('resposta-text');
        listaDeRespostas.innerHTML = '';
        listaDeRespostas.appendChild(listaDeRespostaText);
    });

    const btn = document.querySelector('.responder-btn');
    btn.innerHTML = 'Salvar';
    btn.onclick = null;
    btn.addEventListener('click', RecarregarPagina);
}
function RecarregarPagina() {
    const responderPerguntaURL = 'https://localhost:5001/resposta';
    const respostaInput = document.querySelectorAll('.resposta-text');

    respostaInput.forEach(resposta => {
        if(resposta.value === '') return;
        
        const respostaModel = {
            titulo: resposta.value,
            usuario: sessionStorage.getItem('usuario'),
            perguntaId: parseInt(resposta.parentNode.id)
        };
        fetch(responderPerguntaURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(respostaModel)
        })
        .then(response => response.json())
        .catch(error => console.error('não foi possivel adicionar o item', error));   
    });

    document.location.reload();
}
function RetornarHome(){
    window.location.href='../html/home.html';
}
CarregarInformacoes();