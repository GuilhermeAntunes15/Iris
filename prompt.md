# PROJETO ÍRIS — ESPECIFICAÇÃO COMPLETA PARA DESENVOLVIMENTO DO PROTÓTIPO

## 1. SUA MISSÃO

Atue como uma equipe sênior formada por product designer, UX/UI designer, desenvolvedor full-stack e especialista em acessibilidade digital.

Desenvolva uma plataforma web responsiva, navegável e visualmente profissional chamada **ÍRIS — Tecnologia, oportunidades e futuro para mulheres**.

Não quero apenas uma landing page, um wireframe ou uma apresentação estática. Quero um protótipo de alta fidelidade, com páginas reais, navegação funcional, formulários interativos, filtros, resultados personalizados, dados de demonstração e ações que funcionem no próprio navegador.

**Prioridade máxima:** entregar a maior quantidade possível de funcionalidades completas na primeira geração, sem depender de novas solicitações, serviços pagos, APIs externas ou configurações complexas.

Não interrompa o desenvolvimento para fazer perguntas. Tome decisões coerentes com esta especificação e implemente o produto completo dentro das limitações do ambiente.

## 2. CONTEXTO E PROBLEMA QUE A PLATAFORMA RESOLVE

O ÍRIS nasceu para ajudar mulheres que desejam entrar ou retornar ao mercado de trabalho, especialmente à área de Tecnologia da Informação (TI), mas encontram obstáculos para começar.

O público inclui:
- Mães que desejam voltar ao mercado de trabalho após um período dedicado à criação dos filhos.
- Mulheres que interromperam os estudos ou ficaram afastadas do mercado por um período.
- Estudantes que gostam de tecnologia, mas não sabem qual carreira seguir.
- Mulheres que precisam conciliar maternidade, trabalho, estudos e responsabilidades domésticas.
- Mulheres que precisam desenvolver competências, preparar um currículo e se candidatar a oportunidades profissionais.

As principais dificuldades são a falta de orientação, a dificuldade de encontrar cursos, a falta de tempo, a necessidade de conciliar a rotina com a maternidade e a ausência de oportunidades acessíveis de preparação profissional.

A plataforma deve conectar informação, orientação, formação e oportunidades em uma experiência integrada.

### Objetivo central

Ajudar cada mulher a transformar seu interesse em tecnologia em um plano de ação possível, respeitando sua realidade, suas responsabilidades e seu tempo disponível.

### Jornada principal do produto

Interesse → Informação → Orientação → Formação → Oportunidade → Entrada ou retorno ao mercado de trabalho.

### Princípios do projeto

- Acolhimento sem infantilização.
- Autonomia, não dependência da plataforma.
- Inclusão e acessibilidade.
- Orientação prática, não apenas motivacional.
- Rotinas flexíveis e adaptadas à realidade de cada mulher.
- Oportunidades acessíveis, gratuitas ou de baixo custo sempre que possível.
- Tecnologia como instrumento de transformação social.

Não apresente a maternidade como um problema ou uma incapacidade. A plataforma deve reconhecer que as responsabilidades de cuidado podem limitar o tempo e o acesso a oportunidades, sem reduzir as mulheres à condição de mães.

## 3. IDENTIDADE VISUAL

Utilize o documento de referência visual do projeto ÍRIS como inspiração principal.

O documento apresenta uma identidade clara, leve, tecnológica e acolhedora, com fundo predominantemente branco, gradientes suaves, elementos circulares coloridos, cartões arredondados e cores de destaque em diferentes seções.

### Direção visual

Misture:
- Tecnologia e inovação.
- Acolhimento e impacto social.
- Modernidade e leveza.
- Organização visual e clareza.
- Uma estética feminina inclusiva, sem recorrer a estereótipos excessivamente delicados ou infantis.

### Paleta inicial de referência

Use estes valores como uma tradução digital aproximada da identidade visual do documento:

- Azul-petróleo: #278C9C.
- Turquesa: #55BFC1.
- Azul-claro: #C5EAF0.
- Coral: #E889A0.
- Amarelo: #F1C66B.
- Verde suave: #A9C8A5.
- Lilás: #B7A7D8.
- Fundo branco: #FFFFFF.
- Fundo neutro: #F7F9FA.
- Texto principal: #26343B.
- Texto secundário: #68777E.

Utilize gradientes suaves entre azul, turquesa, amarelo, coral e lilás em elementos pontuais, principalmente na identidade do logotipo e em detalhes gráficos. Evite aplicar todos os tons simultaneamente em cada seção.

### Logo

Crie uma identidade tipográfica para a palavra “ÍRIS”, com letras elegantes, contemporâneas e leves. Utilize um gradiente sutil nas letras ou em um detalhe gráfico.

