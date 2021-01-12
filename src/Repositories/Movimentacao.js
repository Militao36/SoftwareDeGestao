import knex from '../Config/conn';

class Movimentacao {
    save(mov) {
        return knex('movimentacao').insert(mov);
    }

    update(mov) {
        return knex('movimentacao').update(mov).where('uuid', '=', mov.uuid);
    }

    delete(uuid) {
        return knex('movimentacao').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('movimentacao').select(
            ["uuid", "tipo", "quantidade", "estoqueBefore", "estoqueAfter"]
        ).where('uuid', '=', uuid).first()
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Movimentacao();
