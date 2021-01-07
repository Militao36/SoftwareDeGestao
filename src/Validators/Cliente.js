import { IsEmail } from '../Utils/isEmail';

export default (cliente) => {
    const erros = [];

    if (cliente.nome == '') {
        erros.push({
            nome: 'O campo nome não pode ficar em branco.'
        })
    }

    if (cliente.email && !IsEmail(cliente.email)) {
        erros.push({
            email: 'E-mail incorreto'
        });
    }

    if (!cliente.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
