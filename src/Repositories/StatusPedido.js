import knex from '../Config/conn';

class StatusPedido {
    save(statusPedido) {
        return knex('statusPedido').insert(statusPedido);
    }

    update(statusPedido) {
        return knex('statusPedido').update(statusPedido).where('idStatusPedido', '=', statusPedido.idStatusPedido);
    }

    delete(idStatusPedido) {
        return knex('statusPedido').delete().where('idStatusPedido', '=', idStatusPedido);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new StatusPedido();
