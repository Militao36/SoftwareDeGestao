import knex from '../Config/conn';
import IPedido from '../Interfaces/IPedido';

class Pedido {
    save = async (pedido: IPedido) => {
        return await knex('pedido').insert(pedido);
    }

    update = async (pedido: IPedido) => {
        return await knex('pedido').update(pedido).where('idPedido', '=', pedido.idPedido);
    }

    delete = async (idPedido: number) => {
        return await knex('pedido').delete().where('idPedido', '=', idPedido);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Pedido();
