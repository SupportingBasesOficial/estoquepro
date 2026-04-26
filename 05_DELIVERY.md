# 05_DELIVERY

Fase atual: Structured Delivery

Projeto: EstoquePRO

Data: 2026-04-26

Fontes principais:
- `02_CONSOLIDATION.md`
- `03_BIRTH_CONTRACT.md`
- `04_READINESS.md`

Status:
Delivery estrutural inicial autorizado pela readiness final Ready. Este documento nao contem codigo, nao define stack tecnica e nao inicia implementacao detalhada.

## 1. Objetivo Do Delivery

Definir a forma estrutural de nascimento do EstoquePRO para orientar construcao futura de modo coerente com o contrato e com a readiness final.

Este delivery organiza:

- blocos principais do sistema inicial
- modulos obrigatorios do nascimento
- entidades centrais do dominio
- movimentacoes obrigatorias
- regras e travas
- papeis de usuario
- painel inicial
- relatorios iniciais
- logs e auditoria
- sequencia recomendada de entrega
- limites explicitos do ciclo inicial

## 2. Forma De Nascimento Do Sistema

O EstoquePRO deve nascer como um sistema web interno de controle confiavel de estoque de produtos para venda, com boa adaptacao para celular.

O nascimento deve priorizar:

- saldo real confiavel
- movimentacoes rastreaveis
- historico inviolavel
- permissoes claras
- produtos e fornecedores bem cadastrados
- painel operacional simples e util
- relatorios basicos de controle
- travas contra erro operacional

O sistema nao deve nascer como plataforma comercial ampla. Ele deve construir primeiro o nucleo operacional de estoque.

## 3. Blocos Principais Do Sistema Inicial

### 3.1 Bloco De Identidade, Acesso E Permissoes

Responsavel por login individual, papeis iniciais, limites de acao e rastreio de usuario.

### 3.2 Bloco De Cadastros Operacionais

Responsavel por produtos, fornecedores, categorias e dados essenciais para operacao.

### 3.3 Bloco De Movimentacao De Estoque

Responsavel por entradas, saidas, ajustes, perdas/avarias, devolucoes aplicaveis e divergencias de conferencia.

### 3.4 Bloco De Integridade, Historico E Auditoria

Responsavel por historico inviolavel, logs administrativos, registro de responsavel e preservacao dos eventos.

### 3.5 Bloco De Painel E Alertas

Responsavel por resumo geral, produtos abaixo do minimo, itens criticos, ultimas movimentacoes, produtos parados e alertas relevantes.

### 3.6 Bloco De Relatorios Iniciais

Responsavel por relatorios basicos necessarios para operar e confiar no estoque.

## 4. Modulos Obrigatorios Do Nascimento

Os modulos obrigatorios do nascimento sao:

- Usuarios e permissoes
- Produtos
- Categorias
- Fornecedores
- Localizacao interna simples
- Movimentacoes de estoque
- Ajustes controlados
- Conferencia fisica
- Historico por produto
- Historico por fornecedor
- Logs administrativos
- Painel inicial
- Alertas no painel
- Relatorios iniciais

Cada modulo deve respeitar integridade, rastreabilidade e os limites do escopo inicial.

## 5. Entidades Principais Do Dominio

As entidades principais do dominio inicial sao:

- Usuario
- Papel de usuario
- Produto
- Categoria
- Fornecedor
- Localizacao interna
- Estoque/saldo atual
- Movimentacao de estoque
- Tipo de movimentacao
- Motivo de ajuste
- Conferencia fisica
- Divergencia de conferencia
- Alerta operacional
- Relatorio
- Log administrativo

Essas entidades representam a linguagem operacional do EstoquePRO no nascimento.

## 6. Tipos De Movimentacao Obrigatorios

O sistema inicial deve suportar os seguintes tipos de movimentacao:

- entrada por fornecedor
- entrada por ajuste/cadastro inicial
- saida manual por venda
- saida por perda/avaria
- ajuste manual controlado
- devolucao de cliente quando fizer sentido operacionalmente
- devolucao para fornecedor
- ajuste por divergencia de conferencia

Toda movimentacao deve registrar:

- produto
- quantidade
- tipo
- data
- responsavel
- motivo quando aplicavel
- origem ou contexto quando aplicavel

## 7. Regras E Travas Obrigatorias

O sistema deve bloquear:

- saldo negativo
- movimentacao sem responsavel
- ajuste sem motivo
- exclusao de movimentacao ja registrada
- edicao direta de historico
- produto duplicado por codigo interno
- exclusao indevida de produto com historico
- alteracao silenciosa de saldo
- alteracao de dado sensivel por usuario sem permissao

O sistema deve permitir:

- correcao por nova movimentacao
- inativacao de produto com historico
- sinalizacao de possivel duplicidade por nome, fornecedor ou categoria
- conferencia fisica sem rotina fixa obrigatoria
- consulta de historico por produto e por fornecedor

## 8. Papeis De Usuario E Limites Iniciais

### Dono/Admin

Pode administrar usuarios, permissoes, produtos, fornecedores, categorias, precos, estoque minimo, localizacao interna, relatorios, ajustes controlados e configuracoes essenciais.

### Operador

Pode registrar entrada, registrar saida, consultar produtos e consultar historico.

Nao pode alterar dados estruturais sensiveis como codigo, preco, categoria, fornecedor principal ou estoque minimo.

