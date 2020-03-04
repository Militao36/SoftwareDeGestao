import IUsuario from '../../Interfaces/IUsuario';
import UsuarioRepo from '../../Repositories/Usuarios';

import ValidatorUser from '../../Validators/Usuario';
import { DateTime } from 'luxon';

class HandleUsuario {
    Handler = async (user: IUsuario, idEmpresa: number) => {
        const usuario = { ...user, idEmpresa, updateAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorUser(usuario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await UsuarioRepo.update(usuario);
        return true;
    }
}

export default new HandleUsuario();
