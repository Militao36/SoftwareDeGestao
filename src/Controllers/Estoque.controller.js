import HandleEstoqueEntrada from '../Handlers/Estoque/EntradaEstoque';
import HandleEstoqueSaida from '../Handlers/Estoque/SaidaEstoque';

class EstoqueController {
    async entradaProduto(req, res) {
        const { uuid, quantidade } = req.body
        const result = await HandleEstoqueEntrada.Handler(quantidade, uuid)

        if (result)
            return res.status(204).json({})

        return res.status(500).json({
            error: 'Ocorreu um erro ao da entrada no produto'
        })
    }

    async saidaProduto(req, res) {
        const { uuid, quantidade } = req.body

        const result = await HandleEstoqueSaida.Handler(quantidade, uuid)
        if (result)
            return res.status(204).json({})

        return res.status(500).json({
            error: 'Ocorreu um erro ao da entrada no produto'
        })
    }
}

export default EstoqueController