async function CriarQuestionariobtn() {
    const titulo = document.getElementById('titulo-questionario').value;
    if(titulo === "") return;
    sessionStorage.setItem('titulo', titulo);
    window.location.href='../html/criarQuestionario.html';
}
function CarregarInformacoes() {
    const buscarQuestionarioURL = 'https://localhost:5001/questionario'; 
    fetch(buscarQuestionarioURL)
    .then(response => response.json())
    .then(questionarios => {
        questionarios.forEach(questionario => AdicionarQuestionarioAPagina(questionario))
    })
    .catch(error => console.error('Não foi possivel buscar o item', error));
}
function AdicionarQuestionarioAPagina(questionario) {
    const questionarioDivElement = document.createElement('div');
    const questionarioAElement = document.createElement('a');

    questionarioAElement.classList.add('questionario-link');
    questionarioAElement.addEventListener('click', () => AbrirQuestionario(questionario));
    questionarioDivElement.classList.add('questionario');
    questionarioDivElement.innerHTML = questionario.titulo;

    questionarioAElement.appendChild(questionarioDivElement);

    document.querySelector('.questionarios').appendChild(questionarioAElement);
}
function AbrirQuestionario(questionario){
   window.location.href=`../html/visualizarQuestionario.html?id=${questionario.id}&nome=${questionario.titulo}`;
}
CarregarInformacoes();
