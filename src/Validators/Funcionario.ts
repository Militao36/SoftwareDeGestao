import IFuncionario from '../Interfaces/IFuncionario';
import IsEmail from '../Utils/isEmail';

export default (funcionario: IFuncionario) => {
    const erros = [];

    if (!IsEmail(funcionario.email)) {
        erros.push('E-mail incorreto');
    }

    if (!funcionario.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
