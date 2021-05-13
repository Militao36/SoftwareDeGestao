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

    findById(uuid) {
        return knex("duplicatasReceber")
            .select([
                'duplicatasReceber.uuid', 'numeroDuplicata', 'cliente.uuid as idCliente',
                'tipopagamento.uuid as idTipoPagamento', 'funcionario.uuid as idFuncionario',
                'duplicatasReceber.comissao', 'dataEmissao', 'dataVencimento', 'dataPagamento', 'valorTotal', 'valorPago',
                'valorDevedor', 'duplicatasReceber.observacao'
            ]).where("duplicatasReceber.uuid", "=", uuid)
            .innerJoin("tipopagamento", "duplicatasReceber.idTipoPagamento", "=", "tipopagamento.idTipoPagamento")
            .innerJoin("cliente", "duplicatasReceber.idCliente", "=", "cliente.idCliente")
            .leftJoin("funcionario", "duplicatasReceber.idFuncionario", "=", "funcionario.idFuncionario")

    }

    buscarFiltro(sql) {
        return knex.raw(sql);
    }
}

export default new DuplicatasReceber();