Abaixo do nome, quando houver espaço, utilize a frase:

“Tecnologia, oportunidades e futuro para mulheres.”

Crie uma versão compacta do logotipo para o cabeçalho e uma versão ampliada para a página inicial.

### Componentes visuais

- Cartões brancos com cantos arredondados.
- Sombras muito sutis.
- Bordas finas e discretas.
- Ícones simples e consistentes.
- Ilustrações abstratas e formas circulares suaves.
- Gráficos claros e acessíveis.
- Botões com hierarquia visual evidente.
- Espaçamento generoso e tipografia legível.

Não transforme a plataforma em um painel administrativo genérico. Ela precisa ter personalidade visual própria e parecer um produto real.

Use uma fonte moderna e legível, como Inter ou uma alternativa sans-serif disponível. Estabeleça uma hierarquia consistente de títulos, subtítulos, textos e legendas.

## 4. ESTRUTURA GERAL DA APLICAÇÃO

Desenvolva uma aplicação web em português brasileiro, com navegação por rotas e layout responsivo.

### Rotas sugeridas

- `/` — Landing page.
- `/entrar` — Entrada demonstrativa.
- `/cadastro` — Cadastro.
- `/inicio` — Painel personalizado.
- `/carreira` — Teste vocacional e orientação profissional.
- `/carreira/resultado` — Resultado do teste.
- `/mapa` — Mapa de apoio e oportunidades presenciais.
- `/rotina` — Planejador de rotina.
- `/comunidade` — Comunidade.
- `/mentorias` — Mentorias e preparação profissional.
- `/oportunidades` — Vagas e oportunidades.
- `/perfil` — Perfil e preferências.

As rotas podem ser organizadas de outra forma se isso melhorar a arquitetura, mas todas as funcionalidades devem estar acessíveis.

### Navegação

Em desktop, utilize uma barra lateral compacta ou um menu superior consistente, com ícones e rótulos.

Em dispositivos móveis, utilize um menu adaptado, preferencialmente com navegação inferior para as áreas principais ou um menu lateral recolhível.

Inclua:
- Logotipo ÍRIS.
- Acesso ao início.
- Carreira.
- Mapa.
- Minha rotina.
- Comunidade.
- Mentorias.
- Oportunidades.
- Perfil.

Destaque visualmente a seção ativa. Nenhum item deve ser apenas decorativo: todos devem navegar para sua respectiva tela.

## 5. LANDING PAGE — APRESENTAÇÃO DO ÍRIS

Crie uma página inicial impactante, com uma proposta de valor clara e uma demonstração visual do produto.

### Cabeçalho

- Logotipo ÍRIS.
- Links para “Como funciona”, “Recursos” e “Sobre o projeto”.
- Botão secundário “Entrar”.
- Botão principal “Começar minha jornada”.

### Seção principal

Título:

**“Seu próximo capítulo profissional começa aqui.”**

Texto:

“O ÍRIS conecta mulheres à tecnologia por meio de orientação profissional, oportunidades de formação, apoio à rotina e preparação para o mercado de trabalho.”

Botões:
- “Descobrir minha área”.
- “Conhecer a plataforma”.

Adicione uma composição visual mostrando uma prévia do painel, com cartões de carreira, rotina e oportunidades. Evite usar fotografias genéricas como elemento principal se uma composição de interface for mais coerente.

### Seção de desafios

Apresente os desafios que a plataforma ajuda a enfrentar:
- Não saber por onde começar.
- Dificuldade de encontrar cursos confiáveis e acessíveis.
- Falta de tempo para estudar.
- Necessidade de conciliar responsabilidades familiares.
- Dificuldade para construir currículo e se preparar para entrevistas.

### Seção de funcionalidades

Apresente quatro recursos em cartões:

1. **Descubra sua área:** conheça caminhos profissionais dentro da TI.
2. **Encontre apoio perto de você:** explore cursos presenciais e serviços de apoio à maternidade.
3. **Organize sua rotina:** construa um plano de estudos realista e flexível.
4. **Prepare-se para oportunidades:** acesse mentorias, atividades de preparação e oportunidades profissionais.

### Seção “Como funciona”

Mostre a jornada em etapas visuais:

1. Conte sobre seus interesses e sua realidade.
2. Descubra caminhos profissionais compatíveis com seus interesses.
3. Encontre cursos, recursos e oportunidades.
4. Organize seu plano de desenvolvimento.
5. Prepare-se para entrar ou retornar ao mercado.

### Seção sobre o projeto

Explique que o ÍRIS é um projeto de inclusão, orientação e acesso à tecnologia para mulheres.

