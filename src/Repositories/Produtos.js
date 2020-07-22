import knex from '../Config/conn';

class Produtos {
    save = async (produto) => {
        return await knex('produto').insert(produto);
    }

    update = async (produto) => {
        return await knex('produto').update(produto).where('idProduto', '=', produto.idProduto);
    }

    delete = async (idProduto) => {
        return await knex('produto').delete().where('idProduto', '=', idProduto);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new Produtos();
