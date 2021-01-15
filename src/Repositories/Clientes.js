import knex from '../Config/conn';

class Clientes {
    save(cliente) {
        return knex('cliente').insert(cliente);
    }

    update(cliente) {
        return knex('cliente').update(cliente).where('uuid', '=', cliente.uuid);
    }

    delete(uuid) {
        return knex('cliente').delete().where('uuid', '=', uuid);
    }

    findById(uuid) {
        return knex('cliente').select(
            ["uuid", "nome", "cpfCnpj", "ie",
                "endereco", "numero", "complemento", "bairro", "cidade", "uf",
                "email", "telefone"]
        ).where('uuid', '=', uuid).first();
    }
    

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new Clientes();
