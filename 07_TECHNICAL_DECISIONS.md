# 07_TECHNICAL_DECISIONS

Fase atual: Technical Decisions Before Code

Projeto: EstoquePRO

Fonte principal:
`06_TECHNICAL_PLAN.md`

Status:
Decisoes tecnicas obrigatorias fechadas antes de codigo. Este documento nao cria migrations, nao define UI e nao inicia implementacao.

## 1. Stack Tecnica Web

### Decisao

Usar TypeScript com Next.js em arquitetura de monolito modular, com separacao interna entre camada de aplicacao, dominio, persistencia e interface web.

### Por que

O EstoquePRO precisa nascer como sistema web interno, com boa adaptacao para celular, regras de dominio fortes, painel, relatorios e operacao autenticada. Um monolito modular reduz complexidade inicial sem impedir organizacao seria do dominio.

### Impacto

- permite frontend e backend no mesmo projeto
- facilita evolucao inicial com menos infraestrutura
- permite organizar regras de estoque fora da UI
- reduz custo de manutencao para um primeiro ciclo

### Risco se decidir errado

Uma stack pesada demais pode atrasar o nascimento. Uma stack simples demais pode misturar UI, regras de estoque e persistencia, enfraquecendo auditoria e integridade.

## 2. Banco De Dados Principal

### Decisao

Usar PostgreSQL como banco de dados principal.

### Por que

O sistema exige integridade relacional, transacoes, filtros por periodo, historico, logs administrativos, bloqueio de saldo negativo e consultas confiaveis. PostgreSQL oferece base robusta para essas necessidades desde o nascimento.

### Impacto

- favorece consistencia transacional
- suporta relacoes fortes entre usuarios, produtos, fornecedores e movimentacoes
- permite indices para consultas operacionais e relatorios
- prepara crescimento sem exigir troca precoce de banco

### Risco se decidir errado

Um banco fraco para consistencia ou relacoes pode gerar saldo incorreto, historico fragil, relatorios inconsistentes e rework estrutural cedo.

## 3. Estrategia De Autenticacao E Sessao

### Decisao

Usar autenticacao por e-mail e senha, com senha armazenada por hash forte, sessao persistida no banco e cookie seguro HTTP-only.

### Por que

Cada usuario precisa ter login proprio e toda acao relevante deve ser rastreavel. Sessao persistida no banco facilita revogacao, auditoria e controle administrativo.

### Impacto

- permite identificar responsavel por movimentacoes e logs
- permite controle de sessao por usuario
- sustenta permissoes por papel
- reduz exposicao de credenciais no cliente

### Risco se decidir errado

Autenticacao fraca ou sessao sem controle pode comprometer rastreabilidade, permitir acoes indevidas e enfraquecer a confianca no historico.

## 4. Modelo Inicial De Papeis E Permissoes

### Decisao

Usar tres papeis iniciais fixos: dono/admin, operador e visualizacao, com permissoes explicitas por acao.

### Por que

O contrato confirmou esses papeis. O sistema precisa impedir que operador altere dados sensiveis e que visualizacao modifique qualquer dado.

### Impacto

- simplifica o primeiro ciclo
- permite bloqueios claros por acao
- evita excesso de configuracao inicial
- prepara evolucao futura para permissoes mais granulares

### Risco se decidir errado

Permissoes vagas ou amplas demais podem permitir alteracao indevida de produto, preco, estoque minimo, fornecedor ou movimentacoes.

## 5. Convencao De Identificadores

### Decisao

Usar identificadores internos tecnicos imutaveis para todas as entidades principais e codigo interno unico separado para produtos.

### Por que

O produto precisa ter codigo interno proprio, mas esse codigo nao deve substituir o identificador tecnico. Isso preserva relacoes, historico e logs mesmo se dados visiveis mudarem.

### Impacto

- separa identidade tecnica de codigo operacional
- protege relacoes historicas
- permite bloquear duplicidade por codigo interno
- melhora rastreabilidade em logs

### Risco se decidir errado

Usar codigo operacional como identidade tecnica pode quebrar historico, dificultar alteracoes controladas e gerar inconsistencias em movimentacoes antigas.

## 6. Convencao De Status Ativo/Inativo

### Decisao

Usar status explicito ativo/inativo para produtos, usuarios, categorias e fornecedores quando aplicavel, com inativacao registrada em log.

### Por que

Produto com historico nao pode ser excluido. A mesma logica deve proteger entidades operacionais usadas em historico.

### Impacto

- preserva historico
- evita exclusao indevida
- permite esconder itens inativos da operacao normal
- mantem rastreabilidade de dados antigos

### Risco se decidir errado

Exclusao fisica de entidades historicas pode quebrar movimentacoes, relatorios, auditoria e confianca operacional.

## 7. Estrategia Para Historico Inviolavel

### Decisao

Tratar movimentacoes de estoque como eventos permanentes, sem edicao direta e sem exclusao. Correcoes devem ocorrer por nova movimentacao compensatoria ou ajuste controlado.

### Por que

O saldo deve ser confiavel e historico deve ser inviolavel mesmo para admin. Isso exige modelo de eventos preservados, nao alteracao do passado.

### Impacto

- fortalece auditoria
- preserva trilha de decisoes
- permite explicar saldo atual
- evita correcao silenciosa

### Risco se decidir errado

Permitir edicao do historico pode esconder erro, fraude operacional ou divergencia, destruindo a confianca no estoque.