Não invente parcerias institucionais, depoimentos reais, resultados de impacto ou números de usuárias.

### Rodapé

Inclua:
- Nome do projeto.
- Breve descrição.
- Navegação para as principais funcionalidades.
- Aviso de que esta versão é um protótipo demonstrativo.
- Links internos para privacidade e acessibilidade, ainda que sejam páginas informativas simples.

## 6. CADASTRO E PERSONALIZAÇÃO INICIAL

Implemente uma experiência de entrada demonstrativa. Não exija uma integração real de autenticação para que seja possível apresentar o protótipo.

Crie um formulário de cadastro com:
- Nome ou nome de exibição.
- E-mail demonstrativo.
- Situação profissional.
- Objetivo principal.
- Tempo disponível para estudar por semana.
- Preferência por cursos online, presenciais ou híbridos.
- Cidade ou região de interesse, preenchida opcionalmente.
- Existência de responsabilidades de cuidado, com resposta opcional.
- Preferência de acessibilidade, quando aplicável.

Situações profissionais:
- Quero entrar na área de tecnologia.
- Quero voltar ao mercado de trabalho.
- Quero mudar de carreira.
- Já estudo ou trabalho com tecnologia e quero evoluir.

Objetivos:
- Descobrir minha área profissional.
- Aprender uma nova habilidade.
- Conseguir minha primeira oportunidade.
- Retornar ao mercado de trabalho.
- Atualizar meus conhecimentos.

Após o cadastro, direcione a usuária para o painel personalizado.

Permita editar as preferências posteriormente. Não solicite informações sensíveis desnecessárias sobre filhos ou família.

## 7. PAINEL PERSONALIZADO — INÍCIO

Esta deve ser uma das telas mais importantes da plataforma.

Crie um painel acolhedor e objetivo, com uma saudação personalizada e próximos passos claros.

Exemplo:

“Olá, Ana! Vamos avançar no seu próximo passo profissional?”

Subtítulo:

“Seu caminho não precisa acontecer de uma vez. Vamos construir uma etapa por vez.”

### Componentes do painel

**A. Meu próximo passo**

Um cartão que indique a principal ação recomendada de acordo com o progresso da usuária.

Exemplos:
- Faça seu teste de orientação profissional.
- Explore as áreas de TI.
- Complete sua primeira atividade de estudo.
- Revise seu currículo.
- Prepare-se para uma entrevista.

O botão deve levar diretamente à funcionalidade correspondente.

**B. Minha jornada**

Uma representação visual das etapas:

- Descoberta profissional.
- Exploração de cursos.
- Plano de estudos.
- Preparação profissional.
- Busca por oportunidades.

Marque as etapas concluídas com base nas interações realizadas.

**C. Minha rotina**

Mostre:
- Próxima atividade planejada.
- Tempo de estudo previsto para a semana.
- Atividades concluídas.
- Acesso para editar o planejamento.

**D. Oportunidades para mim**

Mostre cartões de cursos, mentorias e vagas demonstrativas, com filtros relevantes para os objetivos da usuária.

**E. Apoio por perto**

Mostre uma prévia do mapa e um botão “Explorar mapa”.

**F. Comunidade**

Mostre publicações recentes de demonstração e um acesso à comunidade.

**G. Mensagem de incentivo contextual**

Utilize mensagens curtas, respeitosas e variadas. Não use frases que culpabilizem a usuária por atrasos ou tarefas não concluídas.

O painel deve se adaptar ao progresso da usuária, e não ser apenas uma tela estática.

## 8. TESTE VOCACIONAL E ORIENTAÇÃO PROFISSIONAL EM TI

Crie uma experiência interativa de orientação profissional, não um teste psicológico ou diagnóstico.

Objetivo: ajudar mulheres a descobrir quais áreas da tecnologia podem combinar com seus interesses, preferências e formas de trabalhar.

### Tela inicial

Título:

“Descubra caminhos na tecnologia que combinam com você.”

Texto:

“Responda a algumas perguntas sobre seus interesses e descubra áreas para explorar. Não existe resposta certa ou errada.”

Inclua:
- Tempo estimado de 3 a 5 minutos.
- Indicador de progresso.
- Botão “Começar teste”.
- Opção de reiniciar.

### Questionário

Implemente de 10 a 12 perguntas de múltipla escolha. Apresente uma pergunta por vez, com cartões selecionáveis, botões “Voltar” e “Próxima” e salvamento temporário das respostas.

Perguntas sugeridas:

1. Qual atividade mais desperta sua curiosidade?
   - Criar sites e aplicativos.
   - Investigar problemas e encontrar soluções.
   - Organizar informações e identificar padrões.
   - Proteger sistemas e investigar ameaças.
   - Criar interfaces e experiências visuais.
   - Entender pessoas e organizar projetos.

