import knex from '../Config/conn';
import IClientes from '../Interfaces/ICliente';

class Clientes {
    save = async (cliente: IClientes) => {
        return await knex('cliente').insert(cliente);
    }

    update = async (cliente: IClientes) => {
        return await knex('cliente').update(cliente).where('idCliente', '=', cliente.idCliente);
    }

    delete = async (idCliente: number) => {
        return await knex('cliente').delete().where('idCliente', '=', idCliente);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Clientes();
