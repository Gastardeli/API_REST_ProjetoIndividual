
CREATE TABLE IF NOT EXISTS peca(
    id UUID PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DOUBLE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) CHECK(tipo IN('novo', 'recondicionado', 'usado')) NOT NULL
);