2. O que mais te satisfaz em uma tarefa?
   - Ver algo que criei funcionando.
   - Resolver um desafio lógico.
   - Descobrir algo importante nos dados.
   - Identificar e corrigir falhas.
   - Melhorar a experiência de alguém.
   - Fazer uma equipe alcançar um objetivo.

3. Como você prefere aprender?
   - Praticando e construindo projetos.
   - Resolvendo exercícios.
   - Analisando exemplos e dados.
   - Investigando situações reais.
   - Criando protótipos.
   - Organizando processos e colaborando.

4. Quais assuntos mais chamam sua atenção?
   - Programação.
   - Matemática, lógica e resolução de problemas.
   - Dados e estatística.
   - Segurança e privacidade digital.
   - Design e experiência do usuário.
   - Negócios, produtos e gestão.

5. Em um projeto, qual papel você gostaria de experimentar?
   - Desenvolver funcionalidades.
   - Analisar informações.
   - Testar e encontrar erros.
   - Planejar uma interface.
   - Investigar riscos.
   - Coordenar atividades.

6. Qual tipo de problema você gostaria de resolver?
   - Criar uma ferramenta digital.
   - Transformar dados em decisões.
   - Tornar um sistema mais seguro.
   - Deixar um produto mais fácil de usar.
   - Melhorar a qualidade de um software.
   - Melhorar um processo de trabalho.

7. Você prefere trabalhar com:
   - Código e construção.
   - Dados e investigação.
   - Testes e análise.
   - Interfaces e pessoas.
   - Segurança e infraestrutura.
   - Planejamento e comunicação.

8. Qual dessas atividades você gostaria de experimentar primeiro?
   - Criar uma página web.
   - Analisar uma planilha.
   - Encontrar falhas em um sistema.
   - Desenhar a tela de um aplicativo.
   - Investigar um problema de segurança.
   - Organizar as etapas de um projeto.

9. Como você se sente diante de um problema que ainda não sabe resolver?
   - Quero experimentar soluções.
   - Quero investigar a lógica.
   - Quero observar informações.
   - Quero testar possibilidades.
   - Quero entender a experiência das pessoas.
   - Quero dividir o problema em etapas.

10. Qual resultado te deixaria mais satisfeita?
   - Um aplicativo funcionando.
   - Uma análise bem fundamentada.
   - Um sistema mais confiável.
   - Uma experiência mais intuitiva.
   - Um software com menos erros.
   - Um projeto organizado e entregue.

11. Qual ambiente de trabalho você gostaria de conhecer?
   - Desenvolvimento de produtos digitais.
   - Análise de negócios e dados.
   - Qualidade de software.
   - Design de produtos.
   - Segurança e infraestrutura.
   - Gestão de projetos de tecnologia.

12. O que você mais gostaria de desenvolver neste momento?
   - Conhecimentos de programação.
   - Pensamento analítico.
   - Atenção aos detalhes.
   - Criatividade e empatia.
   - Investigação e segurança.
   - Organização e comunicação.

### Lógica de resultados

Crie uma lógica simples e transparente de pontuação por afinidade. Cada alternativa deve contribuir para uma ou mais categorias de carreira.

Categorias:

1. Desenvolvimento de software.
2. Dados e inteligência de negócios.
3. Qualidade e testes de software.
4. UX/UI e design de produtos digitais.
5. Cibersegurança e infraestrutura.
6. Análise de sistemas, produtos e projetos.

Calcule as pontuações, ordene as áreas e mostre as três maiores afinidades. Em caso de empate, apresente ambas como possibilidades, sem inventar uma precisão que o teste não possui.

### Tela de resultado

Exiba:
- Uma mensagem personalizada.
- Área com maior afinidade.
- Duas áreas alternativas.
- Explicação de cada área em linguagem simples.
- Exemplos de atividades realizadas por profissionais.
- Competências importantes para desenvolver.
- Sugestões de cursos introdutórios.
- Um primeiro projeto prático para experimentar a área.
- Botão “Adicionar ao meu plano”.
- Botão “Explorar cursos”.
- Botão “Refazer teste”.

Exemplo de resultado para desenvolvimento:

“Você demonstrou afinidade com a criação de soluções digitais. Desenvolvimento de software pode ser um caminho interessante para explorar. Comece conhecendo lógica de programação, HTML, CSS e JavaScript.”

Adapte o conteúdo a cada categoria.

Inclua a observação: “Este resultado é uma orientação inicial baseada nas suas respostas, não uma avaliação definitiva das suas capacidades ou do seu futuro profissional.”

