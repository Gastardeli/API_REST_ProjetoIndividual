# Sistema de Cadastro de Peças

Sistema web para cadastro e gerenciamento de peças, desenvolvido com **Java + Spring Boot** no backend e **HTML, CSS e JavaScript** no frontend.

O sistema permite cadastrar peças contendo:

* Nome
* Preço
* Descrição
* Data de entrada
* Categoria
* Condição da peça

O backend disponibiliza uma API REST para comunicação com o frontend e utiliza o **H2 Database** para armazenamento dos dados.

---

## Tecnologias utilizadas

### Backend

* Java
* Spring Boot
* Spring Web
* Spring JDBC
* H2 Database
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Comunicação

* API REST
* JSON
* CORS

---

# Estrutura do projeto

```text
projeto/
│
├── Backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── ...
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
└── FrontEnd/
    ├── index.html
    ├── main.js
    └── style.css
```

A estrutura pode variar dependendo da organização do projeto.

---

# 1. Pré-requisitos

Antes de executar o projeto, instale:

* **Java JDK**
* **Maven**
* **Node.js** (necessário para utilizar o servidor do frontend com Live Server ou Express)
* Um navegador
* Uma IDE, como IntelliJ IDEA, Eclipse ou VS Code

Verifique as instalações:

```bash
java -version
```

```bash
mvn -version
```

```bash
node -version
```

---

# 2. Clonando o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd nome-do-projeto
```

---

# 3. Configuração do Backend

O backend foi desenvolvido utilizando Spring Boot.

Entre na pasta do backend:

```bash
cd Backend
```

Instale as dependências do projeto:

```bash
mvn install
```

Ou execute diretamente:

```bash
mvn spring-boot:run
```

Também é possível executar a classe principal do Spring Boot diretamente pela IDE.

Quando o backend estiver funcionando, a API estará disponível em:

```text
http://localhost:8080
```

---

# 4. Configuração do banco H2

O projeto utiliza o **H2 Database**.

A configuração do banco deve estar no arquivo:

```text
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:h2:file:./data/meubanco
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

> Os valores podem ser diferentes dependendo da configuração utilizada no projeto.

---

# 5. Acessando o H2 Console

Com o Spring Boot executando, abra no navegador:

```text
http://localhost:8080/h2-console
```

Na tela de login, utilize a mesma configuração definida no `application.properties`.

Exemplo:

```text
JDBC URL:
jdbc:h2:file:./data/meubanco

User Name:
sa

Password:
```

Caso esteja utilizando banco em memória, a URL pode ser:

```text
jdbc:h2:mem:testdb
```

---

# 6. Estrutura da tabela

A tabela principal utilizada pelo sistema é `peca`.

Exemplo:

```sql
CREATE TABLE IF NOT EXISTS peca (
    id UUID PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DOUBLE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo VARCHAR(20)
        CHECK(tipo IN ('novo', 'recondicionado', 'usado'))
        NOT NULL
);
```

Para verificar os registros cadastrados:

```sql
SELECT * FROM peca;
```

---

# 7. CORS

Como o frontend e o backend são executados em portas diferentes, é necessário permitir a comunicação entre eles.

Por exemplo:

```text
Frontend → http://127.0.0.1:5500
Backend  → http://localhost:8080
```

O Spring Boot pode permitir essa origem através do `@CrossOrigin`:

```java
@CrossOrigin(origins = "http://127.0.0.1:5500")
```

Exemplo:

```java
@RestController
@RequestMapping("/pecas")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PecaController {

}
```

Isso permite que o frontend faça requisições para a API.

> Se o frontend for executado por outro endereço ou porta, a origem precisa ser alterada.

---

# 8. CORS no Node.js

Caso o projeto utilize um servidor Node/Express para o frontend, instale o CORS:

```bash
npm install cors
```

Também pode ser necessário instalar o Express:

```bash
npm install express
```

