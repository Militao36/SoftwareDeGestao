import UsuarioRepo from '../../Repositories/Usuarios';
import ValidatorUser from '../../Validators/Usuario';
import { DateTime } from 'luxon';

class HandleUsuario {
    Handler = async (user, idEmpresa) => {
        const usuario = { ...user, idEmpresa, createAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorUser(usuario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await UsuarioRepo.save(usuario);
        return Number(retorno[0]);
    }
}

export default new HandleUsuario();
