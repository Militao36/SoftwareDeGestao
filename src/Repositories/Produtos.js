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

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Produtos();
