
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import DuplicataRepo from '../../Repositories/DuplicatasReceber'
import ClienteRepo from '../../Repositories/Clientes'
import TipoPagamentoRepo from '../../Repositories/TipoPagamento'
import FuncionarioRepo from '../../Repositories/Funcionario'
import ValidadorDuplicata from '../../Validators/duplicatasReceber'

class HandleDuplicatasReceber {
    async Handler(duplicatasReceber, idEmpresa) {
        const { idCliente, idTipoPagamento, idFuncionario } = duplicatasReceber

        const [cliente, tipoPamento, funcionario] = await Promise.all([
            await ClienteRepo.buscarFiltro(`select idCliente,uuid from cliente where uuid = '${idCliente}'`),
            await TipoPagamentoRepo.buscarFiltro(`select idTipoPagamento,uuid from tipoPagamento where uuid = '${idTipoPagamento}'`),
            await FuncionarioRepo.buscarFiltro(`select idFuncionario,uuid from funcionario where uuid = '${idFuncionario}'`)
        ])
        
        const duplicata = {
            ...duplicatasReceber, idEmpresa,
            uuid: v4(),
            idCliente: null,
            idTipoPagamento: null,
            idFuncionario: null,
            createAt: DateTime.local().toSQLDate(),
        
        }

        if (cliente[0].length > 0) {
            duplicata.idCliente = cliente[0][0].idCliente
        }

        if (funcionario[0].length > 0) {
            duplicata.idFuncionario = funcionario[0][0].idFuncionario
        }

        if (tipoPamento[0].length > 0) {
            duplicata.idTipoPagamento = tipoPamento[0][0].idTipoPagamento
        }

        const validacoes = ValidadorDuplicata(duplicata);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await DuplicataRepo.save(duplicata)
        return duplicata.uuid
    }
}

export default new HandleDuplicatasReceber();


