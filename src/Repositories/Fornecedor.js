import knex from '../Config/conn';

class Fornecedor {
    save(fornecedor) {
        return knex('fornecedor').insert(fornecedor);
    }

    update(fornecedor) {
        return knex('fornecedor').update(fornecedor).where('idFornecedor', '=', fornecedor.idFornecedor);
    }

    delete(idFornecedor) {
        return knex('fornecedor').delete().where('idFornecedor', '=', idFornecedor);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Fornecedor();
