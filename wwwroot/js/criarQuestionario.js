var contadorDeID = 0;

function AdicionarPergunta() {
    const perguntasDiv = document.querySelector(".perguntas");
    const pergunta = document.createElement("div");
    const perguntaInput = document.createElement("input");
    const perguntaDelete = document.createElement("a");
    const perguntaDeleteImg = document.createElement("img");
    
    perguntaInput.classList.add('pergunta-input');
    pergunta.id = contadorDeID++;
    perguntaDelete.addEventListener("click", () => RemoverPergunta(pergunta.id));
    perguntaDelete.classList.add("criar-questionario-btn-img");
    perguntaDeleteImg.src = "../icons/minus-solid.svg";
    perguntaDelete.appendChild(perguntaDeleteImg);
    
    pergunta.appendChild(perguntaInput);
    pergunta.appendChild(perguntaDelete);
    pergunta.classList.add("pergunta");
    
    perguntasDiv.appendChild(pergunta);
}
function RemoverPergunta(id) {
    const pergunta = document.getElementById(id);
    pergunta.remove();
}
function CarregarInformacao(){
    const tituloElement = document.getElementById('titulo-questionario');
    const tituloElementValor = sessionStorage.getItem('titulo');
    tituloElement.innerHTML = tituloElementValor;
}

async function FinalizarQuestionario() {
    const criarQuestionarioURL = 'https://localhost:5001/questionario';
    const criarPerguntaURL = 'https://localhost:5001/pergunta';

    const questionarioModel = {
        titulo: sessionStorage.getItem('titulo'),
        usuario: sessionStorage.getItem('usuario')
    };
    await fetch(criarQuestionarioURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionarioModel)
    })
    .then(response => response.json())
    .then(questionario => {
        const perguntasInput = document.querySelectorAll('.pergunta-input');
        perguntasInput.forEach(async pergunta => {
            if(pergunta.value === "") return;
            const perguntaModel = {
                titulo: pergunta.value,
                questionarioId: questionario.id
            };
            await fetch(criarPerguntaURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(perguntaModel)
            })
        });
    })
    .catch(error => console.error('não é possível adicionar o item.', error));

    window.location.href='../html/home.html';
}
CarregarInformacao();