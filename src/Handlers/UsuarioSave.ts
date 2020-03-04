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
        // const retorno = await new UsuarioRepo().save(usuario);
        return Number(1);
    }
}

export default new HandleUsuario();
