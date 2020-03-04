import IUsuario from '../Interfaces/IUsuario';
import IsEmail from '../Utils/isEmail';

export default (user: IUsuario) => {
    const erros = [];

    if (!IsEmail(user.email)) {
        erros.push('E-mail incorreto');
    }

    if (user.senha.length < 6) {
        erros.push('A senha deve conter no minimo 6 caracteres');
    }

    if (!user.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
