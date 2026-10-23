-- Script de criação e população do banco loja_discos_db
-- (o mesmo banco também pode ser criado com: npx prisma migrate dev  +  npm run seed)

CREATE DATABASE IF NOT EXISTS loja_discos_db;
USE loja_discos_db;

CREATE TABLE USUARIO (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE DISCO (
    id_disco INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    preco_custo DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT NOT NULL,
    estoque_minimo INT NOT NULL,
    PRIMARY KEY (id_disco)
);

CREATE TABLE MOVIMENTACAO_ESTOQUE (
    id_movimentacao INT NOT NULL AUTO_INCREMENT,
    id_disco INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimentacao VARCHAR(10) NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATE NOT NULL,
    observacao VARCHAR(250) NOT NULL,
    PRIMARY KEY (id_movimentacao),
    FOREIGN KEY (id_disco) REFERENCES DISCO(id_disco),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

INSERT INTO USUARIO (nome, email, senha) VALUES
('Ana Souza', 'ana@loja.com', '123456'),
('Bruno Lima', 'bruno@loja.com', '123456'),
('Carla Mendes', 'carla@loja.com', '123456');

INSERT INTO DISCO (titulo, artista, preco_custo, quantidade_estoque, estoque_minimo) VALUES
('The Dark Side of the Moon', 'Pink Floyd', 89.90, 8, 3),
('Abbey Road', 'The Beatles', 79.90, 2, 3),
('Thriller', 'Michael Jackson', 69.90, 6, 2),
('Clube da Esquina', 'Milton Nascimento', 94.50, 4, 4),
('Dois', 'Legião Urbana', 59.90, 12, 5);

INSERT INTO MOVIMENTACAO_ESTOQUE (id_disco, id_usuario, tipo_movimentacao, quantidade, data_movimentacao, observacao) VALUES
(1, 1, 'entrada', 10, '2026-10-01', 'Compra do fornecedor'),
(1, 2, 'saida', 2, '2026-10-05', 'Venda no balcão'),
(2, 1, 'entrada', 5, '2026-10-02', 'Compra do fornecedor'),
(2, 3, 'saida', 3, '2026-10-08', 'Venda no balcão'),
(3, 2, 'entrada', 6, '2026-10-03', 'Compra do fornecedor'),
(4, 3, 'entrada', 4, '2026-10-04', 'Compra do fornecedor'),
(5, 1, 'entrada', 12, '2026-10-06', 'Compra do fornecedor');
