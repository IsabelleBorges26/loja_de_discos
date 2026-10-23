# Descritivo de Casos de Teste

**Projeto:** Loja de Discos – Vinyl Control - Bêlie

## 1. Objetivo

Este documento apresenta os testes que serão realizados no sistema para verificar se suas funções estão funcionando corretamente.

## 2. Casos de Teste

### CT01 – Tela de Login
- **Procedimento:** Abrir o sistema.
- **Resultado esperado:** A tela de login deve aparecer com os campos de e-mail e senha.

### CT02 – Login com Dados Corretos
- **Procedimento:** Informar um e-mail e uma senha válidos.
- **Resultado esperado:** O sistema deve permitir o acesso.

### CT03 – Login com Dados Incorretos
- **Procedimento:** Informar um e-mail ou senha incorretos.
- **Resultado esperado:** O sistema deve mostrar uma mensagem de erro e impedir o acesso.

### CT04 – Tela Principal
- **Procedimento:** Entrar no sistema com dados válidos.
- **Resultado esperado:** A tela principal deve aparecer com as opções disponíveis.

### CT05 – Sair do Sistema
- **Procedimento:** Clicar na opção de sair.
- **Resultado esperado:** O sistema deve voltar para a tela de login.

### CT06 – Listar Discos
- **Procedimento:** Acessar a tela de discos.
- **Resultado esperado:** O sistema deve mostrar os discos cadastrados.

### CT07 – Cadastrar Disco
- **Procedimento:** Preencher os campos com os dados de um disco e salvar.
- **Resultado esperado:** O disco deve ser cadastrado e aparecer na lista.

### CT08 – Campos Obrigatórios
- **Procedimento:** Tentar cadastrar um disco sem preencher os campos obrigatórios.
- **Resultado esperado:** O sistema deve impedir o cadastro e mostrar uma mensagem de aviso.

### CT09 – Editar Disco
- **Procedimento:** Escolher um disco, alterar seus dados e salvar.
- **Resultado esperado:** As alterações devem ser salvas.

### CT10 – Excluir Disco
- **Procedimento:** Escolher um disco e clicar em excluir.
- **Resultado esperado:** O disco deve ser removido da lista e do banco de dados.

### CT11 – Pesquisar Disco
- **Procedimento:** Digitar o nome de um disco no campo de pesquisa.
- **Resultado esperado:** O sistema deve mostrar os discos correspondentes à pesquisa.

### CT12 – Controle de Estoque
- **Procedimento:** Acessar a opção de controle de estoque.
- **Resultado esperado:** O sistema deve abrir a tela de estoque.

### CT13 – Entrada de Estoque
- **Procedimento:** Registrar a entrada de discos.
- **Resultado esperado:** A quantidade em estoque deve aumentar.

### CT14 – Saída de Estoque
- **Procedimento:** Registrar a saída de discos.
- **Resultado esperado:** A quantidade em estoque deve diminuir.

### CT15 – Histórico de Movimentações
- **Procedimento:** Registrar uma entrada ou saída e consultar o histórico.
- **Resultado esperado:** O sistema deve mostrar a movimentação registrada.

### CT16 – Estoque Baixo
- **Procedimento:** Verificar um disco cuja quantidade esteja abaixo do estoque mínimo.
- **Resultado esperado:** O sistema deve mostrar um aviso de estoque baixo.

### CT17 – Venda sem Estoque Suficiente
- **Procedimento:** Tentar registrar uma saída maior que a quantidade disponível.
- **Resultado esperado:** O sistema deve impedir a operação e mostrar uma mensagem de aviso.

## 3. Registro dos Resultados

Após a realização dos testes, todos apresentaram os resultados esperados.

| Caso de teste | Resultado obtido | Situação |
|---|---|---|
| CT01 | Tela de login exibida corretamente. | Aprovado |
| CT02 | Login realizado com sucesso. | Aprovado |
| CT03 | Acesso impedido com dados incorretos. | Aprovado |
| CT04 | Tela principal exibida corretamente. | Aprovado |
| CT05 | Sistema voltou para a tela de login. | Aprovado |
| CT06 | Discos cadastrados exibidos na lista. | Aprovado |
| CT07 | Disco cadastrado com sucesso. | Aprovado |
| CT08 | Cadastro impedido com campos obrigatórios vazios. | Aprovado |
| CT09 | Dados do disco alterados com sucesso. | Aprovado |
| CT10 | Disco excluído com sucesso. | Aprovado |
| CT11 | Pesquisa de discos realizada corretamente. | Aprovado |
| CT12 | Tela de controle de estoque acessada corretamente. | Aprovado |
| CT13 | Quantidade em estoque aumentada corretamente. | Aprovado |
| CT14 | Quantidade em estoque diminuída corretamente. | Aprovado |
| CT15 | Movimentação exibida no histórico. | Aprovado |
| CT16 | Aviso de estoque baixo exibido corretamente. | Aprovado |
| CT17 | Saída impedida por falta de estoque. | Aprovado |


**Situação:** preencher com `Aprovado` quando o sistema apresentar o resultado esperado ou `Reprovado` quando apresentar algum erro.

## 4. Conclusão

Os testes permitem verificar se as funções do sistema estão funcionando corretamente e identificar possíveis erros que precisam ser corrigidos.

**Observação:** os testes devem ser realizados no sistema. Caso alguma função ainda não esteja implementada, registrar essa informação e não marcar o teste como aprovado.
