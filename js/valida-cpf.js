// Exporta a função 'ehUmCPF' como a exportação padrão deste módulo
export default function ehUmCPF(campo) {
    // Remove pontos e hífens do valor do campo, deixando apenas os números
    const cpf = campo.value.replace(/\.|-/g, "");

    // Verifica se o CPF é inválido através de três funções de validação
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
       campo.setCustomValidity('Esse CPF não é valido')
    }
}

// Função para verificar se o CPF contém números repetidos (CPFs inválidos comuns)
function validaNumerosRepetidos(cpf) {
    const numeroRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    // Retorna true se o CPF estiver na lista de números repetidos
    return numeroRepetidos.includes(cpf);
}

// Função para validar o primeiro dígito verificador do CPF
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    // Calcula a soma dos primeiros 9 dígitos multiplicados por valores decrescentes de 10 a 2
    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    // Calcula o primeiro dígito verificador
    soma = (soma * 10) % 11;

    // Se o resultado for 10 ou 11, o dígito verificador deve ser 0
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna true se o dígito calculado for diferente do dígito no CPF
    return soma != cpf[9];
}

// Função para validar o segundo dígito verificador do CPF
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    // Calcula a soma dos primeiros 10 dígitos multiplicados por valores decrescentes de 11 a 2
    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    // Calcula o segundo dígito verificador
    soma = (soma * 10) % 11;

    // Se o resultado for 10 ou 11, o dígito verificador deve ser 0
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna true se o dígito calculado for diferente do dígito no CPF
    return soma != cpf[10];
}
