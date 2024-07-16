// Exporta a função 'ehMaiorDeIdade' como a exportação padrão deste módulo
export default function ehMaiorDeIdade(campo) {
    // Converte o valor do campo em uma data de nascimento
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('o usuario não é maior de idade');

    }
}

// Função interna para validar se a data de nascimento é de alguém maior de 18 anos
function validaIdade(data) {
    // Obtém a data atual
    const dataAtual = new Date();

    // Calcula a data mínima de nascimento para ter 18 anos completos
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    // Retorna true se a data atual for maior ou igual à data mínima de 18 anos
    return dataAtual >= dataMais18;
}
