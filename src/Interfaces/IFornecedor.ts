export default interface IFornecedor {
    idFornecedor?: number;
    idEmpresa?: number;
    razaoSocial: string;
    nomeFantasia: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    telefone: string;
    celular: string;
    cnpjCpf: string;
    ie: string;
    email: string;
    createAt?: string;
    updateAt?: string;
}
