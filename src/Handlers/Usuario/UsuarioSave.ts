import IUsuario from '../../Interfaces/IUsuario';
import UsuarioRepo from '../../Repositories/Usuarios';

import ValidatorUser from '../../Validators/Usuario';

import { DateTime } from 'luxon';

class HandleUsuario {
    Handler = async (user: IUsuario, idEmpresa: number) => {
        const usuario = { ...user, idEmpresa, ativo: false, createAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorUser(usuario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await UsuarioRepo.save(usuario);
        return Number(retorno[0]);
    }
}

export default new HandleUsuario();
