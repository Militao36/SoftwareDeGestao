import knex from '../Config/conn';

class Clientes {
    save = async (cliente) => {
        return await knex('cliente').insert(cliente);
    }

    update = async (cliente) => {
        return await knex('cliente').update(cliente).where('idCliente', '=', cliente.idCliente );
    }

    delete = async (idCliente) => {
        return await knex('cliente').delete().where('idCliente', '=', idCliente);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new Clientes();
