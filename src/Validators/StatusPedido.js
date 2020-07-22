
export default (stautsPeiddo) => {
    const erros = [];

    if (!stautsPeiddo.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
