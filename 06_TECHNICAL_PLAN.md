# 06_TECHNICAL_PLAN

Fase atual: Technical Planning

Projeto: EstoquePRO

Fonte principal:
`05_DELIVERY.md`

Status:
Plano tecnico detalhado preparado sem codigo, sem migrations, sem definicao de UI e sem implementacao.

## 1. Visao Tecnica Geral Do Nascimento

O EstoquePRO deve nascer como um sistema web interno para controle confiavel de estoque, com foco tecnico em integridade de dados, rastreabilidade, permissoes e operacao diaria.

A base tecnica inicial deve sustentar:

- usuarios com papeis e permissoes
- produtos bem identificados
- fornecedores vinculados ao controle operacional
- movimentacoes como eventos rastreaveis
- saldo real protegido contra alteracao silenciosa
- historico inviolavel
- logs administrativos
- painel operacional
- relatorios iniciais

O plano tecnico nao inclui PDV, venda completa, financeiro completo, pedido de compra, nota fiscal, multiempresa operacional, reserva de estoque ou multiplos locais operacionais.

## 2. Blocos Tecnicos Derivados Do Delivery

### 2.1 Acesso E Permissoes

Base tecnica para login individual, papeis iniciais e autorizacao de acoes.

### 2.2 Cadastros De Dominio

Base tecnica para produtos, categorias, fornecedores e localizacao interna simples.

### 2.3 Estoque E Movimentacoes

Base tecnica para entradas, saidas, ajustes, perdas/avarias, devolucoes aplicaveis e divergencias de conferencia.

### 2.4 Integridade, Historico E Auditoria

Base tecnica para preservar eventos, bloquear edicoes indevidas, registrar logs e manter rastreabilidade.

### 2.5 Painel E Alertas

Base tecnica para resumir a saude do estoque e destacar itens criticos no painel.

### 2.6 Relatorios

Base tecnica para consultas filtradas por produto, categoria, fornecedor e periodo.

## 3. Entidades Tecnicas Principais

As entidades tecnicas principais sao:

- Usuario
- Papel
- Permissao
- Produto
- Categoria
- Fornecedor
- LocalizacaoInterna
- SaldoEstoque
- MovimentacaoEstoque
- TipoMovimentacao
- MotivoMovimentacao
- ConferenciaFisica
- ItemConferencia
- DivergenciaConferencia
- AlertaOperacional
- RelatorioOperacional
- LogAdministrativo

Essas entidades devem ser tratadas como o vocabulario tecnico inicial do sistema.

## 4. Relacoes Principais Entre Entidades

- Usuario possui um papel principal e executa acoes rastreaveis.
- Papel define limites de permissao para cada tipo de acao.
- Produto pertence a uma categoria.
- Produto possui fornecedor principal.
- Produto pode possuir uma localizacao interna simples.
- Produto possui estoque minimo, preco de custo, preco de venda e status ativo/inativo.
- MovimentacaoEstoque pertence a um produto.
- MovimentacaoEstoque possui tipo, quantidade, data, responsavel e motivo quando aplicavel.
- MovimentacaoEstoque pode ter fornecedor, conferencia ou contexto operacional associado quando aplicavel.
- SaldoEstoque representa o saldo operacional atual de um produto.
- SaldoEstoque deve ser derivado ou protegido pelas movimentacoes, nunca editado livremente.
- ConferenciaFisica agrupa itens conferidos em um periodo livre ou sob demanda.
- ItemConferencia compara quantidade fisica e quantidade esperada.
- DivergenciaConferencia pode gerar ajuste por divergencia com motivo obrigatorio.
- LogAdministrativo registra usuario, acao, entidade afetada, dados relevantes e data.

## 5. Regras Criticas De Integridade

As regras criticas sao:

- saldo negativo deve ser bloqueado sempre
- movimentacao sem responsavel deve ser bloqueada
- ajuste sem motivo deve ser bloqueado
- produto duplicado por codigo interno deve ser bloqueado
- movimentacao registrada nao pode ser excluida
- historico nao pode ser editado diretamente
- produto com historico deve ser inativado, nao excluido
- alteracao de dado sensivel exige permissao adequada
- toda alteracao sensivel deve gerar log administrativo
- correcao de saldo deve acontecer por nova movimentacao
- saldo operacional nao pode ser alterado silenciosamente
- painel e relatorios devem refletir dados rastreaveis

## 6. Modulos Tecnicos Iniciais

### 6.1 Modulo De Identidade

Responsavel por usuarios, login, papeis e permissao de acesso.

### 6.2 Modulo De Produtos

Responsavel por cadastro, consulta, edicao controlada, inativacao e prevencao de duplicidade.

### 6.3 Modulo De Fornecedores

Responsavel por cadastro, consulta e relacao com produtos e entradas.

### 6.4 Modulo De Estoque

Responsavel por saldo atual, movimentacoes, tipos de movimentacao e regras de bloqueio.

### 6.5 Modulo De Auditoria

Responsavel por historico inviolavel de movimentacoes e logs administrativos.

### 6.6 Modulo De Conferencia

Responsavel por conferencia fisica sob demanda, divergencias e ajustes por divergencia.

### 6.7 Modulo De Painel

Responsavel por resumo geral, itens criticos, ultimas movimentacoes, produtos parados e alertas no painel.

### 6.8 Modulo De Relatorios

Responsavel por relatorios iniciais e filtros operacionais.

## 7. Ordem Tecnica Recomendada De Construcao

### Etapa 1 - Base Tecnica De Dominio E Permissao