Não use IA externa para calcular os resultados. Implemente a lógica localmente.

## 9. MAPA DE APOIO E OPORTUNIDADES

Crie uma página chamada “Mapa de apoio”, com uma experiência inspirada em aplicativos de mapas.

Objetivo: facilitar a descoberta de recursos que ajudem a usuária a estudar, se qualificar e conciliar responsabilidades de cuidado.

### Categorias do mapa

1. Cursos presenciais de tecnologia.
2. Instituições de ensino e capacitação.
3. Creches e centros de educação infantil.
4. Serviços de apoio à família e à maternidade.
5. Bibliotecas e espaços públicos de estudo.
6. Espaços de coworking ou estudo.

### Interface

Em desktop, utilize uma área ampla de mapa e um painel lateral com resultados.

Em dispositivos móveis, apresente o mapa com uma lista de resultados acessível e adaptável.

Inclua:
- Campo de busca por cidade, bairro ou endereço.
- Filtros por categoria.
- Filtro por gratuidade ou custo.
- Filtro por modalidade presencial.
- Busca por nome.
- Lista de resultados.
- Cartões com nome, categoria, endereço demonstrativo, custo quando conhecido, descrição e informações disponíveis.
- Botão para ver detalhes.
- Botão para abrir o endereço no serviço de mapas, somente quando houver um endereço ou link válido.
- Botão para limpar os filtros.

### Comportamento do protótipo

Não dependa de uma chave de API paga.

Implemente um mapa demonstrativo utilizando uma biblioteca gratuita disponível, como Leaflet com OpenStreetMap, se o ambiente permitir. Se não for possível carregar o mapa externo, crie uma representação visual alternativa com uma área cartográfica ilustrativa, marcadores interativos e uma lista funcional.

Utilize dados de demonstração claramente identificados. Não apresente estabelecimentos fictícios como serviços reais, não invente endereços verificáveis e não afirme que uma creche possui vagas disponíveis.

Os marcadores devem corresponder aos itens da lista. Ao clicar em um marcador, destaque o cartão correspondente. Ao selecionar um cartão, destaque seu marcador.

Permita visualizar cada categoria separadamente e combinar filtros.

### Dados demonstrativos

Crie pelo menos dois registros de exemplo por categoria, com nomes explicitamente identificados como demonstrativos e endereços fictícios não apresentados como estabelecimentos reais.

Para o protótipo, os dados devem demonstrar o funcionamento da interface. Estruture o código para que, futuramente, possam ser substituídos por dados reais verificados.

Inclua um aviso:

“Os locais apresentados nesta demonstração são ilustrativos. Confirme endereço, funcionamento, custos, disponibilidade de vagas e requisitos diretamente com cada instituição.”

Não solicite a localização exata da usuária automaticamente. A busca por cidade ou bairro deve ser suficiente para testar o recurso.

## 10. PLANEJADOR DE ROTINA ADAPTADO À MATERNIDADE

Crie uma funcionalidade para ajudar mulheres a manter uma rotina de desenvolvimento profissional sem depender de horários rígidos.

Nome da seção: “Minha rotina possível”.

A proposta não é montar uma agenda perfeita, mas um plano flexível que respeite tempo disponível, responsabilidades e imprevistos.

### Configuração inicial

Pergunte:
- Quantas horas por semana a usuária consegue dedicar aos estudos?
- Quais dias costuma ter mais disponibilidade?
- Qual período é geralmente melhor: manhã, tarde ou noite?
- Prefere sessões curtas ou longas?
- Tem horários fixos de trabalho, estudo ou cuidado?
- Qual é seu objetivo atual?

Permita pular perguntas opcionais e editar tudo depois.

### Criação automática do plano

Gere uma sugestão semanal com base nas respostas.

Distribua o tempo em blocos curtos e realistas. Exemplos: 15, 25, 30 ou 45 minutos, conforme a preferência da usuária.

Inclua:
- Estudo de uma habilidade.
- Exercícios práticos.
- Revisão.
- Desenvolvimento de projeto.
- Preparação profissional, quando fizer sentido.
- Pausas e tempo livre.

Não preencha automaticamente todos os horários disponíveis. Reserve margem para imprevistos e descanso.

### Visualização

Disponibilize:
- Visão semanal.
- Lista de atividades.
- Dia e horário editáveis.
- Duração estimada.
- Categoria da atividade.
- Botão para concluir.
- Botão para editar.
- Botão para excluir.
- Botão para adicionar atividade.
- Botão “Reorganizar minha semana”.

### Flexibilidade

Implemente uma ação “Hoje não foi como planejado”.

Ao acioná-la, permita:
- Reagendar atividades pendentes.
- Reduzir a duração de uma tarefa.
- Transferir uma tarefa para outro dia.
- Manter uma atividade como pendente sem gerar penalidades.

