# 01_DISCOVERY

Fase atual: Guided Discovery

Objetivo desta fase:
Conduzir a descoberta inicial do projeto EstoquePRO usando a logica da Project Birth Doctrine, sem preencher respostas antes da participacao do usuario.

Status:
Discovery madura para consolidacao. Blocos 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 e 13 registrados.

## Bloco 1 - Essencia Inicial do Projeto

### 1. Uso inicial e horizonte
Resposta:
Um negocio real especifico, com possibilidade futura de virar algo mais robusto.

### 2. Tipo de estoque inicial
Resposta:
Produtos para venda.

Observacao:
No futuro pode evoluir para controlar tambem insumos e materiais internos.

### 3. Dor principal
Resposta:
Nao ter controle completo e confiavel das quantidades, das entradas e saidas, e correr risco de comprar errado ou vender sem estoque real.

### 4. Usuarios iniciais
Resposta:
Primeiro o usuario fundador e uma equipe pequena.

### 5. Sucesso real
Resposta:
Ter controle claro, confiavel e rapido do estoque, saber exatamente o que entrou, o que saiu, o saldo real, e conseguir operar sem bagunca nem duvidas.

## Bloco 2 - Movimentacao e Controle

### 1. Como o estoque entra no sistema no comeco
Resposta:
Principalmente por compra de fornecedor e cadastro/manual de ajuste inicial.

Observacao:
No futuro pode existir devolucao e outras entradas.

### 2. Como o estoque sai
Resposta:
Principalmente por venda. Tambem precisa considerar perda/avaria e ajuste manual quando necessario.

Observacao:
Uso interno pode existir no futuro.

### 3. Correcao manual de saldo
Resposta:
Sim, mas de forma controlada.

### 4. Motivo para correcao manual
Resposta:
Sim. Toda correcao manual deve exigir motivo registrado.

### 5. Quem pode registrar entradas e saidas
Resposta:
Pessoas autorizadas da equipe, nao qualquer pessoa.

### 6. Quem pode corrigir erros de estoque
Resposta:
So o usuario fundador ou alguem com permissao especial.

### 7. Historico do produto
Resposta:
Sim. Deve ser possivel ver entradas, saidas, correcoes, datas, responsaveis e motivo quando houver ajuste.

### 8. Alertas de estoque baixo
Resposta:
Sim.

### 9. Estoque minimo por produto
Resposta:
Sim. Cada produto deve poder ter seu proprio estoque minimo.

### 10. Permissoes por tipo de usuario
Resposta:
Sim. No comeco deve haver pelo menos:
- dono/admin
- operador
- visualizacao

Observacao:
No futuro isso pode evoluir.

## Bloco 3 - Cadastro de Produtos

### 1. Codigo interno proprio
Resposta:
Sim. Cada produto precisa ter um codigo interno proprio.

### 2. Codigo de barras
Resposta:
No futuro. Agora nao e obrigatorio, mas o sistema deve nascer preparado para suportar isso depois.

### 3. Organizacao por categoria
Resposta:
Sim. Os produtos precisam ser organizados por categoria.

### 4. Fornecedor principal
Resposta:
Sim. Deve ser registrado pelo menos um fornecedor principal para cada produto.

### 5. Preco de custo e preco de venda
Resposta:
Sim. O sistema deve controlar preco de custo e preco de venda desde o comeco, alem da quantidade.

### 6. Variacoes de produto
Resposta:
Sim, isso pode existir.

Observacao:
Talvez nao exista em todos os produtos no inicio, mas o sistema deve considerar a possibilidade de variacoes como tamanho, cor, modelo ou embalagem.

### 7. Produto inativo
Resposta:
Sim. Deve ser possivel inativar produto sem apagar.

### 8. Evitar cadastro duplicado
Resposta:
Sim. O sistema deve evitar cadastro duplicado de produto.

## Bloco 4 - Uso Diario, Consultas e Visao Operacional

### 1. Acoes mais rapidas no dia a dia
Resposta:
As acoes mais rapidas precisam ser:
- consultar saldo
- procurar produto
- registrar saida

Observacao:
Depois disso, entrada e ajuste tambem precisam ser ageis.

