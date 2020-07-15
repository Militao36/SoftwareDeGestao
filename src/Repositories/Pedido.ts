import knex from '../Config/conn';
import IPedido from '../Interfaces/IPedido';

class Pedido {
    async save(pedido: IPedido) {
        return await knex('pedido').insert(pedido);
    }

    async update(pedido: IPedido) {
        return await knex('pedido').update(pedido).where('idPedido', '=', pedido.idPedido as number);
    }

    async  delete(idPedido: number) {
        return await knex('pedido').delete().where('idPedido', '=', idPedido);
    }

    async buscarFiltro(sql: string) {
        return await knex.raw(sql);
    }
}

export default new Pedido();
