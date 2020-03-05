import IFornecedor from '../Interfaces/IFornecedor';
import IsEmail from '../Utils/isEmail';

export default (forncedor: IFornecedor) => {
    const erros = [];

    if (!IsEmail(forncedor.email)) {
        erros.push('E-mail incorreto');
    }

    if (!forncedor.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
