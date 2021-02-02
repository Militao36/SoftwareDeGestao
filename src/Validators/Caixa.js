export default (caixa) => {
    const erros = [];

    const enumTipo = ['entrada', 'saida', 'sangria', 'ajuste']

    if (!enumTipo.includes(caixa.tipo)) {
        erros.push({
            tipo: 'O tipo de movimentação passado é inválido.'
        });
    }

    if (!caixa.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
