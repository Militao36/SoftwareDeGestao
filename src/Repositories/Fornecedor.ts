import knex from '../Config/conn';
import IForncedor from '../Interfaces/IFornecedor';

class Fornecedor {
    save = async (fornecedor: IForncedor) => {
        return await knex('fornecedor').insert(fornecedor);
    }

    update = async (fornecedor: IForncedor) => {
        return await knex('fornecedor').update(fornecedor).where('idFornecedor', '=', fornecedor.idFornecedor);
    }

    delete = async (idFornecedor: number) => {
        return await knex('fornecedor').delete().where('idFornecedor', '=', idFornecedor);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Fornecedor();
