import knex from '../Config/conn';

class Pedido {
    async save(pedido) {
        return await knex('pedido').insert(pedido);
    }

    async update(pedido) {
        return await knex('pedido').update(pedido).where('idPedido', '=', pedido.idPedido);
    }

    async delete(idPedido) {
        return await knex('pedido').delete().where('idPedido', '=', idPedido);
    }

    async buscarFiltro(sql) {
        return await knex.raw(sql);
    }
}

export default new Pedido();
