export default (produto) => {
    const erros = [];

    if (!produto.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
