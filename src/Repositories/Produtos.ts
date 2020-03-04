import knex from '../Config/conn';
import IProduto from '../Interfaces/IProdutos';

class Produtos {
    save = async (produto: IProduto) => {
        return await knex('produto').insert(produto);
    }

    update = async (produto: IProduto) => {
        return await knex('produto').update(produto).where('idProduto', '=', produto.idProduto);
    }

    delete = async (idProduto: number) => {
        return await knex('produto').delete().where('idProduto', '=', idProduto);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Produtos();
