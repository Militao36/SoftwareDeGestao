import knex from '../Config/conn';

class Fornecedor {
    save(fornecedor) {
        return knex('fornecedor').insert(fornecedor);
    }

    update(fornecedor) {
        return knex('fornecedor').update(fornecedor).where('uuid', '=', fornecedor.uuid);
    }

    delete(uuid) {
        return knex('fornecedor').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('fornecedor').select(
            ["uuid", "razaoSocial", "nomeFantasia", "logradouro",
                "numero", "complemento", "bairro", "cep", "cidade", "uf",
                "telefone", "celular", "cnpjCpf", "ie", "email"]
        ).where('uuid', '=', uuid);
    }

    findByIdFornecedor(idFornecedor) {
        return knex('fornecedor').select(
            ["idFornecedor", "uuid"]
        ).where('idFornecedor', '=', idFornecedor).first();
    }

    findByUUID(uuid) {
        return knex('fornecedor').select(
            ["uuid", "idFornecedor"]
        ).where('uuid', '=', uuid).first();
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Fornecedor();