### 2. Primeira visao ao abrir o sistema
Resposta:
O usuario quer ver rapidamente:
- resumo geral do estoque
- alertas de produtos com estoque baixo
- ultimas movimentacoes
- quantidade de produtos cadastrados
- possiveis itens criticos

### 3. Painel inicial
Resposta:
Sim. Deve haver painel inicial com alertas, produtos baixos, ultimas movimentacoes e resumo geral.

### 4. Busca de produto
Resposta:
O usuario quer procurar por:
- nome
- codigo interno
- categoria
- fornecedor

Observacao:
Quanto mais completo, melhor.

### 5. Tela de produto
Resposta:
Deve aparecer rapidamente:
- saldo atual
- preco de custo
- preco de venda
- fornecedor principal
- estoque minimo
- historico de movimentacoes

Observacao:
Se possivel, tudo isso deve aparecer de forma clara.

### 6. Relatorios importantes no comeco
Resposta:
No comeco, os relatorios importantes sao:
- estoque atual
- produtos abaixo do minimo
- entradas por periodo
- saidas por periodo
- perdas/avarias

### 7. Valor total do estoque
Resposta:
Sim. O usuario precisa enxergar o valor total do estoque usando preco de custo.

### 8. Acoes rapidas para operacao diaria
Resposta:
Sim. O usuario quer acoes rapidas para:
- entrada rapida
- saida rapida
- ajuste com motivo
- ver historico
- buscar produto rapido

## Bloco 5 - Locais Fisicos e Estrutura do Estoque

### 1. Quantidade de locais fisicos no comeco
Resposta:
No comeco, o estoque fica em um unico local fisico.

### 2. Tipo de local fisico
Resposta:
No comeco, sera um unico espaco operacional principal, podendo ser loja/deposito conforme a operacao real.

### 3. Localizacao interna do produto
Resposta:
Sim, isso e desejavel.

Observacao:
Mesmo que no comeco seja algo simples, o sistema deve poder identificar onde o produto esta guardado dentro do local.

### 4. Mesmo produto em mais de um local
Resposta:
No comeco, nao e prioridade.

Observacao:
O sistema deve nascer preparado para isso no futuro.

### 5. Saldo separado por local
Resposta:
No comeco, nao obrigatoriamente.

Observacao:
A estrutura futura deve suportar separacao de saldo por local.

### 6. Transferencia entre locais
Resposta:
No comeco, nao.

Observacao:
Transferencia entre locais pode ser necessaria no futuro.

### 7. Rastreabilidade de transferencia
Resposta:
Sim. Se transferencia existir no futuro, precisa ser totalmente rastreavel.

Observacao:
Deve registrar quem fez, quando fez e de onde para onde foi.

### 8. Crescimento para multiplas unidades
Resposta:
Sim. O sistema deve poder evoluir para multiplas unidades no futuro.

## Bloco 6 - Seguranca, Travas e Consistencia

### 1. Bloqueio de venda ou saida sem saldo suficiente
Resposta:
Sim. O sistema deve impedir venda ou saida quando nao houver saldo suficiente.

### 2. Saldo negativo
Resposta:
Saldo negativo deve ser bloqueado sempre.

### 3. Movimentacao ja registrada
Resposta:
Nao deve ser apagada. Deve ser corrigida por outra movimentacao, preservando o historico.

### 4. Produto com historico de movimentacoes
Resposta:
So pode ser inativado.

### 5. Bloqueio de produto duplicado por codigo interno
Resposta:
Sim.

### 6. Possivel duplicidade por nome, fornecedor ou categoria
Resposta:
Sim. O sistema deve pelo menos sinalizar possivel duplicidade para revisao.

Observacao:
O bloqueio mais forte deve ser pelo codigo interno.

### 7. Alteracao de dados importantes do produto
Resposta:
So dono/admin ou alguem com permissao especial pode alterar dados importantes como preco de custo, codigo, categoria e estoque minimo.

### 8. Motivo obrigatorio em ajustes manuais
Resposta:
Sim. Ajustes manuais devem exigir motivo sempre, mesmo quando feitos por admin.

### 9. Historico permanente
Resposta:
Sim. O historico deve ser permanente, sem edicao direta.

