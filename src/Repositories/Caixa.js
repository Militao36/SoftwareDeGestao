import knex from '../Config/conn';

class Caixa {
    save(caixa) {
        return knex('caixa').insert(caixa);
    }

    update(caixa) {
        return knex('caixa').update(caixa).where('uuid', '=', caixa.uuid);
    }

    delete(uuid) {
        return knex('caixa')
            .delete()
            .where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('lis_caixa')
            .select(['idTipoPagamento', 'tipo', 'valor', 'descricao', 'uuid'])
            .where('uuid', '=', uuid).first();
    }


    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Caixa();
