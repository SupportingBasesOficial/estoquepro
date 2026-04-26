# 02_CONSOLIDATION

Fase atual: Deterministic Consolidation

Projeto: EstoquePRO

Status:
Consolidacao preparada a partir dos blocos 1 a 13 da discovery. Esta consolidacao nao e contrato de nascimento, nao e readiness e nao autoriza delivery.

## Identidade Consolidada do Projeto

EstoquePRO e um sistema web interno, com boa adaptacao para celular, para gestao confiavel de estoque de produtos para venda em um negocio real especifico.

O projeto nasce para resolver uma dor operacional concreta: falta de controle completo e confiavel sobre quantidades, entradas, saidas, ajustes e saldo real. Seu valor central e permitir que o usuario e uma equipe pequena saibam, com rapidez e confianca, o que entrou, o que saiu, o que existe em estoque, quem alterou algo e por qual motivo.

O sistema deve nascer como uma ferramenta de controle de estoque, nao como PDV, financeiro completo, emissor de nota fiscal ou sistema comercial amplo. Ao mesmo tempo, deve evitar uma fundacao estreita demais, pois ha horizonte futuro claro para vendas, compras, multiplos locais, multiempresa e automacoes maiores.

## Confirmado

- O projeto se chama EstoquePRO.
- O uso inicial sera em um negocio real especifico.
- O escopo inicial e controle de estoque de produtos para venda.
- O uso inicial sera feito pelo usuario fundador e uma equipe pequena.
- O sistema deve controlar produtos, fornecedores, entradas, saidas, ajustes, historico, permissoes, alertas e relatorios basicos.
- Cada produto deve ter codigo interno proprio, categoria, fornecedor principal, preco de custo, preco de venda, estoque minimo e possibilidade de inativacao.
- O sistema deve evitar produto duplicado, com bloqueio forte por codigo interno e sinalizacao de possivel duplicidade por dados parecidos.
- Entradas iniciais ocorrem por compra de fornecedor e ajuste/cadastro inicial.
- Saidas iniciais ocorrem principalmente por venda registrada manualmente como motivo de saida, alem de perda/avaria e ajustes quando necessario.
- Venda completa, PDV, pedido de compra, financeiro completo, nota fiscal, reserva de estoque e multiempresa operacional ficam fora do nascimento inicial.
- Saldo negativo deve ser sempre bloqueado.
- Movimentacoes registradas nao devem ser apagadas.
- Correcoes devem acontecer por novas movimentacoes, preservando o historico.
- Ajustes manuais devem exigir motivo sempre.
- Toda movimentacao deve ter responsavel.
- Historico de movimentacoes e logs administrativos devem ser preservados.
- O historico deve ser inviolavel mesmo para admin.
- Cada pessoa deve ter login proprio.
- Perfis iniciais confirmados: dono/admin, operador e visualizacao.
- Dono/admin pode fazer tudo.
- Operador pode registrar entrada, registrar saida e consultar historico.
- Operador nao pode alterar preco, codigo, categoria ou estoque minimo.
- Visualizacao apenas consulta informacoes.
- O sistema deve ter painel inicial com resumo geral, alertas de estoque baixo, ultimas movimentacoes, quantidade de produtos e itens criticos.
- Relatorios iniciais incluem estoque atual, produtos abaixo do minimo, entradas por periodo, saidas por periodo, perdas/avarias, divergencias e valor total em estoque por preco de custo.
- Fornecedores devem ter cadastro proprio e historico de entradas/compras.
- Conferencia fisica deve existir de forma flexivel, sem frequencia fixa obrigatoria no inicio.
- Divergencias entre fisico e sistema devem gerar ajuste com motivo obrigatorio.

## Inferido

- O saldo real deve ser consequencia de movimentacoes registradas, nao um numero editado livremente.
- A integridade operacional e mais critica do que a sofisticacao dos relatorios no nascimento.
- Auditoria, permissoes e historico nao sao recursos secundarios; sao parte da fundacao do sistema.
- EstoquePRO deve ser tratado como sistema operacional interno de estoque antes de ser tratado como plataforma comercial.
- O painel inicial deve funcionar como uma visao de saude do estoque, nao apenas como area decorativa.
- Produtos criticos, estoque baixo, perdas, ajustes frequentes e divergencias sao sinais operacionais importantes.
- O cadastro de fornecedores apoia organizacao e reposicao, mesmo sem pedido de compra completo no inicio.
- O projeto tem horizonte plausivel de plataforma mais robusta, mas esse horizonte nao deve inflar o escopo inicial.

## Recomendado

- Manter a primeira versao focada em controle confiavel de estoque, com alta rastreabilidade.
- Separar claramente tipos de movimentacao: entrada por fornecedor, saida por venda manual, perda/avaria, devolucao, ajuste e divergencia de conferencia.
- Tratar correcoes como novos eventos, nunca como edicao silenciosa do passado.
- Comecar com permissoes simples, mas firmes: dono/admin, operador e visualizacao.
- Permitir localizacao interna simples do produto desde o inicio.
- Preparar a estrutura para codigo de barras, multiplos locais, multiempresa, reserva, PDV e compras, sem construir esses modulos agora.
- Comecar relatorios e painel com indicadores essenciais, deixando analises mais profundas para evolucao posterior.
- Preservar escopo e horizonte separados em todos os proximos artefatos.

## Em Aberto

