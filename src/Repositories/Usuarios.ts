import knex from '../Config/conn';
import IUsuario from '../Interfaces/IUsuario';

class Usuarios {
    save = async (user: IUsuario) => {
        return await knex('usuario').insert(user);
    }

    update = async (user: IUsuario) => {
        return await knex('usuario').update(user).where('idUsuario', '=', user.idUsuario  as number);
    }

    delete = async (idUsuario: number) => {
        return await knex('usuario').delete().where('idUsuario', '=', idUsuario);
    }

    buscarFiltro = async (sql: string) => {
        return await knex.raw(sql);
    }
}

export default new Usuarios();
