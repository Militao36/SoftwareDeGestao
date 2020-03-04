import IUsuario from '../Interfaces/IUsuario';
import UsuarioRepo from '../Repositories/Usuarios';

import ValidatorUser from '../Validators/Usuario';

class HandleUsuario {
    Handler = async (user: IUsuario, idEmpresa: number) => {
        const usuario = { ...user, idEmpresa };

        const validacoes = ValidatorUser(usuario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await UsuarioRepo.save(usuario);
        return Number(retorno[0]);
    }
}

export default new HandleUsuario();