- Profundidade inicial exata dos relatorios.
- Nivel de detalhe do painel administrativo no primeiro ciclo de entrega.
- Formato futuro de multiplos fornecedores por produto.
- Ritmo e frequencia de conferencia fisica.
- Forma futura de integracao com vendas e PDV.
- Grau inicial de detalhamento do giro de estoque.
- Regras futuras para estoque reservado, disponivel e fisico.
- Modelo futuro de multiempresa e multiplos locais.

## Fundacao Estrutural Obrigatoria no Nascimento

- Cadastro de produtos com codigo interno, categoria, fornecedor principal, precos, estoque minimo, status ativo/inativo e localizacao interna simples.
- Cadastro de fornecedores com dados essenciais e relacionamento com produtos e entradas.
- Movimentacoes de estoque registradas como eventos rastreaveis.
- Entradas, saidas, ajustes, perdas/avarias, devolucoes aplicaveis e divergencias de conferencia.
- Bloqueio permanente de saldo negativo.
- Motivo obrigatorio para ajustes manuais, perdas/avarias e correcoes.
- Responsavel obrigatorio em toda acao relevante.
- Login individual por usuario.
- Permissoes iniciais por perfil.
- Historico inviolavel de movimentacoes.
- Logs administrativos para mudancas relevantes.
- Registro de alteracoes de produto, preco, estoque minimo, categoria, fornecedor, localizacao, inativacao e permissoes.
- Inativacao em vez de exclusao para produtos com historico.
- Painel inicial operacional.
- Alertas de estoque baixo e sinais administrativos basicos.
- Relatorios basicos para operar e confiar no estoque.

## Escopo Inicial Confirmado

- Sistema web primeiro, com boa adaptacao para celular.
- Uso interno inicial por dono/admin, operador e visualizacao.
- Cadastro e consulta de produtos.
- Cadastro e consulta de fornecedores.
- Controle de saldo real de produtos para venda.
- Registro de entrada por fornecedor.
- Registro de saida manual por motivo, incluindo venda.
- Registro de perda/avaria.
- Ajuste manual controlado com motivo.
- Historico por produto.
- Historico por fornecedor.
- Conferencia fisica flexivel.
- Relatorio de divergencias.
- Alertas de estoque baixo por estoque minimo do produto.
- Indicadores de produtos criticos, produtos parados, perdas/avarias, entradas, saidas e valor imobilizado.
- Filtros por categoria, fornecedor, produto e periodo.
- Travas contra saldo negativo, duplicidade por codigo interno, exclusao indevida e alteracao silenciosa de saldo.

## Horizonte Futuro Preparado Mas Fora do Nascimento

- Codigo de barras.
- Multiplos fornecedores por produto.
- Comparacao avancada entre fornecedores.
- Avaliacao de fornecedores.
- Pedido de compra.
- Negociacao e inteligencia maior de compra.
- Uso interno de materiais e insumos.
- Multiplos locais com saldo separado por local.
- Transferencias entre locais.
- Multiempresa operacional.
- Integracao com vendas.
- Integracao com PDV/caixa.
- Venda completa dentro do sistema.
- Baixa automatica por venda futura.
- Reserva de estoque.
- Separacao entre estoque fisico, reservado e disponivel.
- Financeiro completo.
- Emissao de nota fiscal.
- Paineis diferentes por perfil.
- Automacao maior entre compras, vendas e estoque.

## Lacunas Criticas de Bloqueio

Nenhuma lacuna critica de bloqueio foi identificada neste momento.

Observacao:
Isso nao significa que o projeto esta pronto para construcao. Significa apenas que a discovery produziu material suficiente para consolidacao e que nao ha, no estado atual, uma lacuna evidente que impeca a formacao de um contrato de nascimento candidato.

## Lacunas Importantes Nao Bloqueadoras

- Profundidade inicial dos relatorios.
- Nivel de detalhe do painel administrativo.
- Detalhamento inicial do giro de estoque.
- Frequencia ou rotina exata de conferencia fisica.
- Formato pratico de alertas administrativos para produto parado, muita perda, ajuste frequente e divergencia.
- Nivel de detalhe da localizacao interna no primeiro ciclo.
- Regras de devolucao de cliente quando fizer sentido operacionalmente.
- Conteudo exato dos logs administrativos alem dos itens ja confirmados.

## Lacunas Evolutivas

- Modelo de multiplos fornecedores por produto.
- Comparacao avancada de fornecedores.
- Pedido de compra.
- PDV e venda completa.
- Integracao com caixa/PDV.
- Multiempresa.
- Multiplos locais e transferencias.
- Reserva de estoque.
- Estoque fisico, reservado e disponivel.
- Financeiro completo.
- Nota fiscal.
- Codigo de barras.
- Automacoes avancadas de compra, venda e reposicao.

## Leitura Estrutural Final da Consolidacao

EstoquePRO esta consolidado como um sistema operacional de controle de estoque com forte exigencia de confiabilidade, rastreabilidade e permissao. O nascimento deve priorizar a integridade do saldo real, o registro inviolavel das movimentacoes, a clareza de produtos e fornecedores, e a capacidade de operar no dia a dia sem duvida sobre entradas, saidas, ajustes e responsaveis.

O escopo inicial esta suficientemente delimitado: controle de estoque interno, produtos para venda, movimentacoes rastreadas, usuarios com permissao, fornecedores, alertas e relatorios basicos. O horizonte futuro tambem esta visivel, mas explicitamente fora do nascimento operacional.

Proximo passo legitimo, se autorizado pelo usuario:
preparar o Project Birth Contract em `03_BIRTH_CONTRACT.md`.
