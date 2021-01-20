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

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Pedido();
