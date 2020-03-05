import knex from '../Config/conn';
import IFuncionario from '../Interfaces/IFuncionario';

class Funcionario {
    save = async (funcionario: IFuncionario) => {
        return await knex('funcionario').insert(funcionario);
    }

    update = async (funcionario: IFuncionario) => {
        return await knex('funcionario').update(funcionario).where('idFuncionario', '=', funcionario.idFuncionario);
    }

    delete = async (idFuncionario: number) => {
        return await knex('funcionario').delete().where('idFuncionario', '=', idFuncionario);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Funcionario();
