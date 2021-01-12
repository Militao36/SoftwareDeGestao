import knex from '../Config/conn';

class Produtos {
    save(produto) {
        return knex('produto').insert(produto);
    }

    update(produto) {
        return knex('produto').update(produto).where('idProduto', '=', produto.idProduto);
    }

    delete(idProduto) {
        return knex('produto').delete().where('idProduto', '=', idProduto);
    }

    findById(idProduto) {
        return knex('produto').select(
            ["idProduto", "codBarras", "nomeProduto", "valor", "estoque",
                "estoqueMin", "idFornecedor"]
        ).where('idProduto', '=', idProduto);
    }

    findByCodBarras(codBarras) {
        return knex('produto').select(
            ["idProduto", "codBarras"]
        ).where('codBarras', '=', codBarras);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Produtos();