### Visualizacao

Pode consultar informacoes autorizadas.

Nao pode registrar movimentacoes nem alterar cadastros.

## 9. Nucleo Do Painel Inicial

O painel inicial deve mostrar:

- resumo geral do estoque
- total de produtos cadastrados
- valor total em estoque pelo preco de custo
- produtos abaixo do minimo
- produtos criticos
- ultimas movimentacoes
- produtos parados
- alertas relevantes
- sinais de perdas/avarias
- sinais de divergencias de conferencia

O painel deve servir como visao de saude do estoque.

## 10. Nucleo Dos Relatorios Iniciais

Os relatorios iniciais obrigatorios sao:

- estoque atual
- produtos abaixo do minimo
- entradas por periodo
- saidas por periodo
- perdas/avarias por periodo
- divergencias de conferencia
- valor total em estoque pelo preco de custo

Os relatorios devem permitir filtros iniciais por:

- produto
- categoria
- fornecedor
- periodo

## 11. Logs E Auditoria Obrigatorios

O sistema deve registrar logs administrativos para:

- login
- criacao de usuario
- alteracao de permissao
- criacao de produto
- alteracao de produto
- alteracao de preco de custo
- alteracao de preco de venda
- alteracao de estoque minimo
- alteracao de fornecedor principal
- alteracao de categoria
- alteracao de localizacao interna
- inativacao de produto

O historico de movimentacoes e os logs administrativos devem ser preservados e nao devem ser editados diretamente.

## 12. Sequencia De Entrega Recomendada

### Etapa 1 - Fundacao De Acesso E Dominio

Construir a base de usuarios, papeis, permissoes, produtos, categorias, fornecedores e localizacao interna simples.

### Etapa 2 - Nucleo De Movimentacao E Saldo

Construir entradas, saidas, ajustes, tipos de movimentacao, saldo real e bloqueio de saldo negativo.

### Etapa 3 - Historico, Auditoria E Travas

Construir historico inviolavel, logs administrativos, responsavel obrigatorio, motivo obrigatorio e bloqueios contra exclusao ou edicao indevida.

### Etapa 4 - Conferencia Fisica E Divergencias

Construir conferencia sob demanda, registro de divergencias e ajuste por divergencia com motivo.

### Etapa 5 - Painel Inicial E Alertas

Construir resumo geral, produtos abaixo do minimo, produtos criticos, ultimas movimentacoes, produtos parados e alertas relevantes no painel.

### Etapa 6 - Relatorios Iniciais

Construir relatorios de estoque atual, abaixo do minimo, entradas, saidas, perdas/avarias, divergencias e valor total em estoque.

## 13. O Que Deve Ser Construido Primeiro

O primeiro bloco a ser construido deve ser a fundacao de acesso e dominio:

- usuarios
- papeis
- permissoes
- produtos
- categorias
- fornecedores
- localizacao interna simples

Motivo:
sem essa base, as movimentacoes nao terao responsavel, produto, fornecedor, categoria, permissao ou contexto confiavel.

## 14. O Que Pode Entrar Depois Dentro Do Delivery Inicial

Depois da fundacao e do nucleo de movimentacao, podem entrar em sequencia:

- conferencia fisica
- divergencias de conferencia
- painel inicial
- alertas no painel
- relatorios iniciais
- refinamento simples de giro de estoque
- regras praticas de devolucao de cliente quando fizer sentido operacionalmente

Esses itens pertencem ao delivery inicial, mas nao devem vir antes da fundacao e das travas.

## 15. Fora Deste Delivery Inicial

Ficam explicitamente fora deste delivery inicial:

- PDV
- venda completa dentro do sistema
- financeiro completo
- pedido de compra
- emissao de nota fiscal
- multiempresa operacional
- reserva de estoque
- separacao operacional entre estoque fisico, reservado e disponivel
- baixa automatica por venda integrada
- notificacoes fora do painel
- paineis diferentes por perfil
- comparacao avancada entre fornecedores
- avaliacao de fornecedores
- negociacao com fornecedores
- inteligencia avancada de compra
- multiplos locais operacionais
- transferencias entre locais

Esses itens podem existir como horizonte futuro preparado, mas nao fazem parte da construcao inicial.

## 16. Criterios De Sucesso Do Primeiro Ciclo De Delivery

O primeiro ciclo de delivery sera bem-sucedido quando o EstoquePRO permitir:

- cadastrar usuarios com papeis iniciais
- cadastrar produtos com dados obrigatorios
- cadastrar fornecedores essenciais
- registrar entradas e saidas com responsavel
- impedir saldo negativo
- registrar ajuste com motivo
- preservar historico de movimentacoes
- registrar logs administrativos obrigatorios
- consultar saldo real com confianca
- ver historico por produto e fornecedor
- identificar produtos abaixo do minimo
- visualizar painel inicial com itens criticos
- gerar relatorios iniciais obrigatorios
- operar sem alteracao silenciosa de saldo
- manter fora do ciclo inicial todos os itens excluidos pelo contrato

## 17. Proximo Passo Tecnico Legitimo

O proximo passo legitimo, se autorizado pelo usuario, e transformar esta estrutura em plano tecnico detalhado ou em primeira implementacao.

Nenhum codigo deve ser escrito a partir deste documento sem autorizacao explicita.
