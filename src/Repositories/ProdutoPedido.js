import knex from '../Config/conn';

class ProdutoPedido {
    save(produtoPedido) {
        return knex('produtoPedido').insert(produtoPedido);
    }

    update(produtoPedido) {
        return knex('produtoPedido').update(produtoPedido).where('uuid', '=', produtoPedido.uuid);
    }

    delete(uuid) {
        return knex('produtoPedido').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        console.log(knex('produtoPedido').select().where('uuid', '=', uuid).first().toQuery());
        return knex('produtoPedido').select().where('uuid', '=', uuid).first();
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new ProdutoPedido();
