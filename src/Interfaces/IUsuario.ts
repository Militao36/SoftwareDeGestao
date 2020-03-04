export default interface IUsuario {
    idUsuario?: number;
    email: string;
    senha: string;
    idEmpresa?: number;
    ativo?: boolean;
    createAt?: string;
    updateAt?: string;
}
