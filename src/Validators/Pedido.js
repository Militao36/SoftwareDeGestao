
export default (pedido) => {
    const erros = [];

    if (!pedido.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
