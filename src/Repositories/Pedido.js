import knex from '../Config/conn';

class Pedido {
    save(pedido) {
        return knex('pedido').insert(pedido);
    }

    update(pedido) {
        return knex('pedido').update(pedido).where('idPedido', '=', pedido.idPedido);
    }

    delete(idPedido) {
        return knex('pedido').delete().where('idPedido', '=', idPedido);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Pedido();
