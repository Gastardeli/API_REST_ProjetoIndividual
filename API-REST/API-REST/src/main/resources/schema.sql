
CREATE TABLE IF NOT EXISTS peca(
    id UUID PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DOUBLE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) CHECK(tipo IN('novo', 'recondicionado', 'usado')) NOT NULL
);

CREATE TABLE categorias(
    id INT PRIMARY KEY ,
    nome VARCHAR(50)
);

INSERT INTO categorias VALUES
                           (1, 'Ferragem'),
                           (2,'Madeira'),
                           (3,'Serra'),
                           (4,'Outros');