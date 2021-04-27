import knex from "../Config/conn";

class DuplicatasReceber {
    save(duplicatas) {
        return knex("duplicatasReceber").insert(duplicatas);
    }

    update(duplicatas) {
        return knex("duplicatasReceber").update(duplicatas).where("uuid", "=", duplicatas.uuid);
    }

    delete(uuid) {
        return knex("duplicatasReceber").delete().where("uuid", "=", uuid);
    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new DuplicatasReceber();
