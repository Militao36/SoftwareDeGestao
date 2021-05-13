import knex from '../Config/conn';

class TipoPagamento {
    save(tipoPagamento) {
        return knex('tipoPagamento').insert(tipoPagamento);
    }

    update(tipoPagamento) {
        return knex('tipoPagamento').update(tipoPagamento).where('uuid', '=', tipoPagamento.uuid);
    }

    delete(uuid) {
        return knex('tipoPagamento').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('tipoPagamento').select(
            ["uuid", "tipo"]
        ).where('uuid', '=', uuid).first()
    }

    findByIdTipoPagamento(uuid) {
        return knex().table('tipoPagamento').select(
            ["uuid", "idTipoPagamento"]
        ).where('uuid', '=', uuid).first()
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new TipoPagamento();
