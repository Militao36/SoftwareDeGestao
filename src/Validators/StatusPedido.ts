import IStatusPedido from '../Interfaces/StatusPedido';

export default (stautsPeiddo: IStatusPedido) => {
    const erros = [];

    if (!stautsPeiddo.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