Não apresente mensagens de culpa, sequências perdidas ou notificações punitivas.

Exemplo de mensagem:

“Tudo bem ajustar o plano. Vamos encontrar um próximo passo que caiba na sua realidade.”

### Progresso

Mostre:
- Tempo planejado na semana.
- Tempo concluído.
- Atividades finalizadas.
- Evolução do plano.

Atualize os números de acordo com as ações realizadas.

O planejador deve funcionar sem serviços externos e salvar suas informações localmente.

## 11. COMUNIDADE

Crie uma comunidade demonstrativa de mulheres interessadas em tecnologia, aprendizado e desenvolvimento profissional.

O objetivo é incentivar troca de experiências, apoio e compartilhamento de oportunidades.

### Interface

Crie um feed com:
- Publicações.
- Nome de exibição.
- Categoria.
- Data relativa ou data de demonstração.
- Texto.
- Quantidade de curtidas.
- Comentários.
- Campo para criar uma publicação.
- Filtros por tema.

Categorias:
- Início na tecnologia.
- Estudos e cursos.
- Maternidade e carreira.
- Primeiro emprego.
- Transição profissional.
- Dúvidas técnicas.
- Conquistas e projetos.

### Funcionalidades

- Criar publicação.
- Curtir e descurtir.
- Comentar.
- Visualizar comentários.
- Filtrar publicações.
- Ordenar por recentes.
- Exibir estado vazio quando não houver publicações.
- Mostrar confirmação após ações.

Crie publicações iniciais de demonstração, identificadas como exemplos do protótipo.

Use conteúdo respeitoso e realista, como dúvidas sobre o primeiro curso de programação, organização de estudos e preparação para entrevistas.

### Segurança e moderação

Inclua ações demonstrativas para denunciar uma publicação e bloquear conteúdo inadequado, com confirmação visual.

Não prometa moderação real ou proteção de dados em produção.

Se não houver backend, deixe claro que a comunidade é demonstrativa e que as publicações são armazenadas apenas localmente.

## 12. MENTORIAS E PREPARAÇÃO PROFISSIONAL

Crie uma área que ajude as usuárias a se prepararem para oportunidades, mesmo que ainda não possuam experiência profissional.

Divida a área em três partes:

### A. Mentorias

Crie cartões demonstrativos de mentoras e sessões temáticas, como:
- Orientação de carreira em tecnologia.
- Como organizar um portfólio.
- Preparação para entrevistas.
- Como retornar ao mercado de trabalho.
- Como criar um currículo para a primeira vaga.

Cada cartão pode apresentar:
- Nome demonstrativo.
- Área de atuação.
- Tema.
- Descrição.
- Formato.
- Duração estimada.
- Botão “Ver detalhes”.
- Botão “Demonstrar interesse”.

Não invente profissionais reais, depoimentos, certificações ou disponibilidade de agenda. Identifique os perfis como exemplos demonstrativos.

Ao demonstrar interesse, exiba uma confirmação e registre a ação localmente. Não afirme que uma mentoria foi efetivamente agendada.

### B. Laboratório de currículo

Implemente um formulário com:
- Nome profissional.
- Objetivo de carreira.
- Resumo profissional.
- Formação.
- Cursos.
- Competências.
- Projetos.
- Experiências, se houver.

Permita montar um currículo de uma página com layout profissional, pré-visualizar e imprimir ou salvar como PDF por meio da função de impressão do navegador.

Não exija experiência profissional. Ofereça um exemplo de currículo para iniciantes e pessoas em transição de carreira.

Inclua orientações sobre como apresentar projetos acadêmicos, estudos independentes e competências transferíveis.

### C. Simulador de entrevista

Crie um simulador interativo com perguntas e respostas abertas.

Inclua perguntas como:
- Conte um pouco sobre você e seu objetivo profissional.
- Por que deseja trabalhar com tecnologia?
- Como você costuma aprender algo novo?
- Conte sobre um problema que resolveu.
- Como organiza suas prioridades?
- O que está fazendo para se preparar para uma oportunidade?

Após cada resposta, ofereça dicas estruturadas de melhoria e um exemplo de resposta, sem afirmar que a resposta será aprovada por recrutadores.

Inclua uma opção de treino técnico com perguntas introdutórias de acordo com a área escolhida.

O feedback deve ser orientativo e implementado com regras locais. Não simule uma avaliação por IA se não existir uma integração real.

## 13. VAGAS, CURSOS E OPORTUNIDADES

Crie uma área de descoberta de oportunidades com cartões e filtros.

### Categorias