Definir usuarios, papeis, permissoes, produtos, categorias, fornecedores e localizacao interna simples.

### Etapa 2 - Base Tecnica De Estoque

Definir movimentacoes, tipos de movimentacao, saldo operacional e regras de validacao de saldo.

### Etapa 3 - Integridade E Auditoria

Definir historico inviolavel, logs administrativos, responsavel obrigatorio e motivos obrigatorios.

### Etapa 4 - Conferencia Fisica

Definir conferencia sob demanda, itens de conferencia, divergencias e ajuste por divergencia.

### Etapa 5 - Painel Operacional

Definir indicadores essenciais, itens criticos, ultimas movimentacoes, produtos parados e alertas no painel.

### Etapa 6 - Relatorios Iniciais

Definir relatorios obrigatorios e filtros por produto, categoria, fornecedor e periodo.

## 8. O Que Precisa Nascer Primeiro No Backend

O backend deve nascer primeiro com:

- modelo de autorizacao por papel
- regras centrais de permissao
- casos de uso de produto, fornecedor e categoria
- casos de uso de movimentacao de estoque
- regra de bloqueio de saldo negativo
- regra de responsavel obrigatorio
- regra de motivo obrigatorio quando aplicavel
- regra de inativacao em vez de exclusao
- geracao de historico e logs administrativos

Antes de painel e relatorios, o backend precisa garantir que os dados gravados sejam confiaveis.

## 9. O Que Precisa Nascer Primeiro No Banco

O banco deve nascer primeiro com estrutura suficiente para:

- usuarios, papeis e permissoes
- produtos, categorias, fornecedores e localizacao interna
- movimentacoes de estoque
- saldo operacional por produto
- conferencias fisicas e divergencias
- logs administrativos

As primeiras protecoes de banco devem considerar:

- identificadores unicos
- codigo interno unico por produto
- relacoes obrigatorias entre movimentacao, produto e usuario responsavel
- preservacao de movimentacoes registradas
- rastreabilidade de alteracoes sensiveis
- base para filtros por periodo, produto, categoria e fornecedor

Nenhuma migration deve ser criada nesta fase.

## 10. O Que Precisa Nascer Primeiro Na Aplicacao

Na aplicacao, sem definir UI detalhada ainda, devem nascer primeiro os fluxos funcionais minimos:

- login e identificacao do usuario
- acesso conforme papel
- cadastro e consulta de produtos
- cadastro e consulta de fornecedores
- consulta de saldo por produto
- registro de entrada
- registro de saida
- ajuste controlado com motivo
- consulta de historico por produto
- consulta de logs por admin

Painel, alertas e relatorios devem vir depois que os fluxos de dados confiaveis estiverem estabelecidos.

## 11. Riscos Tecnicos Principais

Os principais riscos tecnicos sao:

- modelar saldo como campo editavel sem protecao por movimentacao
- deixar auditoria como recurso posterior
- permitir exclusao ou edicao direta de eventos historicos
- misturar escopo inicial com PDV, venda completa ou financeiro
- criar relatorios antes de garantir integridade das movimentacoes
- deixar permissoes fracas no inicio
- nao registrar usuario responsavel em toda acao relevante
- tratar logs administrativos como detalhe secundario
- nao preparar indices e filtros para consultas operacionais basicas
- criar painel com dados pouco confiaveis

## 12. Decisoes Tecnicas Que Ainda Precisam Ser Fechadas Antes De Codigo

Antes de escrever codigo, ainda devem ser fechadas:

- stack tecnica web
- banco de dados principal
- estrategia de autenticacao e sessao
- modelo exato de papeis e permissoes no primeiro ciclo
- convencao de identificadores
- convencao de status ativo/inativo
- estrategia tecnica para preservar historico inviolavel
- estrategia para calcular e/ou manter saldo operacional
- estrategia de validacao para impedir saldo negativo
- estrategia de logs administrativos
- formato de datas, valores monetarios e quantidades
- abordagem inicial de testes para regras criticas

Essas decisoes sao tecnicas, nao mudam o escopo do nascimento, mas precisam estar fechadas antes da implementacao.

## 13. O Que Pode Ser Decidido Depois Sem Bloquear

Podem ser decididos depois sem bloquear o inicio da implementacao:

- refinamento visual do painel
- detalhes finos de layout das telas
- notificacoes fora do painel
- giro de estoque mais sofisticado
- modelo futuro de codigo de barras
- multiplos fornecedores por produto
- multiplos locais operacionais
- integracoes com vendas ou PDV
- pedido de compra
- financeiro completo
- nota fiscal
- multiempresa operacional
- reserva de estoque

Esses itens nao pertencem ao nucleo tecnico inicial.

## 14. Criterios Para Considerar O Plano Tecnico Pronto Para Implementacao

Este plano tecnico estara pronto para virar implementacao quando:

- a stack tecnica estiver escolhida
- o banco de dados estiver escolhido
- a estrategia de autenticacao estiver definida
- o modelo inicial de papeis e permissoes estiver fechado
- a estrategia de saldo e movimentacao estiver fechada
- a estrategia de historico inviolavel estiver fechada
- a estrategia de logs administrativos estiver fechada
- as entidades tecnicas iniciais estiverem aceitas
- as regras criticas de integridade estiverem aceitas
- a ordem tecnica de construcao estiver aceita
- os itens fora do escopo continuarem explicitamente excluidos

Depois disso, o proximo passo legitimo sera iniciar implementacao ou criar artefatos tecnicos concretos, mediante autorizacao explicita.
