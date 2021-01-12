import knex from '../Config/conn';
import { uuid } from '../Utils/uuid'


// Beferore -  estoque antes da movimentacao
// After - estoque depois da movimentacao 

class Estoque {
    async saida(quantidade, uuidProduto) {
        await knex.transaction(async (trx) => {
            const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto)
            const estoqueBefore = Number(produto.estoque)
            const estoqueAfter = (Number(produto.estoque)) - quantidade


            try {
                await trx.table('produto').update({
                    ...produto, estoque: estoqueAfter
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.table('movimentacao').insert({
                    uuid, tipo: 'saida', quantidade: quantidade, estoqueBefore, estoqueAfter,
                }).transacting(trx)

                trx.commit()
            } catch (error) {
                trx.rollback()
            }
        })
    }

    async entrada(quantidade, uuidProduto) {
        await knex.transaction(async (trx) => {
            const produto = await trx.table('produto').select().where('uuid', '=', uuidProduto)
            const estoqueBefore = Number(produto.estoque)
            const estoqueAfter = (Number(produto.estoque)) + quantidade

            try {
                await trx.table('produto').update({
                    ...produto, estoque: estoqueAfter
                }).where('uuid', '=', uuidProduto).transacting(trx)

                await trx.table('movimentacao').insert({
                    uuid, tipo: 'entrada', quantidade: quantidade, estoqueBefore, estoqueAfter,
                }).transacting(trx)

                trx.commit()
            } catch (error) {
                trx.rollback()
            }
        })
    }
}


export default new Estoque()