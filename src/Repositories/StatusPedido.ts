import knex from '../Config/conn';
import IStatusPedido from '../Interfaces/StatusPedido';

class StatusPedido {
    save = async (statusPedido: IStatusPedido) => {
        return await knex('statusPedido').insert(statusPedido);
    }

    update = async (statusPedido: IStatusPedido) => {
        return await knex('statusPedido').update(statusPedido).where('idStatusPedido', '=', statusPedido.idStatusPedido);
    }

    delete = async (idStatusPedido: number) => {
        return await knex('statusPedido').delete().where('idStatusPedido', '=', idStatusPedido);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new StatusPedido();
