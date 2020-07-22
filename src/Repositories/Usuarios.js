import knex from '../Config/conn';

class Usuarios {
    save = async (user) => {
        return await knex('usuario').insert(user);
    }

    update = async (user) => {
        return await knex('usuario').update(user).where('idUsuario', '=', user.idUsuario );
    }

    delete = async (idUsuario) => {
        return await knex('usuario').delete().where('idUsuario', '=', idUsuario);
    }

    buscarFiltro = async (sql) => {
        return await knex.raw(sql);
    }
}

export default new Usuarios();
