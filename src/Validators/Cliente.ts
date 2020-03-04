import ICliente from '../Interfaces/ICliente';
import IsEmail from '../Utils/isEmail';

export default (cliente: ICliente) => {
    const erros = [];

    if (!IsEmail(cliente.email)) {
        erros.push('E-mail incorreto');
    }

    if (!cliente.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
