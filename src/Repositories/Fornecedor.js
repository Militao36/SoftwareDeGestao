import knex from '../Config/conn';

class Fornecedor {
    save = async (fornecedor) => {
        return await knex('fornecedor').insert(fornecedor);
    }

    update = async (fornecedor) => {
        return await knex('fornecedor').update(fornecedor).where('idFornecedor', '=', fornecedor.idFornecedor);
    }

    delete = async (idFornecedor) => {
        return await knex('fornecedor').delete().where('idFornecedor', '=', idFornecedor);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new Fornecedor();
