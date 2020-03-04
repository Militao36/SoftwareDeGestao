create database optica;

use optica;

create table usuario(
    idUsuario int auto_increment primary key,
    email varchar(100) not null,
    senha varchar(150) not null,
    idEmpresa int,
    createAt: date,
    updateAt: date,
);


create table cliente(
    idCliente int auto_increment primary key,
    nome varchar(100),
    cpfCnpj varchar(25),
    ie varchar(25),
    subTributario boolean,
    endereco varchar(100),
    numero varchar(10),
    complemento varchar(50),
    bairro varchar(50),
    cidade varchar(50),
    estado varchar(2),
    email varchar(100),
    telefone varchar(11),
    ativo boolean,
    createAt date,
    updateAt date
);