- Cursos gratuitos.
- Cursos pagos.
- Bolsas de estudo.
- Eventos e oficinas.
- Vagas de estágio.
- Vagas júnior.
- Programas de formação.
- Oportunidades de retorno ao mercado.

### Filtros

- Categoria.
- Área de tecnologia.
- Modalidade remota, híbrida ou presencial.
- Gratuito ou pago.
- Nível iniciante, intermediário ou avançado.
- Tipo de oportunidade.

### Cartão de oportunidade

Apresente:
- Título.
- Instituição demonstrativa.
- Categoria.
- Modalidade.
- Nível.
- Descrição.
- Requisitos.
- Botão “Ver detalhes”.
- Botão “Salvar oportunidade”.

Crie dados demonstrativos suficientes para testar os filtros e a navegação.

Identifique claramente os dados fictícios. Não invente links de inscrição reais, prazos vigentes ou vagas abertas.

Prepare a estrutura para que, no futuro, cada registro possa receber uma URL verificada de inscrição.

Implemente uma lista de oportunidades salvas, com a possibilidade de remover itens.

## 14. PERFIL E ACOMPANHAMENTO

Crie uma tela de perfil com:
- Nome de exibição.
- Objetivo profissional.
- Área de interesse.
- Disponibilidade de estudo.
- Modalidade de curso preferida.
- Preferências de acessibilidade.
- Progresso na jornada.
- Oportunidades salvas.
- Acesso ao resultado do teste vocacional.
- Acesso ao planejador de rotina.

Permita editar as informações.

Adicione uma seção “Minha jornada” que reúna:
- Etapas concluídas.
- Próxima ação recomendada.
- Cursos ou atividades em andamento.
- Atividades da rotina concluídas.
- Oportunidades salvas.

A atualização das informações deve refletir-se no painel inicial sempre que possível.

## 15. REGRAS DE FUNCIONAMENTO E PERSISTÊNCIA

O protótipo precisa demonstrar interações reais, não apenas aparência visual.

Utilize React, TypeScript, Tailwind CSS e os componentes disponíveis no ambiente Lovable. Aproveite a estrutura e as dependências já existentes, em vez de recriar desnecessariamente o projeto.

Organize o código em componentes reutilizáveis e arquivos separados por funcionalidade.

### Persistência

Se não houver backend configurado, utilize `localStorage` para armazenar:
- Perfil e preferências.
- Respostas do teste vocacional.
- Resultado do teste.
- Plano semanal.
- Atividades concluídas.
- Publicações e comentários demonstrativos.
- Curtidas.
- Oportunidades salvas.
- Interesses em mentorias.
- Progresso da jornada.

Implemente tratamento para dados ausentes ou inválidos e valores padrão para a primeira utilização.

Crie uma ação para limpar os dados demonstrativos e reiniciar o protótipo, com confirmação.

Não exija Supabase, banco de dados remoto, autenticação externa ou chaves privadas para que as funcionalidades principais sejam demonstráveis.

Caso exista infraestrutura de backend já configurada no projeto, aproveite-a sem tornar o protótipo dependente de novas integrações pagas.

### Navegação e estado

- Todas as rotas devem carregar corretamente.
- Os botões devem realizar a ação indicada.
- Os formulários devem validar campos obrigatórios.
- Os filtros devem alterar os resultados.
- Os resultados do teste devem ser calculados pelas respostas.
- O planejamento deve reagir às alterações.
- As atividades concluídas devem atualizar o progresso.
- As informações salvas devem persistir após recarregar a página.
- Exiba estados de carregamento, sucesso, erro e ausência de resultados quando apropriado.
- Implemente tratamento para rotas inexistentes.
- Não deixe links com `href="#"` como substitutos de funcionalidades.
- Não deixe botões importantes sem ação.

## 16. ACESSIBILIDADE, RESPONSIVIDADE E EXPERIÊNCIA

A aplicação deve funcionar em computadores, tablets e celulares.

### Responsividade

- Priorize a experiência desktop para a demonstração, sem prejudicar dispositivos móveis.
- Evite elementos que ultrapassem a largura da tela.
- Adapte tabelas, cartões, menus, formulários e mapas.
- Garanta que os botões sejam confortáveis para tocar em dispositivos móveis.

### Acessibilidade

- Utilize HTML semântico.
- Associe rótulos aos campos de formulário.
- Permita navegação por teclado.
- Mostre indicadores de foco.
- Garanta contraste suficiente entre texto e fundo.
- Não dependa exclusivamente de cores para transmitir informações.
- Adicione textos acessíveis aos ícones.
- Utilize mensagens de erro compreensíveis.
- Evite animações excessivas.
- Respeite preferências de redução de movimento quando aplicável.

