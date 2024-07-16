// Seleciona o botão que inicia a câmera
const botaoIniciarCamera = document.querySelector("[data-video-botao]");

// Seleciona o campo da câmera (provavelmente um elemento que contém o vídeo)
const campoCamera = document.querySelector("[data-camera]");

// Seleciona o elemento de vídeo onde o stream da câmera será exibido
const video = document.querySelector("[data-video]");

// Seleciona o botão para tirar uma foto
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");

// Seleciona o canvas onde a foto tirada será desenhada
const canvas = document.querySelector("[data-video-canvas]");

// Seleciona a mensagem que será exibida após tirar a foto
const mensagem = document.querySelector("[data-mensagem]");

const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

// Adiciona um ouvinte de evento para o botão de iniciar a câmera
botaoIniciarCamera.addEventListener("click", async function () {
    try {
        // Solicita permissão para acessar a câmera e captura o stream de vídeo
        const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Esconde o botão de iniciar a câmera
        botaoIniciarCamera.style.display = "none";

        // Exibe o campo da câmera
        campoCamera.style.display = "block";

        // Define o stream de vídeo como a fonte do elemento de vídeo
        video.srcObject = iniciarVideo;
    } catch (error) {
        // Se ocorrer um erro ao tentar acessar a câmera, exibe uma mensagem de erro no console
        console.error("Erro ao acessar a câmera: ", error);
    }
});

// Adiciona um ouvinte de evento para o botão de tirar foto
botaoTirarFoto.addEventListener("click", function () {
    // Desenha a imagem atual do vídeo no canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte o conteúdo do canvas em uma URL de imagem no formato JPEG
    imagemURL = canvas.toDataURL("image/jpeg");

    // Exibe a mensagem indicando que a foto foi tirada
    mensagem.style.display = "block";

});

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");

    if (receberDadosExistentes) {
        const converteRetorno = JSON.parse(receberDadosExistentes);
        converteRetorno.imagem = imagemURL;
        localStorage.setItem('cadastro', JSON.stringify(converteRetorno));
    } else {
        // Se não houver dados existentes, inicializa um novo objeto com a propriedade imagem
        const novoCadastro = { imagem: imagemURL };
        localStorage.setItem('cadastro', JSON.stringify(novoCadastro));
    }

    window.location.href = "./abrir-conta-form-3.html";
});

