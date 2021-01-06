import knex from '../Config/conn';

class Clientes {
    save(cliente) {
        return knex('cliente').insert(cliente);
    }

    update(cliente) {
        return knex('cliente').update(cliente).where('idCliente', '=', cliente.idCliente);
    }

    delete(idCliente) {
        return knex('cliente').delete().where('idCliente', '=', idCliente);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Clientes();
