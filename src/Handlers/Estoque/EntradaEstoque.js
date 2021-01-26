import Estoque from '../../Estoque/Estoque';

class HandleEstoque {
    async Handler(quantidade, uuid) {
        try {
            await Estoque.entrada(Number(quantidade), uuid)
            return true
        } catch (error) {
            return false
        }
    }
}

export default new HandleEstoque();
