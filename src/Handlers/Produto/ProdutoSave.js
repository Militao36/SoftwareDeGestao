import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProduto from '../../Validators/Produtos';
import FornecedorRepo from '../../Repositories/Fornecedor';
import { DateTime } from 'luxon';
import { uuid } from '../../Utils/uuid';

class HandleProduto {
    Handler = async (produto, idEmpresa) => {

        const fornecdor = await FornecedorRepo.findByUUID(produto.idFornecedor)

        const Produto = {
            ...produto,
            idEmpresa,
            createAt: DateTime.local().toSQLDate(),
            idFornecedor: fornecdor.idFornecedor || null,
            uuid
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
