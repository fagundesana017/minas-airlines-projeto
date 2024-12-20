# Minas Airlines

**Minas Airlines** é um sistema para gerenciamento de companhias aéreas, permitindo o cadastro de voos, reservas e clientes.

## Funcionalidades
- Cadastro, edição e exclusão de voos.
- Gerenciamento de reservas e clientes.
- Geração de relatórios sobre operações.

## Tecnologias
- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Python (Flask).
- **Banco de Dados**: SQLite.

## Instalação
1. Clone o repositório:  
   `git clone https://github.com/fagundesana017/minas-airlines-projeto.git`
2. Acesse o diretório:  
   `cd minas-airlines-projeto`
3. Crie e ative o ambiente virtual:  
   `python -m venv venv`  
   Ativação no Windows: `venv\Scripts\activate`  
   Ativação no Linux/Mac: `source venv/bin/activate`
4. Instale as dependências:  
   `pip install -r requirements.txt`
5. Configure o banco de dados:  
   `flask db init && flask db migrate && flask db upgrade`
6. Execute a aplicação:  
   `flask run`  
   Acesse em: `http://localhost:5000`

