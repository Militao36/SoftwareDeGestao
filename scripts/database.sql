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
    nomeStatus varchar(20)
);

create table pedido (
    idPedido int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    idCliente int,
    dataPedido date,
    idStatusPedido int,
    idFuncionario int,
    valorComissao decimal(13,2),
    observacao varchar(30),
    numeroReferencia varchar(20),
    FOREIGN KEY (idFuncionario) REFERENCES funcionario (idFuncionario),
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    FOREIGN KEY (idStatusPedido) REFERENCES statusPedido (idStatusPedido)
);

create table produtoPedido(
    idProdutoPedido int auto_increment primary key,
    uuid varchar(36),
    idEmpresa int,
    idProduto int,
    quantidade int,
    valor decimal(13,2),
    desconto decimal(3,2),
    observacao varchar(40),
    FOREIGN KEY (idProduto) REFERENCES produto (idProduto)
);



