import Estoque from '../../Estoque/Estoque';

class HandleEstoque {
    async Handler(quantidade, uuid) {
        try {
            await Estoque.entrada(quantidade, uuid)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default new HandleEstoque();
