# Marcaê - Lista de Compras

Marcaê é um aplicativo mobile desenvolvido com **React Native**, que ajuda os usuários a organizarem suas compras de maneira prática e eficiente. O app permite criar listas de compras, cadastrar produtos e suas quantidades, além de calcular automaticamente o valor total da compra com base no valor unitário de cada item.

## Funcionalidades

- **Criar Listas de Compras**: Organize suas compras criando diferentes listas.
- **Cadastrar Produtos**: Adicione produtos à sua lista com a quantidade desejada.
- **Inserir Valores Unitários**: Defina o preço unitário de cada produto.
- **Cálculo Automático**: O app calcula o total pago por cada produto e o valor total da compra, garantindo que você tenha o controle de seus gastos.

## Tecnologias Utilizadas

- **React Native**: Framework para construção de aplicativos móveis nativos para Android e iOS.
- **Prisma**: ORM para conectar o aplicativo com o banco de dados SQLite, simplificando a manipulação e consultas aos dados.
- **SQLite**: Banco de dados leve e local, utilizado para armazenar as listas de compras e produtos.
- **React Native Vector Icons**: Biblioteca para ícones customizados, proporcionando uma interface mais atraente e funcional.
- **Stylesheets**: CSS-like styles para personalização da interface de usuário, tornando o aplicativo visualmente agradável.

## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes pré-requisitos instalados:

- **Node.js** (versão LTS recomendada)
- **React Native CLI**
- **Android Studio** ou **Xcode** (para emuladores e builds nativos)
- **SQLite** (instalado via Prisma)

### Passos para rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/marcae-lista-de-compras.git
   cd marcae-lista-de-compras
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Se for a primeira vez que está rodando o projeto, gere o banco de dados e as tabelas com Prisma:
   ```bash
   npx prisma db push
   ```
4. Gere os arquivos do Prisma:
   ```bash
   npx prisma generate
   ```
5. Inicie o projeto no seu emulador ou dispositivo:
   ```bash
   npx react-native run-android  # Para Android
   npx react-native run-ios      # Para iOS
   ```
## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais informações.