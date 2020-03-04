export default interface IClientes {
    idCliente?: number;
    nome: string;
    cpfCnpj: string;
    ie: string;
    subTributario: boolean;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    email: string;
    telefone: string;
    ativo?: boolean;
    idEmpresa?: number;
    createAt?: string;
    updateAt?: string;
}
