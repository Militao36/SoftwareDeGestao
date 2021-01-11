import { IsEmail } from '../Utils/isEmail';

export default (funcionario) => {
    const erros = [];

    if (funcionario.email !== '' & !IsEmail(funcionario.email)) {
        erros.push({
            email: 'E-mail incorreto'
        });
    }

    if (!funcionario.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