### Experiência do usuário

- Não apresente telas excessivamente cheias.
- Utilize textos curtos e claros.
- Evite linguagem excessivamente técnica.
- Forneça explicações para termos desconhecidos.
- Mostre o próximo passo com clareza.
- Permita voltar, editar e corrigir respostas.
- Evite que a usuária perca informações ao navegar entre telas.

## 17. DADOS DE DEMONSTRAÇÃO

Prepare dados iniciais para permitir uma demonstração completa sem cadastro real.

Utilize um perfil de exemplo chamado Ana, com o objetivo de iniciar uma carreira em tecnologia e disponibilidade de estudos limitada.

Inclua:
- Um resultado demonstrativo de orientação profissional.
- Uma rotina semanal inicial.
- Pelo menos seis oportunidades fictícias distribuídas entre cursos, bolsas, eventos e vagas.
- Pelo menos doze publicações fictícias na comunidade.
- Pelo menos seis perfis demonstrativos de mentoria.
- Registros ilustrativos para as seis categorias do mapa.
- Um exemplo de currículo para iniciante.
- Um conjunto de perguntas para o simulador de entrevista.

Os dados fictícios devem estar claramente marcados como demonstrativos e não devem ser confundidos com serviços, pessoas, empresas ou vagas reais.

Permita que a usuária experimente as funcionalidades sem precisar preencher tudo manualmente.

## 18. CRITÉRIOS DE ACEITAÇÃO

Considere o protótipo pronto para apresentação quando:

1. A landing page estiver visualmente finalizada e responsiva.
2. O usuário conseguir navegar entre todas as seções.
3. O cadastro demonstrativo levar ao painel.
4. O teste vocacional aceitar respostas e gerar resultados coerentes.
5. O mapa permitir filtrar categorias e selecionar itens.
6. O planejador permitir criar, editar, concluir e reagendar atividades.
7. A comunidade permitir publicar, curtir e comentar localmente.
8. A área de mentorias permitir visualizar detalhes e demonstrar interesse.
9. O laboratório de currículo gerar uma pré-visualização imprimível.
10. O simulador de entrevista permitir responder perguntas e visualizar orientações.
11. A área de oportunidades permitir filtrar e salvar itens.
12. O perfil refletir as preferências e o progresso da usuária.
13. Os dados principais persistirem após atualizar a página.
14. A interface funcionar em telas pequenas.
15. Não existirem botões principais sem funcionalidade.
16. Os dados demonstrativos estiverem identificados como fictícios.
17. Não houver erros de compilação, rotas quebradas ou telas essenciais vazias.

## 19. ORDEM DE IMPLEMENTAÇÃO

Implemente nesta ordem, mantendo a aplicação utilizável em cada etapa:

**Prioridade 1 — Estrutura e identidade**
- Layout global.
- Design system.
- Navegação.
- Landing page.
- Cadastro demonstrativo.
- Painel inicial.

**Prioridade 2 — Funcionalidades centrais**
- Teste vocacional com cálculo real de resultados.
- Mapa com filtros e marcadores demonstrativos.
- Planejador semanal com persistência local.

**Prioridade 3 — Desenvolvimento profissional**
- Oportunidades e filtros.
- Mentorias demonstrativas.
- Laboratório de currículo.
- Simulador de entrevistas.

**Prioridade 4 — Comunidade e acabamento**
- Feed interativo.
- Perfil e progresso.
- Estados vazios, mensagens de confirmação e tratamento de erros.
- Responsividade e acessibilidade.
- Teste de todas as rotas e ações principais.

Se alguma funcionalidade avançada não puder ser concluída integralmente, implemente a versão demonstrativa mais funcional possível, sem interromper o restante da aplicação.

Não substitua funcionalidades importantes por cartões estáticos apenas para dar a impressão de que foram concluídas.

## 20. INSTRUÇÃO FINAL

Comece a desenvolver a aplicação completa agora.

Primeiro, estabeleça a identidade visual e a arquitetura de navegação. Em seguida, implemente as funcionalidades e conecte seus estados, dados demonstrativos e persistência local.

Não responda apenas com um plano de desenvolvimento, uma lista de sugestões ou uma explicação do que faria. Execute a implementação no projeto.

Evite explicações longas durante o desenvolvimento. Tome decisões de implementação por conta própria e priorize um protótipo coeso, visualmente refinado e funcional.

O resultado deve transmitir a ideia de uma plataforma de impacto social que realmente ajuda mulheres a descobrir caminhos na tecnologia, organizar sua formação e se preparar para oportunidades profissionais.

**A essência do ÍRIS é transformar a falta de orientação em caminhos concretos para o futuro profissional de mulheres.**