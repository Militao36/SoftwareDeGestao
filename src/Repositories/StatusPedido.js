import knex from '../Config/conn';

class StatusPedido {
    save = async (statusPedido) => {
        return await knex('statusPedido').insert(statusPedido);
    }

    update = async (statusPedido) => {
        return await knex('statusPedido').update(statusPedido).where('idStatusPedido', '=', statusPedido.idStatusPedido);
    }

    delete = async (idStatusPedido) => {
        return await knex('statusPedido').delete().where('idStatusPedido', '=', idStatusPedido);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new StatusPedido();