Exemplo de configuração:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
```

Porém, é importante entender que existem **dois lados diferentes**:

* O CORS do Spring controla quem pode acessar a API.
* O CORS do Express controla requisições feitas ao servidor Express.

Para este projeto, o mais importante para o `fetch` do frontend para o Spring é a configuração do **Spring Boot**.

---

# 9. Executando o Frontend

Entre na pasta do frontend:

```bash
cd FrontEnd
```

O frontend pode ser executado utilizando o **Live Server** do VS Code.

Ao iniciar o Live Server, normalmente será utilizado:

```text
http://127.0.0.1:5500
```

Certifique-se de que esse endereço corresponde ao endereço permitido no `@CrossOrigin`.

---

# 10. Comunicação com a API

O frontend utiliza `fetch()` para realizar as requisições.

### Buscar peças

```text
GET http://localhost:8080/pecas
```

### Cadastrar peça

```text
POST http://localhost:8080/pecas
```

O cadastro envia um JSON semelhante a:

```json
{
    "nome": "Martelo",
    "preco": 50.50,
    "descricao": "Martelo de ferro",
    "data": "2026-09-05",
    "categoria": "Ferragem",
    "tipo": "novo"
}
```

---

# 11. Campos enviados

O JSON precisa utilizar os mesmos nomes esperados pela classe `Peca`.

| Frontend     | JSON        | Java        | Banco       |
| ------------ | ----------- | ----------- | ----------- |
| Nome da peça | `nome`      | `nome`      | `nome`      |
| Valor        | `preco`     | `preco`     | `preco`     |
| Descrição    | `descricao` | `descricao` | `descricao` |
| Data         | `data`      | `data`      | `data`      |
| Categoria    | `categoria` | `categoria` | `categoria` |
| Condição     | `tipo`      | `tipo`      | `tipo`      |

A classe `Peca` possui:

```java
private UUID id;
private String nome;
private Double preco;
private String descricao;
private Date data;
private String categoria;
private Tipo tipo;
```

O `id` não precisa ser enviado pelo frontend, pois ele é gerado pelo backend.

---

# 12. Categorias

As categorias utilizadas pelo formulário são:

```text
Ferragem
Madeira
Serra
Outros
```

Exemplo:

```html
<option value="Ferragem">Ferragem</option>
<option value="Madeira">Madeira</option>
<option value="Serra">Serra</option>
<option value="outros">Outros</option>
```

---

# 13. Condição da peça

A condição é enviada no campo `tipo`.

Valores permitidos:

```text
novo
usado
recondicionado
```

Exemplo:

```html
<input type="radio" name="condicao" value="novo">
<input type="radio" name="condicao" value="usado">
<input type="radio" name="condicao" value="recondicionado">
```

O valor selecionado deve ser enviado no JSON:

```json
{
    "tipo": "novo"
}
```

---

# 14. Controller

O endpoint principal é:

```text
/pecas
```

### GET

Retorna todas as peças cadastradas:

```text
GET /pecas
```

### POST

Cadastra uma nova peça:

```text
POST /pecas
```

O backend gera automaticamente um UUID para a peça:

```java
UUID novoId = UUID.randomUUID();
```

Depois realiza o INSERT no banco.

---

# 15. Testando a API

Com o backend executando, você pode testar:

```text
GET http://localhost:8080/pecas
```

No navegador, uma requisição GET deve retornar os registros cadastrados.

Para testar o POST, pode ser utilizado:

* Postman
* Insomnia
* Thunder Client
* O próprio frontend

Exemplo de JSON:

```json
{
    "nome": "Serra Circular",
    "preco": 250.00,
    "descricao": "Serra circular usada",
    "data": "2026-09-05",
    "categoria": "Serra",
    "tipo": "usado"
}
```

---

# 16. Ordem correta para executar o projeto

Para evitar problemas de conexão:

### 1. Inicie o Backend

```bash
mvn spring-boot:run
```

Verifique:

```text
http://localhost:8080
```

### 2. Verifique o banco

Abra:

```text
http://localhost:8080/h2-console
```

### 3. Inicie o Frontend

Abra o projeto pelo Live Server.

Exemplo:

```text
http://127.0.0.1:5500
```

### 4. Faça um cadastro

Preencha:

```text
Nome
Valor
Descrição
Data
Categoria
Condição
```

Clique em:

```text
CADASTRAR
```

O frontend enviará um `POST` para:

```text
http://localhost:8080/pecas
```

O Spring processará os dados e salvará no H2.

---

# 17. Problemas comuns

## Erro 400 Bad Request

Normalmente significa que o Spring não conseguiu interpretar os dados enviados.

Verifique principalmente:

```text
preco
categoria
tipo
data
```

O JSON deve utilizar os nomes esperados pela classe `Peca`.

---

## Erro 500 Internal Server Error

Significa que ocorreu um erro dentro do backend.

Verifique o console do Spring Boot.

Um exemplo comum é:

```java
peca.getTipo().name()
```

quando `tipo` está `null`.

Nesse caso, certifique-se de que o frontend está enviando:

```json
"tipo": "novo"
```

---

## Erro de CORS

Se aparecer uma mensagem relacionada a:

```text
Access-Control-Allow-Origin
```

verifique se a origem do frontend corresponde à configuração:

```java
@CrossOrigin(origins = "http://127.0.0.1:5500")
```

Por exemplo, estas origens são diferentes:

```text
http://127.0.0.1:5500
http://localhost:5500
```

Se o navegador estiver utilizando uma delas e o backend permitir somente a outra, o CORS poderá bloquear a requisição.

---

## H2 não abre

Verifique se o Spring Boot está executando e se estas propriedades estão configuradas:

```properties
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

Depois acesse:

```text
http://localhost:8080/h2-console
```

---

# 18. Fluxo do sistema

```text
┌─────────────────┐
│    Frontend     │
│ HTML/CSS/JS     │
└────────┬────────┘
         │
         │ Fetch / JSON
         ▼
┌─────────────────┐
│   Spring Boot   │
│   Controller    │
└────────┬────────┘
         │
         │ JdbcTemplate
         ▼
┌─────────────────┐
│   H2 Database   │
│      peca       │
└─────────────────┘
```

O frontend coleta os dados do formulário, transforma os valores em JSON e envia para a API.

O Controller recebe o JSON, transforma os dados em um objeto `Peca` e utiliza o `JdbcTemplate` para realizar a operação no banco.

---

# 19. Resumo rápido

Para executar:

```bash
# Backend
cd Backend
mvn spring-boot:run
```

Depois:

```text
H2:
http://localhost:8080/h2-console
```

E execute o frontend pelo Live Server:

```text
http://127.0.0.1:5500
```

API:

```text
GET  http://localhost:8080/pecas
POST http://localhost:8080/pecas
```

---

## Autor

Projeto desenvolvido para fins acadêmicos.
