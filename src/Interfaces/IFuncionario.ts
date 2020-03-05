export default interface IFuncionario {
    idFuncionario?: number;
    idEmpresa?: number;
    nome: string;
    cpf: string;
    rg: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telefone: string;
    celular: string;
    email: string;
    observacao: string;
    salario: string;
    dataAdmissao: string;
    comissao: string;
    diaPagamento: number;
    dataDemissao: string;
    createAt?: string;
    updateAt?: string;
}
