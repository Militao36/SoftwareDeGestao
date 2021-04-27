drop database optica;

create database optica;

use optica;

create table usuario(
    idUsuario int auto_increment primary key,
    email varchar(100) not null,
    senha varchar(150) not null,
    idEmpresa int,
    createAt date,
    updateAt date
);

create table cliente(
    idCliente int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    nome varchar(100),
    cpfCnpj varchar(18),
    ie varchar(25),
    subTributario boolean,
    endereco varchar(100),
    numero varchar(10),
    complemento varchar(50),
    bairro varchar(50),
    cidade varchar(50),
    uf varchar(2),
    email varchar(100),
    telefone varchar(15),
    ativo boolean,
    createAt date,
    updateAt date
);

CREATE TABLE fornecedor(
    idFornecedor int AUTO_INCREMENT PRIMARY KEY,
    uuid varchar(36),
    idEmpresa int,
    razaoSocial varchar(150),
    nomeFantasia varchar(150),
    logradouro varchar(150),
    numero varchar(20),
    complemento varchar(100),
    bairro varchar(100),
    cep varchar(10),
    cidade varchar(100),
    uf varchar(2),
    telefone varchar(20),
    celular varchar(20),
    cnpjCpf varchar(20),
    ie varchar(20),
    email varchar(50),
    createAt date,
    updateAt date
);

create table produto(
    idProduto int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    codBarras varchar(150),
    nomeProduto varchar(100),
    valor decimal(13,2),
    estoque int,
    estoqueMin int,
    idFornecedor int,
    createAt date,
    updateAt date,
    FOREIGN KEY (idFornecedor) REFERENCES fornecedor (idFornecedor)
);

create table movimentacao(
    idMovimentacao int auto_increment primary key,
    uuid varchar(36),
    idProduto int,
    tipo enum('saida','entrada','ajuste'),
    quantidade int,
    estoqueBefore int,
    estoqueAfter int,
    ref varchar(36),
    updateAt date,
    createAt date,
    FOREIGN KEY (idProduto) REFERENCES produto (idProduto)
);

CREATE TABLE funcionario(
    idFuncionario int AUTO_INCREMENT PRIMARY KEY,
    uuid varchar(36),
    idEmpresa int,
    nome varchar(150) NOT NULL,
    cpf varchar(20),
    rg varchar(15),
    logradouro varchar(150),
    numero varchar(20),
    complemento varchar(100),
    bairro varchar(100),
    cidade varchar(100),
    uf varchar(2),
    cep varchar(15),
    telefone varchar(20),
    celular varchar(20),
    email varchar(100),
    observacao varchar(100),
    salario decimal(13,2),
    dataAdmissao date,
    comissao decimal(13,2),
    diaPagamento int,
    dataDemissao date,
    createAt date,
    updateAt date
);

create table statusPedido(
    idStatusPedido int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    nomeStatus varchar(20),
    createAt date,
    updateAt date
);

create table pedido (
    idPedido int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    idCliente int,
    dataPedido date,
    idStatusPedido int,
    idFuncionario int,
    observacao varchar(30),
    createAt date,
    updateAt date,
    FOREIGN KEY (idFuncionario) REFERENCES funcionario (idFuncionario),
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    FOREIGN KEY (idStatusPedido) REFERENCES statusPedido (idStatusPedido)
);

create table produtoPedido(
    idProdutoPedido int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    idProduto int,
    idPedido int,
    quantidade int,
    valor decimal(13,2),
    desconto decimal(13,2),
    observacao varchar(40),
    createAt date,
    updateAt date,
    FOREIGN KEY (idProduto) REFERENCES produto (idProduto),
    FOREIGN KEY (idPedido) REFERENCES pedido (idPedido)
);

CREATE VIEW lis_pedido
AS SELECT 
p.uuid,
p.idEmpresa,
p.observacao,
DATE_FORMAT(p.dataPedido ,'%Y-%m-%d') as dataPedido,
c.uuid as uuidCliente,
f.uuid as uuidFuncionario,
s.uuid as uuidStatus,
c.nome as nomeCliente,
f.nome as nomeFuncionario,
s.nomeStatus
FROM pedido p
INNER JOIN cliente c
ON p.idCliente = c.idCliente 
INNER JOIN statusPedido s 
ON p.idStatusPedido = s.idStatusPedido 
LEFT JOIN funcionario f on p.idFuncionario = f.idFuncionario;


CREATE VIEW lis_produto_pedido
AS SELECT 
produtoP.idEmpresa,
produtoP.uuid,
produtoP.quantidade,
produtoP.valor,
p.nomeProduto,
p.uuid as uuidProduto,
pd.uuid as uuidPedido
FROM produtoPedido produtoP
INNER JOIN produto p
ON produtoP.idProduto = p.idProduto
INNER JOIN pedido pd 
on produtoP.idPedido = pd.idPedido


create table tipoPagamento( 
    idTipoPagamento int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    tipo varchar(20),
    createAt date,
    updateAt date
);

create table caixa(
    idCaixa int auto_increment primary key,
    idEmpresa int,
    uuid varchar(36),
    idTipoPagamento int,
    tipo enum('entrada','saida','sangria','ajuste'),
    valor decimal(13,2),
    descricao varchar(50),
    createAt date,
    updateAt date,
    FOREIGN KEY (idTipoPagamento) REFERENCES tipoPagamento (idTipoPagamento)
);


CREATE VIEW lis_caixa
AS SELECT 
c.uuid as uuid,
c.idEmpresa,
c.tipo,
c.valor,
c.descricao,
tP.uuid as idTipoPagamento,
tP.tipo as tipoPagamento
FROM caixa c
INNER JOIN tipopagamento tP
ON c.idTipoPagamento  = tP.idTipoPagamento;


create table duplicatasReceber(
    idDuplicata int auto_increment primary key,
    numeroDuplicata varchar(10),
    idCliente int,
    idTipoPagamento int,
    idFuncionario int,
    comissao decimal(13,2),
    dataEmissao date,
    dataVencimento date,
    dataPagamento date,
    valorTotal decimal(13,2),
    valorDevedor decimal(13,2),
    observacao varchar(50),
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    FOREIGN KEY (idTipoPagamento) REFERENCES tipoPagamento (idTipoPagamento),
    FOREIGN KEY (idFuncionario) REFERENCES funcionario (idFuncionario)
);
