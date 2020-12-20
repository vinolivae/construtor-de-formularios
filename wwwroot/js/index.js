function Entrar(e) {
    const usuario = document.querySelector("#usuario").value;
    if(usuario === "") return;
    sessionStorage.setItem("usuario", usuario);
    window.location.href="../html/home.html";
}
function PegarLocalizacao() {
    
    navigator.geolocation.getCurrentPosition(AtribuirLocalizacao);
}
function AtribuirLocalizacao(posicao) {
    const userURL = 'https://localhost:5001/user';
    const userModel = {
        Long: posicao.coords.longitude,
        Lat: posicao.coords.latitude
    };
    fetch(userURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userModel)
    })
    .then(response => response.json())
    .catch(error => console.error('não foi possivel adicionar o item', error));   
}
PegarLocalizacao();