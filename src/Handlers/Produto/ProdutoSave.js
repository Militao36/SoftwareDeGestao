import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProduto from '../../Validators/Produtos';
import { DateTime } from 'luxon';

class HandleProduto {
    Handler = async (produto, idEmpresa) => {
        const Produto = { ...produto, idEmpresa, createAt: DateTime.local().toSQLDate() };

        const validacoes = await ValidatorProduto(Produto);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await ProdutoRepo.save(Produto);
        return Number(retorno[0]);
    }
}

export default new HandleProduto();
