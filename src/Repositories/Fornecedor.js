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

    findById(idFornecedor) {
        return knex('fornecedor').select(
            ["idFornecedor", "razaoSocial", "nomeFantasia", "logradouro",
                "numero", "complemento", "bairro", "cep", "cidade", "uf",
                "telefone", "celular", "cnpjCpf", "ie", "email"]
        ).where('idFornecedor', '=', idFornecedor);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Fornecedor();