### 10. Erros que precisam ser impossiveis desde o comeco
Resposta:
Devem ser bloqueados desde o comeco:
- saldo negativo
- movimentacao sem responsavel
- ajuste sem motivo
- exclusao indevida
- produto duplicado por codigo interno
- alteracao silenciosa de saldo
- exclusao de movimentacao ja registrada

## Bloco 7 - Compras, Reposicao e Conferencia Fisica

### 1. Entrada de estoque por fornecedor
Resposta:
Sim. Ao entrar estoque por fornecedor, o sistema deve registrar numero de nota, data, fornecedor e itens recebidos.

### 2. Pedido de compra
Resposta:
No comeco, basta registrar a entrada quando os produtos chegarem.

Observacao:
Pedido de compra pode ficar como evolucao futura.

### 3. Sugestao de compra ou reposicao
Resposta:
Sim. O sistema deve sugerir compra/reposicao quando o produto estiver abaixo do estoque minimo.

### 4. Devolucao de cliente
Resposta:
Sim, quando fizer sentido operacionalmente.

### 5. Devolucao para fornecedor
Resposta:
Sim. Devolucao para fornecedor deve ser registrada como saida de estoque.

### 6. Perda e avaria
Resposta:
Sim. Perda e avaria devem exigir motivo e responsavel.

### 7. Conferencia fisica do estoque
Resposta:
Sim. O usuario pretende fazer conferencia fisica do estoque.

### 8. Frequencia de conferencia
Resposta:
No comeco, provavelmente eventual ou periodica conforme necessidade.

Observacao:
O sistema deve permitir conferencia fisica sem depender de frequencia fixa desde o inicio.

### 9. Divergencia entre fisico e sistema
Resposta:
Sim. Quando houver diferenca entre fisico e sistema, o ajuste deve criar uma movimentacao com motivo obrigatorio.

### 10. Relatorio de divergencias
Resposta:
Sim. O usuario quer um relatorio de divergencias encontradas nas conferencias.

## Bloco 8 - Usuarios, Perfis e Ambiente de Uso

### 1. Login proprio por pessoa
Resposta:
Sim. Cada pessoa da equipe deve ter login proprio.

### 2. Rastreio por usuario
Resposta:
Sim. O sistema precisa registrar em cada acao qual usuario fez aquilo.

### 3. Permissoes do perfil dono/admin
Resposta:
Sim. O perfil dono/admin pode fazer tudo no sistema.

### 4. Permissoes do perfil operador
Resposta:
Sim. O perfil operador pode registrar entrada, registrar saida e consultar historico.

### 5. Restricao do operador sobre dados importantes
Resposta:
Nao. O operador nao pode alterar preco, codigo, categoria ou estoque minimo.

Observacao:
Essas alteracoes devem ficar restritas a dono/admin ou permissao especial.

### 6. Perfil de visualizacao
Resposta:
Sim. O perfil visualizacao deve apenas consultar informacoes, sem alterar nada.

### 7. Painel por perfil
Resposta:
No comeco, o mesmo painel com permissoes diferentes ja serve.

Observacao:
No futuro isso pode evoluir.

### 8. Dispositivos de uso no comeco
Resposta:
Em mais de um dispositivo, mas com prioridade para computador e boa adaptacao para celular.

### 9. Tipo de aplicacao
Resposta:
Web primeiro com boa adaptacao para celular.

### 10. Uso interno e preparo para multiempresa
Resposta:
Sim. O EstoquePRO sera primeiro interno, mas deve nascer preparado para uso externo/multiempresa no futuro.

## Bloco 9 - Vendas, Integracao e Limites de Escopo

### 1. Origem da saida de estoque no comeco
Resposta:
No comeco, a saida sera registrada manualmente, com motivo de venda quando necessario.

### 2. Registro de venda completa
Resposta:
No comeco, apenas baixar estoque por motivo "venda".

Observacao:
Nao precisa registrar a venda completa ainda.

### 3. Estoque fisico, reservado e disponivel
Resposta:
No comeco, nao. O usuario quer comecar com uma visao mais simples de saldo real.

Observacao:
Isso pode evoluir no futuro.

### 4. Reserva de produto antes da venda
Resposta:
Fica para o futuro.

