# 03_BIRTH_CONTRACT

Fase atual: Project Birth Contract

Projeto: EstoquePRO

Contrato: v0.1.0

Data: 2026-04-26

Fonte principal:
`02_CONSOLIDATION.md`

Status:
Contrato de nascimento formalizado. Este documento nao executa readiness, nao autoriza delivery e nao inicia construcao.

## 1. Identidade Oficial do Projeto

EstoquePRO e um sistema web interno, com boa adaptacao para celular, destinado a gestao confiavel de estoque de produtos para venda em um negocio real especifico.

O projeto nasce como um sistema operacional de controle de estoque. Ele nao nasce como PDV, sistema financeiro completo, emissor de nota fiscal, sistema completo de vendas ou plataforma multiempresa operacional.

## 2. Problema Que o Projeto Nasce Para Resolver

O EstoquePRO nasce para resolver a falta de controle completo e confiavel sobre:

- quantidades reais em estoque
- entradas de produtos
- saidas de produtos
- ajustes e correcoes
- perdas e avarias
- saldo real
- responsaveis por cada acao
- historico confiavel das movimentacoes

O problema central e o risco operacional de comprar errado, vender sem estoque real, perder rastreabilidade e operar com duvida sobre o que existe fisicamente.

## 3. Objetivo Central do Nascimento

O objetivo central do nascimento do EstoquePRO e criar uma base operacional confiavel para que o usuario fundador e uma equipe pequena possam controlar estoque com clareza, rapidez e rastreabilidade.

O nascimento deve priorizar integridade operacional antes de sofisticacao comercial, financeira ou analitica.

## 4. Escopo Inicial Confirmado

O nascimento inicial do EstoquePRO inclui:

- sistema web primeiro, com boa adaptacao para celular
- uso interno inicial
- perfis de usuario: dono/admin, operador e visualizacao
- cadastro e consulta de produtos
- cadastro e consulta de fornecedores
- controle de saldo real de produtos para venda
- entrada de estoque por fornecedor
- saida manual por motivo, incluindo venda
- registro de perda e avaria
- ajuste manual controlado com motivo
- historico por produto
- historico por fornecedor
- conferencia fisica flexivel
- relatorio de divergencias
- alertas de estoque baixo por estoque minimo do produto
- indicadores de produtos criticos, produtos parados, perdas/avarias, entradas, saidas e valor imobilizado
- filtros por categoria, fornecedor, produto e periodo
- travas contra saldo negativo, duplicidade por codigo interno, exclusao indevida e alteracao silenciosa de saldo

## 5. Fundacao Estrutural Obrigatoria no Nascimento

A fundacao obrigatoria do nascimento inclui:

- produtos com codigo interno, categoria, fornecedor principal, preco de custo, preco de venda, estoque minimo, status ativo/inativo e localizacao interna simples
- fornecedores com dados essenciais e relacao com produtos e entradas
- movimentacoes registradas como eventos rastreaveis
- entrada, saida, ajuste, perda/avaria, devolucao aplicavel e divergencia de conferencia como tipos de evento de estoque
- bloqueio permanente de saldo negativo
- motivo obrigatorio para ajustes, perdas/avarias e correcoes
- responsavel obrigatorio em toda acao relevante
- login individual por usuario
- permissoes iniciais por perfil
- historico inviolavel de movimentacoes
- logs administrativos para mudancas relevantes
- registro de mudancas em produto, preco, estoque minimo, categoria, fornecedor, localizacao, inativacao e permissoes
- inativacao em vez de exclusao para produtos com historico
- painel inicial operacional
- alertas basicos e relatorios basicos para operar e confiar no estoque

## 6. Fora do Nascimento Inicial

Ficam explicitamente fora do nascimento inicial:

- PDV
- venda completa dentro do sistema
- pedido de compra
- financeiro completo
- emissao de nota fiscal
- multiempresa operacional
- reserva de estoque
- separacao operacional entre estoque fisico, reservado e disponivel
- baixa automatica por venda integrada
- paineis diferentes por perfil
- comparacao avancada entre fornecedores
- avaliacao de fornecedores
- negociacao e inteligencia avancada de compra

Esses itens nao devem ser tratados como obrigacao do nascimento.

## 7. Horizonte Futuro Preparado

O sistema deve nascer sem bloquear evolucao futura para:

- codigo de barras
- multiplos fornecedores por produto
- comparacao entre fornecedores
- pedido de compra
- uso de materiais internos e insumos
- multiplos locais com saldo separado
- transferencias entre locais
- multiempresa
- integracao com vendas
- integracao com PDV/caixa
- baixa automatica de estoque por venda futura
- reserva de estoque
- separacao entre estoque fisico, reservado e disponivel
- financeiro completo
- emissao de nota fiscal
- automacao maior entre compras, vendas e estoque

