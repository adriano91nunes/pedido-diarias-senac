Markdown
# Pedido de Diárias em Órgãos Públicos - API 🏛️

API desenvolvida em **NestJS** para automação, gestão e cálculo automatizado de diárias para servidores públicos, integrada a um banco de dados relacional e otimizada com critérios avançados de segurança e performance.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

* **Framework:** [NestJS](https://nestjs.org/) (Arquitetura Modular)
* **Linguagem:** [TypeScript](https://www.typescript.org/) (Tipagem Estática Segura)
* **ORM:** [Prisma](https://www.prisma.io/) (Mapeamento Objeto-Relacional)
* **Banco de Dados:** SQLite (Persistência Relacional Local)
* **Documentação:** Swagger UI (OpenAPI)
* **Segurança:** Helmet & NestJS Throttler
* **Performance:** Cache Manager (Cache em Memória RAM)

---

## 🏗️ Modelagem Relacional ($1:N$)

A API conta com persistência real de dados estruturada em duas entidades principais:
1. **Servidor:** Armazena dados do servidor público (Matrícula, Nome e Cargo).
2. **Diaria:** Registra as diárias associadas, calculando os valores dinamicamente e vinculando-se obrigatoriamente a um `Servidor` existente através de Chave Estrangeira (`servidorId`).

---

## 🛡️ Soluções de Segurança Implementadas (Conceito A)

1. **Rate Limiting:** Proteção contra ataques de força bruta e DoS via `@nestjs/throttler`, limitando requisições massivas por IP (máximo de 10 requisições a cada 60 segundos).
2. **Cabeçalhos HTTP Protetores:** Integração com `helmet` para blindagem automática contra vulnerabilidades web comuns (*XSS*, *Clickjacking*, *MIME-sniffing*).
3. **CORS Ativado:** Controle estrito de restrição de origens para requisições externas.
4. **Sanitização de Dados (Whitelist):** Uso do `ValidationPipe` global com a propriedade `whitelist: true`, descartando qualquer propriedade maliciosa enviada no JSON que não pertença ao DTO.
5. **Isolamento de Credenciais:** Configuração de variáveis de ambiente via arquivo `.env`, devidamente protegido no `.gitignore` para evitar vazamento de dados de infraestrutura.

---

## ⚡ Soluções de Performance Implementadas

1. **Paginação de Dados:** O endpoint de listagem de diárias aceita os parâmetros `page` e `limit`, realizando a paginação direto no banco de dados através das cláusulas `skip` e `take` do Prisma, otimizando o consumo de memória.
2. **Cache em Memória RAM:** Integração com o `@nestjs/cache-manager` na rota de listagem, armazenando temporariamente os dados por 10 segundos na memória volátil, entregando respostas repetidas em **0 milissegundos**.

---

## 🛠️ Como Executar o Projeto

1. **Instalar as dependências:**
Execute no terminal: npm install

2. **Executar as Migrations do Prisma (Criar o banco de dados local):**
Execute no terminal: npx prisma migrate dev

3. **Iniciar o servidor em modo de desenvolvimento (Watch mode):**
Execute no terminal: npm run start:dev

4. **Acessar a Documentação Interativa (Swagger):**
Abra o seu navegador de preferência e acesse o endereço: http://localhost:3000/api

📈 Endpoints Disponíveis
**Servidores (/servidor)**
POST /servidor - Cadastra um novo servidor público.

GET /servidor - Lista os servidores cadastrados.

**Diárias (/diarias)**
POST /diarias - Cria um pedido de diária com cálculo automatizado de regras de negócio.

GET /diarias - Lista as diárias de forma paginada e com cache (trazendo o objeto do servidor aninhado via Join).

PATCH /diarias/:id - Atualiza e recalcula uma diária existente pelo ID.

DELETE /diarias/:id - Remove fisicamente uma diária do banco de dados pelo ID.