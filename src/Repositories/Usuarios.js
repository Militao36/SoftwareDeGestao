import knex from '../Config/conn';

class Usuarios {
    save(user) {
        return knex('usuario').insert(user);
    }

    update(user) {
        return knex('usuario').update(user).where('idUsuario', '=', user.idUsuario);
    }

    delete(idUsuario) {
        return knex('usuario').delete().where('idUsuario', '=', idUsuario);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Usuarios();
