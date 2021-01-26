import knex from '../Config/conn';
import { v4 } from 'uuid'
import { DateTime } from 'luxon';

class Estoque {
    async saida(quantidade, uuidProduto, ref) {
        await knex.transaction(async function (trx) {
            try {
                const produto = await trx.table('produto')
                    .select().where('uuid', '=', uuidProduto).first()
                    .transacting(trx)

                const estoqueBefore = Number(produto.estoque)
                const estoqueAfter = Number(produto.estoque) - quantidade

                await trx.table('produto')
                    .update({
                        ...produto, estoque: estoqueAfter
                    }).where('uuid', '=', uuidProduto)
                    .transacting(trx)

                await trx.table('movimentacao')
                    .insert({
                        uuid: v4(),
                        tipo: 'saida', quantidade: quantidade,
                        estoqueBefore, estoqueAfter,
                        idProduto: produto.idProduto,
                        ref,
                        createAt: DateTime.local().toSQLDate()
                    }).transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async entrada(quantidade, uuidProduto, ref) {
        await knex.transaction(async (trx) => {
            try {

                const produto = await trx.table('produto')
                    .transacting(trx)
                    .select().where('uuid', '=', uuidProduto).first()

                const estoqueBefore = Number(produto.estoque)
                const estoqueAfter = Number(produto.estoque) + quantidade

                await trx.table('produto')
                    .transacting(trx)
                    .update({
                        ...produto, estoque: estoqueAfter
                    }).where('uuid', '=', uuidProduto)


                await trx.table('movimentacao')
                    .insert({
                        uuid: v4(),
                        tipo: 'entrada', quantidade: quantidade,
                        estoqueBefore, estoqueAfter,
                        idProduto: produto.idProduto,
                        ref,
                        createAt: DateTime.local().toSQLDate()
                    }).transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async desfazerSaida(quantidade, uuidProduto, ref) {
        await knex.transaction(async (trx) => {
            try {
                const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto).first()
                const estoqueAfter = produto.estoque + quantidade

                await trx.table('produto').update({
                    ...produto, estoque: estoqueAfter
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.table('movimentacao')
                    .delete()
                    .where('ref', '=', ref)
                    .andWhere('idProduto', '=', produto.idProduto)
                    .transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async desfazerEntrada(quantidade, uuidProduto, ref) {
        await knex.transaction(async (trx) => {
            try {
                const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto).first()
                const estoqueAfter = produto.estoque - quantidade

                await trx.table('produto')
                    .update({
                        ...produto, estoque: estoqueAfter
                    }).where('uuid', '=', uuidProduto)
                    .transacting(trx)

                await trx.table('movimentacao')
                    .delete()
                    .where('ref', '=', ref)
                    .transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }
}


export default new Estoque()