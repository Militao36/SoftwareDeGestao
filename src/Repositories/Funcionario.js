import knex from '../Config/conn';

class Funcionario {
    save = async (funcionario) => {
        return await knex('funcionario').insert(funcionario);
    }

    update = async (funcionario) => {
        return await knex('funcionario').update(funcionario).where('idFuncionario', '=', funcionario.idFuncionario);
    }

    delete = async (idFuncionario) => {
        return await knex('funcionario').delete().where('idFuncionario', '=', idFuncionario);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new Funcionario();
