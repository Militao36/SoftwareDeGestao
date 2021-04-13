import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProduto from '../../Validators/Produtos';
import FornecedorRepo from '../../Repositories/Fornecedor';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

class HandleProduto {
    Handler = async (produto, idEmpresa) => {

        const fornecedor = await FornecedorRepo.findByUUID(produto?.idFornecedor)

        const Produto = {
            ...produto,
            idEmpresa,
            createAt: DateTime.local().toSQLDate(),
            idFornecedor: fornecedor?.idFornecedor ?? null,
            uuid: v4()
        };

        const validacoes = await ValidatorProduto(Produto);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await ProdutoRepo.save(Produto);
        return Produto.uuid
    }
}

export default new HandleProduto();
