import knex from '../Config/conn';

class Funcionario {
    save(funcionario) {
        return knex('funcionario').insert(funcionario);
    }

    update(funcionario) {
        return knex('funcionario').update(funcionario).where('idFuncionario', '=', funcionario.idFuncionario);
    }

    delete(idFuncionario) {
        return knex('funcionario').delete().where('idFuncionario', '=', idFuncionario);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Funcionario();
