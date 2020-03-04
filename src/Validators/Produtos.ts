import IProduto from '../Interfaces/IProdutos';

export default (produto: IProduto) => {
    const erros = [];

    if (!produto.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
