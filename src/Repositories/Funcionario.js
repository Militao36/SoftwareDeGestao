import knex from '../Config/conn';

class Funcionario {
    save(funcionario) {
        return knex('funcionario').insert(funcionario);
    }

    update(funcionario) {
        return knex('funcionario').update(funcionario).where('uuid', '=', funcionario.uuid);
    }

    delete(uuid) {
        return knex('funcionario').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('funcionario').select(
            ["uuid", "nome", "cpf", "rg", 
            "logradouro", "numero", "complemento", 
            "bairro", "cidade", "uf", "cep", "telefone", 
            "celular", "email", "observacao", "salario", 
            "dataAdmissao", "comissao", "diaPagamento", "dataDemissao"]
        ).where('uuid', '=', uuid);
    }


    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Funcionario();