Este horizonte deve orientar a fundacao, mas nao deve inflar o escopo inicial.

## 8. Papeis Iniciais de Usuario

### Dono/Admin

Pode administrar o sistema, usuarios, permissoes, cadastros, produtos, fornecedores, precos, estoque minimo, categorias, movimentacoes permitidas, relatorios e ajustes controlados.

### Operador

Pode registrar entrada, registrar saida e consultar historico. Nao pode alterar dados estruturais sensiveis como preco, codigo, categoria ou estoque minimo.

### Visualizacao

Pode consultar informacoes autorizadas, sem alterar dados nem registrar movimentacoes.

## 9. Principios de Integridade e Rastreabilidade

O EstoquePRO deve obedecer aos seguintes principios desde o nascimento:

- saldo real deve ser resultado de movimentacoes registradas
- nenhuma alteracao de saldo deve ser silenciosa
- movimentacoes registradas nao devem ser apagadas
- historico deve ser permanente e inviolavel, inclusive para admin
- correcoes devem ocorrer por novos registros
- toda acao relevante deve registrar usuario, data e contexto
- ajustes devem ter motivo obrigatorio
- mudancas administrativas relevantes devem gerar log
- produto com historico deve ser inativado, nao excluido
- confiabilidade operacional vale mais do que aparencia de simplicidade

## 10. Travas Obrigatorias do Sistema

O nascimento deve bloquear:

- saldo negativo
- movimentacao sem responsavel
- ajuste sem motivo
- exclusao indevida de produto com historico
- produto duplicado por codigo interno
- alteracao silenciosa de saldo
- exclusao de movimentacao ja registrada
- edicao direta de historico
- alteracao de dados sensiveis por usuario sem permissao

Tambem deve sinalizar possivel duplicidade por nome, fornecedor ou categoria quando houver risco razoavel.

## 11. Condicao de Sucesso Operacional Inicial

O nascimento inicial sera operacionalmente bem-sucedido quando permitir:

- consultar saldo real com confianca
- localizar produtos rapidamente
- registrar entradas e saidas sem perda de rastreabilidade
- corrigir divergencias por ajuste controlado
- impedir saldo negativo
- saber quem fez cada acao relevante
- enxergar historico de produto e fornecedor
- identificar produtos abaixo do minimo
- visualizar produtos criticos, perdas, avarias, divergencias e valor imobilizado
- operar o estoque sem bagunca, duvida ou alteracao invisivel

## 12. Verdade Contratual

### Confirmado

O projeto e um sistema interno de controle de estoque para produtos de venda, com usuarios, permissoes, produtos, fornecedores, movimentacoes, historico, alertas e relatorios basicos.

### Inferido

A confianca do EstoquePRO depende de tratar estoque como fluxo de eventos rastreaveis, nao como numero editavel.

### Recomendado

Preservar a primeira versao em torno da integridade operacional e preparar o futuro sem construir modulos futuros no nascimento.

### Em aberto

Continuam em aberto, sem bloquear o contrato:

- profundidade inicial dos relatorios
- nivel de detalhe do painel administrativo
- formato futuro de multiplos fornecedores por produto
- ritmo e frequencia de conferencia fisica
- forma futura de integracao com vendas/PDV
- grau inicial de detalhamento do giro de estoque
- regras futuras para estoque reservado, disponivel e fisico
- modelo futuro de multiempresa e multiplos locais

## 13. Lacunas

### Lacunas Criticas de Bloqueio

Nenhuma lacuna critica de bloqueio foi identificada para formalizar este contrato.

### Lacunas Importantes Nao Bloqueadoras

- profundidade inicial dos relatorios
- nivel de detalhe do painel administrativo
- detalhamento inicial do giro de estoque
- frequencia ou rotina exata de conferencia fisica
- formato pratico de alertas administrativos
- nivel de detalhe da localizacao interna
- regras de devolucao de cliente quando fizer sentido operacionalmente
- conteudo exato dos logs administrativos alem dos itens ja confirmados

### Lacunas Evolutivas

- multiplos fornecedores por produto
- pedido de compra
- PDV e venda completa
- integracao com caixa/PDV
- multiempresa
- multiplos locais e transferencias
- reserva de estoque
- estoque fisico, reservado e disponivel
- financeiro completo
- nota fiscal
- codigo de barras
- automacoes avancadas de compra, venda e reposicao

## 14. Estado do Contrato

Este contrato torna o EstoquePRO um projeto formalmente nascido sob a Project Birth Doctrine.

Ele define identidade, problema, objetivo, escopo inicial, fundacao obrigatoria, limites, horizonte futuro, papeis, integridade, rastreabilidade e travas.

Este contrato nao executa readiness e nao autoriza delivery.

Proximo passo legitimo, se autorizado pelo usuario:
avaliar readiness em `04_READINESS.md`.