## 8. Estrategia Para Saldo Operacional

### Decisao

Manter saldo operacional por produto como estado controlado, atualizado exclusivamente por movimentacoes validadas e rastreaveis.

### Por que

O sistema precisa consultar saldo rapidamente, mas o saldo nao pode ser editado livremente. Manter saldo controlado permite desempenho operacional sem abrir mao da rastreabilidade.

### Impacto

- consulta de saldo fica rapida
- movimentacoes continuam sendo a fonte de explicacao do saldo
- painel e relatorios podem usar saldo atual com eficiencia
- ajustes precisam passar pelas mesmas regras de integridade

### Risco se decidir errado

Calcular tudo sempre pode prejudicar consultas conforme o volume cresce. Permitir saldo editavel pode gerar diferenca invisivel entre sistema e fisico.

## 9. Estrategia Para Bloquear Saldo Negativo

### Decisao

Bloquear saldo negativo na regra de dominio e reforcar a validacao dentro da transacao de persistencia da movimentacao.

### Por que

O bloqueio precisa resistir tanto a erro de uso quanto a concorrencia entre operacoes. A regra nao pode existir apenas na interface.

### Impacto

- impede saida acima do saldo
- protege venda manual, perda/avaria, devolucao para fornecedor e ajustes
- reduz risco de saldo incorreto
- exige que movimentacao e atualizacao de saldo sejam atomicas

### Risco se decidir errado

Validar apenas na UI ou fora de transacao pode permitir saldo negativo em operacoes simultaneas ou fluxos alternativos.

## 10. Estrategia De Logs Administrativos

### Decisao

Registrar logs administrativos append-only para acoes sensiveis, com usuario, acao, entidade afetada, identificador da entidade, data/hora e resumo dos dados alterados.

### Por que

O sistema exige rastreio de login, criacao de usuario, alteracao de permissao, mudancas de produto, preco, estoque minimo, fornecedor, categoria, localizacao e inativacao.

### Impacto

- permite auditoria administrativa
- explica mudancas sensiveis
- preserva responsabilidade por usuario
- separa historico de estoque de historico administrativo

### Risco se decidir errado

Logs incompletos ou editaveis deixam lacunas em alteracoes sensiveis e dificultam investigar divergencias.

## 11. Formato Inicial De Datas, Valores Monetarios E Quantidades

### Decisao

Usar datas em UTC na persistencia, exibicao ajustada ao contexto local, valores monetarios em decimal de precisao fixa e quantidades em decimal controlado.

### Por que

Estoque, relatorios por periodo, valores de custo/venda e quantidades precisam ser consistentes. Evitar ponto flutuante para dinheiro e controlar casas decimais reduz erro de calculo.

### Impacto

- melhora confiabilidade de relatorios por periodo
- protege calculo de valor total em estoque
- permite produtos com quantidades nao necessariamente inteiras se isso for necessario depois
- reduz ambiguidade em datas e valores

### Risco se decidir errado

Datas inconsistentes podem quebrar relatorios. Dinheiro em formato impreciso pode gerar valores errados. Quantidade mal definida pode causar divergencia operacional.

## 12. Abordagem Inicial De Testes Para Regras Criticas

### Decisao

Priorizar testes automatizados de regras de dominio e integridade antes de testes amplos de interface.

### Por que

O risco central do EstoquePRO esta em saldo, movimentacao, permissao, historico, logs e bloqueios. Essas regras precisam ser protegidas desde o primeiro ciclo.

### Impacto

- valida bloqueio de saldo negativo
- valida ajuste com motivo
- valida responsavel obrigatorio
- valida permissoes por papel
- valida inativacao em vez de exclusao
- valida criacao de historico e logs
- reduz regressao em regras sensiveis

### Risco se decidir errado

Testar apenas tela ou fluxo feliz pode deixar passar erros graves de saldo, permissao e auditoria.

## 13. Decisoes Fechadas

As decisoes obrigatorias antes de codigo estao fechadas:

- stack tecnica web
- banco de dados principal
- autenticacao e sessao
- papeis e permissoes
- identificadores
- status ativo/inativo
- historico inviolavel
- saldo operacional
- bloqueio de saldo negativo
- logs administrativos
- formatos de data, dinheiro e quantidade
- testes iniciais de regras criticas

## 14. Decisoes Que Permanecem Fora Deste Fechamento

Permanecem fora deste fechamento, sem bloquear o inicio tecnico:

- refinamento visual de UI
- escolha de componentes visuais
- desenho detalhado de telas
- notificacoes fora do painel
- PDV
- venda completa
- financeiro completo
- pedido de compra
- nota fiscal
- multiempresa operacional
- reserva de estoque
- multiplos locais operacionais
- integracoes futuras

Esses pontos nao pertencem ao nascimento tecnico inicial.

## 15. Prontidao Para Implementacao

Com estas decisoes fechadas, o projeto fica tecnicamente pronto para iniciar implementacao do primeiro ciclo, desde que o usuario autorize explicitamente codigo, migrations ou criacao de estrutura de aplicacao.

O primeiro codigo, quando autorizado, deve comecar pela fundacao tecnica:

- estrutura base do projeto
- configuracao da stack escolhida
- banco PostgreSQL
- autenticacao e sessao
- usuarios, papeis e permissoes
- entidades de dominio iniciais
- regras criticas de integridade

Nenhuma implementacao deve iniciar sem autorizacao explicita.