### 5. Integracao futura com caixa/PDV
Resposta:
Sim.

### 6. Baixa automatica por venda futura
Resposta:
Sim. Se houver venda registrada no futuro, ela deve baixar o estoque automaticamente.

### 7. Historico financeiro
Resposta:
No comeco, preco/custo devem existir para valorizar estoque e apoiar relatorios.

Observacao:
Nao deve haver financeiro completo agora.

### 8. Compras e vendas conversando com estoque
Resposta:
Sim. Compras e vendas devem conversar com o estoque no futuro.

### 9. Fora do escopo inicial
Resposta:
Nao devem entrar no escopo inicial:
- PDV
- pedido de compra
- financeiro completo
- emissao de nota
- multiempresa operacional
- reserva de estoque
- venda completa dentro do sistema

### 10. Preparos para o futuro
Resposta:
O sistema precisa ficar preparado para:
- integracao com vendas
- integracao com PDV/caixa
- pedido de compra
- multiempresa
- multiplos locais
- reserva de estoque
- automacao maior entre compras, vendas e estoque

## Bloco 10 - Visao Administrativa e Saude do Estoque

### 1. Indicadores principais
Resposta:
O usuario quer ver primeiro:
- total de produtos
- valor total em estoque
- produtos abaixo do minimo
- entradas recentes
- saidas recentes
- perdas/avarias

### 2. Produtos criticos
Resposta:
Sim. O usuario quer saber quais produtos sao mais criticos.

### 3. Produtos parados
Resposta:
Sim. O usuario quer ver produtos parados que nao movimentam ha muito tempo.

### 4. Giro de estoque
Resposta:
E importante, mas pode comecar de forma simples e evoluir depois.

### 5. Perdas e avarias por periodo
Resposta:
Sim. O usuario quer acompanhar perdas e avarias por periodo.

### 6. Dinheiro imobilizado em estoque
Resposta:
Sim. O usuario quer ver quanto dinheiro esta imobilizado em estoque usando preco de custo.

### 7. Comparacao de entradas e saidas por periodo
Resposta:
Sim. O usuario quer comparar entradas e saidas por periodo, como semana, mes ou intervalo escolhido.

### 8. Filtros nos relatorios
Resposta:
Sim. O usuario precisa de filtros por categoria, fornecedor, produto ou periodo.

### 9. Confianca na saude do estoque
Resposta:
O usuario confiaria na saude do estoque ao ver com clareza:
- produtos criticos
- saldo confiavel
- ultimas movimentacoes
- poucas divergencias
- perdas controladas
- visao do valor em estoque
- indicadores claros e atualizados

### 10. Alertas administrativos alem de estoque baixo
Resposta:
Sim. O usuario quer alertas para:
- produto parado
- muita perda/avaria
- ajuste frequente
- divergencia de conferencia

## Bloco 11 - Fornecedores e Reposicao

### 1. Cadastro proprio de fornecedor
Resposta:
Sim. No comeco, cada fornecedor precisa ter cadastro proprio.

### 2. Dados essenciais do fornecedor
Resposta:
No comeco, o usuario quer pelo menos:
- nome
- telefone
- e-mail
- contato
- CNPJ/CPF
- observacoes

Observacao:
Endereco pode existir, mas nao e o foco principal agora.

### 3. Historico por fornecedor
Resposta:
Sim. O usuario quer ver o historico de entradas/compras por fornecedor.

### 4. Produtos por fornecedor
Resposta:
Sim. O usuario precisa saber quais produtos vem de cada fornecedor.

### 5. Mais de um fornecedor por produto
Resposta:
No comeco, o usuario quer pelo menos um fornecedor principal.

Observacao:
O sistema deve poder evoluir para multiplos fornecedores por produto.

### 6. Prazo medio de reposicao
Resposta:
Sim, mas isso pode comecar simples.

Observacao:
No inicio ja e util registrar prazo medio de reposicao, mesmo que evolua depois.

### 7. Comparacao de custo entre fornecedores
Resposta:
No comeco nao e obrigatorio.

Observacao:
Isso deve ficar preparado para o futuro.

### 8. Dependencia de fornecedor
Resposta:
Sim, principalmente para produtos criticos.

