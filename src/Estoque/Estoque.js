import knex from '../Config/conn';

class Estoque {
    async saida(quantidade, uuidProduto) {
        await knex.transaction(async function (trx) {
            try {
                const produto = await trx.table('produto')
                    .select().where('uuid', '=', uuidProduto).first()
                    .transacting(trx)

                const estoque = produto.estoque - quantidade

                await trx.table('produto').update({
                    ...produto, estoque: estoque
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async entrada(quantidade, uuidProduto) {
        await knex.transaction(async (trx) => {
            try {
                const produto = await trx.table('produto')
                    .transacting(trx)
                    .select().where('uuid', '=', uuidProduto).first()
                const estoque = produto.estoque + quantidade

                await trx.table('produto')
                    .transacting(trx)
                    .update({
                        ...produto, estoque: estoque
                    }).where('uuid', '=', uuidProduto)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async desfazerSaida(quantidade, uuidProduto) {
        await knex.transaction(async (trx) => {
            try {
                const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto).first()
                const estoqueAfter = produto.estoque + quantidade

                await trx.table('produto').update({
                    ...produto, estoque: estoqueAfter
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }

    async desfazerEntrada(quantidade, uuidProduto) {
        await knex.transaction(async (trx) => {
            const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto).first()
            const estoqueAfter = produto.estoque - quantidade

            try {
                await trx.table('produto').update({
                    ...produto, estoque: estoqueAfter
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.commit()
            } catch (error) {
                await trx.rollback()
            }
        })
    }
}


export default new Estoque()