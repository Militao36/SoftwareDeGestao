import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProduto from '../../Validators/Produtos';
import FornecedorRepo from '../../Repositories/Fornecedor';
import { DateTime } from 'luxon';

class HandleProduto {
    Handler = async (produto, idEmpresa) => {
        const fornecdor = await FornecedorRepo.findByUUID(produto.idFornecedor)

        const Produto = {
            ...produto, idEmpresa,
            updateAt: DateTime.local().toSQLDate(),
            idFornecedor: fornecdor.idFornecedor || null
        };

        const validacoes = await ValidatorProduto(Produto);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await ProdutoRepo.update(Produto);
        return true;
    }
}

export default new HandleProduto();
