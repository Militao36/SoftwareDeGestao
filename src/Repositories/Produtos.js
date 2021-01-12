import knex from '../Config/conn';

class Produtos {
    save(produto) {
        return knex('produto').insert(produto);
    }

    update(produto) {
        return knex('produto').update(produto).where('uuid', '=', produto.uuid);
    }

    delete(uuid) {
        return knex('produto').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('produto').select(
            ["uuid", "codBarras", "nomeProduto", "valor", "estoque",
                "estoqueMin", "idFornecedor"]
        ).where('uuid', '=', uuid).first()
    }

    findByCodBarras(codBarras) {
        return knex('produto').select(
            ["uuid", "codBarras"]
        ).where('codBarras', '=', codBarras);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Produtos();
