import ProdutosRepo from '../Repositories/Produtos';


export default async (produto) => {
    const erros = [];

    const data = await ProdutosRepo.findByCodBarras(produto.codBarras);
    if (data.length !== 0 && (data[0].uuid !== produto.uuid)) {
        erros.push({
            codBarras: 'Esté código de barras já está vinculado a outro produto.'
        });
    }

    if (produto.estoque < 0) {
        erros.push({
            estoque: 'O campo estoque não pode fica negativo'
        })
    }

    if (produto.estoqueMin < 0) {
        erros.push({
            estoqueMin: 'O campo estoque minimo não pode fica negativo'
        })
    }

    if (!produto.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
