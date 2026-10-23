# Descritivo de Casos de Teste

**Projeto:** Loja de Discos – Vinyl Control (Bêlie)

## 1. Ferramentas utilizadas

- Google Chrome para testar as telas.
- Insomnia para testar a API.
- MySQL para conferir o banco de dados.
- Frontend e backend do projeto.

## 2. Resultados dos testes

Foram realizados testes de login, navegação, cadastro, edição e exclusão de discos, movimentação de estoque, validação de dados e armazenamento das informações no banco de dados.

Os testes foram concluídos com sucesso, e as funcionalidades apresentaram os resultados esperados.

| ID | Teste | Resultado obtido | Situação |
|---|---|---|---|
| CT01 | Tela de login | Campos e botão exibidos corretamente. | Aprovado |
| CT02 | Login válido | Acesso permitido. | Aprovado |
| CT03 | Login inválido | Acesso bloqueado. | Aprovado |
| CT04 | Mensagens de erro no login | Mensagens exibidas corretamente. | Aprovado |
| CT05 | Retorno após falha no login | Comportamento esperado. | Aprovado |
| CT06 | Sessão e redirecionamento | Redirecionamento correto. | Aprovado |
| CT07 | Nome do usuário | Nome exibido no painel. | Aprovado |
| CT08 | Menu de navegação | Links funcionando corretamente. | Aprovado |
| CT09 | Resumo do acervo | Indicadores exibidos corretamente. | Aprovado |
| CT10 | Logout | Saída realizada corretamente. | Aprovado |
| CT11 | Listagem de discos | Discos carregados na tabela. | Aprovado |
| CT12 | Busca de discos | Pesquisa funcionando corretamente. | Aprovado |
| CT13 | Cadastro de disco | Cadastro realizado com sucesso. | Aprovado |
| CT14 | Edição de disco | Alterações salvas corretamente. | Aprovado |
| CT15 | Exclusão de disco | Disco excluído corretamente. | Aprovado |
| CT16 | Campos obrigatórios | Preenchimento validado. | Aprovado |
| CT17 | Valores inválidos | Dados inválidos bloqueados. | Aprovado |
| CT18 | Voltar ao painel | Retorno funcionando corretamente. | Aprovado |
| CT19 | Ordem alfabética | Discos organizados corretamente. | Aprovado |
| CT20 | Seleção de movimentação | Campos funcionando corretamente. | Aprovado |
| CT21 | Data da movimentação | Data registrada corretamente. | Aprovado |
| CT22 | Histórico | Informações exibidas corretamente. | Aprovado |
| CT23 | Entrada de estoque | Quantidade aumentada corretamente. | Aprovado |
| CT24 | Venda de disco | Quantidade reduzida corretamente. | Aprovado |
| CT25 | Venda acima do estoque | Operação bloqueada. | Aprovado |
| CT26 | Validação de quantidade e data | Dados inválidos bloqueados. | Aprovado |
| CT27 | Alerta de estoque baixo | Alerta exibido corretamente. | Aprovado |
| CT28 | Confirmação de movimentação | Mensagem de sucesso exibida. | Aprovado |
| CT29 | Persistência dos dados | Informações mantidas no banco. | Aprovado |
| CT30 | Backend desligado | Falha de conexão identificada. | Aprovado |

## 3. Problemas encontrados

Durante os testes, tivemos um problema no terminal, pois o backend não permanecia em execução como esperado. Após investigar, identificamos uma instância anterior do Node.js ocupando a porta 3000 e conseguimos resolver o problema.

Também ajustamos a configuração de CORS para permitir a comunicação entre o frontend e o backend.

Após os ajustes, o servidor voltou a funcionar e os testes foram concluídos com sucesso.