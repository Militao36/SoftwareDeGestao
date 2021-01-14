import knex from '../Config/conn';

class StatusPedido {
    save(statusPedido) {
        return knex('statusPedido').insert(statusPedido);
    }

    update(statusPedido) {
        return knex('statusPedido').update(statusPedido).where('uuid', '=', statusPedido.uuid);
    }

    delete(uuid) {
        return knex('statusPedido').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('statusPedido').select(
            ["uuid", "nomeStatus"]
        ).where('uuid', '=', uuid).first()
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new StatusPedido();