### 9. Papel do fornecedor no comeco
Resposta:
No comeco, fornecedor serve mais para organizar entradas e produtos.

Observacao:
Ja deve ajudar minimamente na decisao de reposicao.

### 10. Futuro em fornecedores
Resposta:
Pode ficar para o futuro:
- comparacao avancada entre fornecedores
- avaliacao de fornecedor
- pedidos de compra
- negociacao
- inteligencia maior de compra

## Bloco 12 - Auditoria e Rastreabilidade

### 1. Preservacao do historico de movimentacoes
Resposta:
Sim. O historico de movimentacoes deve ser preservado para sempre.

### 2. Logs administrativos
Resposta:
Sim. Alem das movimentacoes de estoque, o usuario quer logs administrativos, como login, criacao de usuario e mudanca de permissao.

### 3. Alteracao de cadastro de produto
Resposta:
Sim. Quando alguem alterar cadastro de produto, isso precisa ficar registrado.

### 4. Mudanca de preco de custo e preco de venda
Resposta:
Sim. Mudanca de preco de custo e preco de venda precisa guardar valor antigo, valor novo, usuario e data.

### 5. Mudanca de estoque minimo
Resposta:
Sim. Mudanca de estoque minimo precisa ficar registrada.

### 6. Mudanca de categoria, fornecedor principal ou localizacao interna
Resposta:
Sim. Mudanca de categoria, fornecedor principal ou localizacao interna precisa ficar registrada.

### 7. Produto inativado
Resposta:
Sim. Quando um produto for inativado, precisa registrar quem inativou, quando e por qual motivo.

### 8. Alteracoes de permissoes de usuario
Resposta:
Sim. Alteracoes de permissoes de usuario precisam ficar em historico.

### 9. Correcao de informacao historica
Resposta:
O historico deve ser inviolavel mesmo para admin.

Observacao:
Correcoes devem acontecer por novos registros, nao por alteracao silenciosa do passado.

### 10. Itens inviolaveis desde o comeco
Resposta:
O usuario quer considerar inviolavel desde o comeco:
- movimentacoes
- ajustes
- responsaveis
- datas
- motivos
- mudancas de preco
- mudancas de permissoes
- historico relevante de cadastro

## Bloco 13 - Checagem Final Antes da Consolidacao

### 1. Itens obrigatorios no nascimento
Resposta:
Sim. O nascimento do EstoquePRO deve incluir obrigatoriamente:
- cadastro de produtos
- fornecedores
- entradas
- saidas
- ajustes
- historico
- permissoes
- alertas
- relatorios basicos

### 2. Itens importantes versus fundacao mais critica
Resposta:
Alertas e relatorios basicos sao importantes, mas se for necessario classificar prioridade, a fundacao mais critica e:
- produtos
- fornecedores
- entradas
- saidas
- ajustes
- historico
- permissoes

Observacao:
Alertas e relatorios basicos devem entrar, mas a integridade operacional e ainda mais obrigatoria.

### 3. Fora do nascimento inicial
Resposta:
Fica fora:
- PDV
- venda completa
- pedido de compra
- financeiro completo
- nota fiscal
- multiempresa operacional
- reserva de estoque

### 4. Fundacao obrigatoria
Resposta:
Sim. A fundacao obrigatoria deve incluir historico inviolavel, login por usuario, permissoes e bloqueio de saldo negativo.

### 5. Evolucao futura preparada, mas nao construida agora
Resposta:
Sim. Multiempresa, multiplos locais, PDV, pedidos de compra e reserva devem ser tratados como evolucao futura preparada, mas nao construida agora.

### 6. Lacuna critica impeditiva
Resposta:
O usuario nao ve lacuna critica impeditiva neste momento.

### 7. Decisoes em aberto que nao bloqueiam o nascimento
Resposta:
Alguns pontos podem ficar em aberto sem bloquear:
- profundidade inicial dos relatorios
- nivel de detalhe do painel administrativo
- formato futuro de multiplos fornecedores por produto
- ritmo e frequencia de conferencia fisica
- futura integracao com vendas/PDV

### 8. Maturidade da discovery para consolidacao
Resposta:
Sim. O usuario considera a discovery madura o suficiente para preparar a consolidacao.
