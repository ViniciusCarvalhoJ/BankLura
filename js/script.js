// Importa a função 'ehUmCPF' do módulo './valida-cpf.js'
import ehUmCPF from "./valida-cpf.js";

// Importa a função 'ehMaiorDeIdade' do módulo './valida-idade.js'
import ehMaiorDeIdade from "./valida-idade.js";

// Seleciona todos os campos do formulário que possuem o atributo 'required'
const camposDeFormulario = document.querySelectorAll("[required]");

const formulário = document.querySelector("[data-formulario]");

formulário.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome" : e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg":e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro",JSON.stringify(listaRespostas));

    window.location.href = './abrir-conta-form-2.html';
})

// Adiciona um ouvinte de evento 'blur' (perda de foco) para cada campo obrigatório
camposDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

// Função para verificar o campo do formulário
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    
    // Verifica se o campo é de CPF e possui pelo menos 11 caracteres
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo); // Chama a função 'ehUmCPF' para validar o CPF
    }
    
    // Verifica se o campo é de data de aniversário e não está vazio
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo); // Chama a função 'ehMaiorDeIdade' para validar a idade
    }
    tiposDeErro.forEach(erro => {
     if(campo.validity[erro]){
       const mensagem = mensagens[campo.name][erro];
       console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput){
         mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = "";
    }
}
