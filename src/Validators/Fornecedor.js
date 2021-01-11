import { IsEmail } from '../Utils/isEmail';

export default (fornecedor) => {
    const erros = [];

    if (fornecedor.email && !IsEmail(fornecedor.email)) {
        erros.push({
            email: 'E-mail incorreto'
        });
    }

    if (fornecedor.razaoSocial == "") {
        erros.push({
            razaoSocial: 'Este campo não pode ficar em branco',
        });
    }

    if (!fornecedor.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
