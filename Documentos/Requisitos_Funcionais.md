# Requisitos Funcionais — Vinyl Control
**Sistema de Gestão de Acervo e Vendas de Discos de Vinil**

## RF01 — Interface de autenticação de usuários

- **[RF01.1]** O sistema deve solicitar o e-mail e a senha do usuário na tela de login.
- **[RF01.2]** O sistema deve validar as credenciais informadas utilizando os dados cadastrados no banco de dados.
- **[RF01.3]** O sistema deve permitir o acesso somente quando as credenciais forem válidas.
- **[RF01.4]** O sistema deve informar ao usuário quando o e-mail não estiver cadastrado ou quando a senha estiver incorreta.
- **[RF01.5]** Após uma falha de autenticação, o sistema deve permitir que o usuário retorne à tela de login para tentar novamente.
- **[RF01.6]** Após a autenticação bem-sucedida, o sistema deve criar ou manter o estado de autenticação do usuário e redirecioná-lo para a interface principal.

## RF02 — Interface principal do sistema

- **[RF02.1]** O sistema deve exibir o nome do usuário autenticado.
- **[RF02.2]** O sistema deve apresentar um menu de navegação para as funcionalidades disponíveis.
- **[RF02.3]** O sistema deve disponibilizar acesso à interface de cadastro de discos.
- **[RF02.4]** O sistema deve disponibilizar acesso à interface de gestão de acervo e vendas.
- **[RF02.5]** O sistema deve apresentar indicadores resumidos do acervo, incluindo a quantidade de discos cadastrados, as unidades em estoque e os discos com estoque baixo.
- **[RF02.6]** O sistema deve disponibilizar a opção de logout, encerrando o estado de autenticação e redirecionando o usuário para a tela de login.

## RF03 — Cadastro e consulta de discos

- **[RF03.1]** O sistema deve listar os discos cadastrados no banco de dados em uma tabela ao acessar a interface de cadastro.
- **[RF03.2]** O sistema deve permitir a pesquisa de discos por termo informado pelo usuário, atualizando a listagem conforme os registros correspondentes.
- **[RF03.3]** O sistema deve permitir o cadastro de um novo disco, armazenando título, artista ou banda, preço de custo, quantidade em estoque e quantidade mínima de estoque.
- **[RF03.4]** O sistema deve permitir a edição dos dados de um disco já cadastrado.
- **[RF03.5]** O sistema deve permitir a exclusão de um disco cadastrado, respeitando as restrições de integridade dos registros relacionados.
- **[RF03.6]** O sistema deve validar os campos obrigatórios durante o cadastro e a edição de discos.
- **[RF03.7]** O sistema deve impedir valores inválidos, como preço de custo negativo, quantidade em estoque negativa ou quantidade mínima inválida.
- **[RF03.8]** O sistema deve informar ao usuário quando houver dados ausentes, inválidos ou falhas nas operações de cadastro, edição, exclusão e pesquisa.
- **[RF03.9]** O sistema deve disponibilizar uma opção para retornar à interface principal.

## RF04 — Gestão de acervo e movimentações de estoque

- **[RF04.1]** O sistema deve listar os discos cadastrados no banco de dados em ordem alfabética pelo título.
- **[RF04.2]** O sistema deve permitir que o usuário selecione o disco para o qual deseja registrar uma movimentação.
- **[RF04.3]** O sistema deve permitir a seleção do tipo de movimentação: entrada por reposição ou compra, ou saída por venda.
- **[RF04.4]** O sistema deve permitir a informação da quantidade de unidades movimentadas.
- **[RF04.5]** O sistema deve permitir que o usuário informe a data da movimentação.
- **[RF04.6]** O sistema deve registrar cada movimentação com o disco relacionado, o tipo de movimentação, a quantidade, a data e o usuário responsável pela operação.
- **[RF04.7]** O sistema deve aumentar a quantidade em estoque quando uma movimentação de entrada for registrada.
- **[RF04.8]** O sistema deve diminuir a quantidade em estoque quando uma movimentação de saída for registrada.
- **[RF04.9]** O sistema deve impedir uma venda quando a quantidade solicitada for maior que a quantidade disponível em estoque.
- **[RF04.10]** O sistema deve validar a quantidade e a data informadas antes de registrar a movimentação.
- **[RF04.11]** O sistema deve verificar automaticamente o nível de estoque após cada movimentação de saída.
- **[RF04.12]** O sistema deve emitir um alerta quando o estoque de um disco ficar abaixo da quantidade mínima configurada.
- **[RF04.13]** O sistema deve disponibilizar a consulta ao histórico de movimentações registradas.
- **[RF04.14]** O sistema deve informar ao usuário quando uma movimentação não puder ser concluída e confirmar quando a operação for realizada com sucesso.

## RF05 — Persistência e integridade dos dados

- **[RF05.1]** O sistema deve armazenar os dados dos usuários, discos e movimentações no banco de dados `loja_discos_db`.
- **[RF05.2]** O sistema deve relacionar cada movimentação a um disco e a um usuário existentes no banco de dados.
- **[RF05.3]** O sistema deve manter a consistência entre o registro de movimentação e a atualização da quantidade em estoque.
- **[RF05.4]** O sistema deve utilizar as chaves primárias e estrangeiras para manter a integridade dos relacionamentos entre as tabelas.
- **[RF05.5]** O sistema deve apresentar mensagens de erro quando ocorrerem falhas de comunicação com o banco de dados ou de processamento das operações.
