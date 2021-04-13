import knex from '../Config/conn';

class Pedido {
    save(pedido) {
        return knex('pedido').insert(pedido);
    }

    update(pedido) {
        return knex('pedido').update(pedido).where('uuid', '=', pedido.uuid);
    }

    delete(uuid) {
        return knex('pedido').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('lis_pedido').select().where('uuid', '=', uuid).first();
    }

    findByIdPedido(uuid) {
        return knex('pedido').select(
            ["uuid", "idPedido"]
        ).where('uuid', '=', uuid).first();
    }

    findByIdPedidoToID(idPedido) {
        return knex('pedido').select(
            ["uuid", "idPedido"]
        ).where('idPedido', '=', idPedido).first();
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Pedido();
