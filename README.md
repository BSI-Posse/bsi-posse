# Site Institucional — Bacharelado em Sistemas de Informação

**Instituto Federal Goiano — Campus Posse**

Site institucional moderno, responsivo e acessível para apresentação e divulgação do
curso de Bacharelado em Sistemas de Informação. Desenvolvido com **HTML5, CSS3 e
JavaScript puro** (sem frameworks, sem dependências), como site estático — fácil de
hospedar e manter.

## Como visualizar

Basta abrir o arquivo `index.html` em um navegador. Para o funcionamento completo da
verificação de PDFs, é recomendado servir a pasta por HTTP:

```bash
# Python (exemplo)
python -m http.server 8080
# depois acesse http://localhost:8080
```

## Estrutura do projeto

```
sitesi/
│
├── index.html                 # Página única (one page)
├── README.md
│
├── assets/
│   ├── images/
│   │   ├── logo-si.png            # Logo principal (versão rosa, fundo transparente)
│   │   ├── logo-si-prata.png      # Logo para fundos escuros (rodapé)
│   │   ├── logo-si-220.png        # Logo reduzida (navbar)
│   │   ├── logo-si-prata-220.png  # Logo reduzida clara (rodapé)
│   │   ├── favicon.png            # Ícone da aba (emblema)
│   │   ├── apple-touch-icon.png
│   │   ├── og-si.jpg              # Imagem de compartilhamento (1200×630)
│   │   ├── campus/                # Fotos reais do campus
│   │   │   ├── fachada-campus.jpg     # Fachada do Campus Posse
│   │   │   ├── laboratorio-1..4.jpg   # Laboratórios de informática
│   │   │   ├── auditório.jpg          # Auditório em atividade
│   │   │   ├── biblioteca.jpg         # Biblioteca do campus
│   │   │   └── aerea-campus.jpg       # Vista aérea do campus
│   │   ├── students/              # ← futuras imagens de estudantes
│   │   └── projects/              # ← imagens dos projetos acadêmicos
│   ├── documents/
│   │   └── ppc-sistemas-informacao.pdf   # Projeto Pedagógico do Curso
│   └── icons/                    # reservado para ícones avulsos
│
├── css/
│   ├── variables.css       # Tokens de design (cores, tipografia, espaçamentos)
│   ├── style.css           # Base, layout, hero, seções e rodapé
│   ├── components.css      # Navbar, botões, cards, accordions, galeria etc.
│   └── responsive.css      # Ajustes por breakpoint e estilo de impressão
│
└── js/
    ├── main.js             # Ano dinâmico, verificação de PDFs, animação de entrada
    ├── navigation.js       # Menu mobile, navbar fixa, link ativo, scroll suave
    ├── accordion.js        # Accordions acessíveis (FAQ e matriz curricular)
    └── projects.js         # Renderização dos projetos acadêmicos
```

## Identidade visual

- **Cores:** roxo `#6D28D9`, roxo escuro `#4C1D95`, lilás `#A855F7`, fundo `#F7F7FA`,
  branco `#FFFFFF`, cinzas `#E5E7EB` / `#9CA3AF`, texto `#17171C`.
  Todos os tokens estão centralizados em `css/variables.css`.
- **Tipografia:** Inter (Google Fonts), com fallback para a fonte do sistema.
- **Logo:** usadas somente as versões originais fornecidas (`SI-rosa` e `SI-prata`),
  redimensionadas e otimizadas — proporção, cores e transparência preservadas.
  Não editar a logo original.

## Como manter o site

### Adicionar um projeto acadêmico

Edite `js/projects.js` e cadastre um objeto no array `PROJECTS`. Exemplo:

```js
var PROJECTS = [
  {
    title: "Nome do projeto",
    category: "Programação",   // ou: Site, App, Sistema, Pesquisa, Extensão, Evento
    description: "Descrição curta do projeto.",
    image: "assets/images/projects/meu-projeto.jpg", // opcional
    team: "Equipe ou autores",                       // opcional
    techs: ["HTML", "CSS", "JavaScript"],            // opcional
    link: "https://...",                             // opcional
    linkLabel: "Acesse o projeto"                    // opcional
  }
];
```

Enquanto o array estiver vazio, a seção exibe um estado vazio elegante.

### Adicionar o PPC (Projeto Pedagógico do Curso)

O site disponibiliza o PPC para visualização e download. Coloque o arquivo em
`assets/documents/` com o nome:

- `ppc-sistemas-informacao.pdf`

Os botões "Visualizar" e "Baixar" aparecem automaticamente quando o arquivo existe
(verificação via JavaScript). Enquanto não houver PDF, o site exibe "PDF em breve" —
**nunca há links quebrados**. Ao atualizar o PPC, substitua o arquivo mantendo o nome.

### Adicionar fotos do campus

As fotos atuais estão em `assets/images/campus/` (fachada e laboratórios, recortadas
em 4:3 e otimizadas). Para acrescentar uma nova foto:

1. Salve o arquivo em `assets/images/campus/` (recomendado: JPEG, lado maior ≤ 1200 px,
   recorte 4:3 para preencher o tile sem distorção).
2. Em `index.html`, na galeria da seção **Campus Posse**, copie um bloco existente:

```html
<figure class="gallery__item gallery__item--photo">
  <img src="assets/images/campus/nova-foto.jpg" width="1200" height="900"
       alt="Descrição objetiva da foto" loading="lazy">
</figure>
```

Use apenas fotografias reais autorizadas. Não inserir imagens geradas por IA do campus.

### Atualizar informações acadêmicas

- **Dados do curso, matriz e laboratórios:** fonte é o PPC
  (`PPC_-_SI_2025.pdf`). Ao atualizar o PPC, revise as seções
  *Informações gerais* e *Matriz curricular* em `index.html`.
- **Contatos e coordenação:** seção *Contato* em `index.html`.
- **Ano do rodapé:** automático (`js/main.js`).

### Atualizar a cor ou o espaçamento

Altere os valores em `css/variables.css` — todo o site consome esses tokens.

## Acessibilidade implementada

- HTML semântico (`header`, `main`, `section`, `nav`, `footer`, `dl`, `figure`).
- Link "Pular para o conteúdo principal".
- Menu mobile com `aria-expanded`, fechamento por `Escape` e foco gerenciado.
- Accordions com botões reais (`aria-expanded` + `aria-controls` + `role="region"`)
  e conteúdo fechado removido da navegação por teclado (atributo `inert`).
- Contraste de texto verificado nas seções claras e escuras.
- Estados de foco visíveis; alvos de toque com boa altura.
- Animações desligadas automaticamente para quem usa
  *reduzir movimento* (`prefers-reduced-motion`).
- Sem informação transmitida apenas por cor.

## SEO

- `title` e `meta description` específicos do curso.
- Open Graph e Twitter Card (após publicar, torne a URL da imagem absoluta).
- Favicon e `apple-touch-icon`.
- Hierarquia de títulos: um único `h1` no hero e `h2` por seção.
- Dados estruturados JSON-LD do tipo `Course`.

## Checklist antes de hospedar

### Conteúdo (confirmação institucional)

1. **Fotos reais do campus** — ✔️ adicionadas (fachada, 4 laboratórios, auditório,
   biblioteca e vista aérea); novas fotos pelo procedimento acima.
2. **PPC em PDF** — ✔️ publicado em `assets/documents/ppc-sistemas-informacao.pdf`
   (substituir mantendo o nome quando houver nova edição do PPC).
3. **CEP do campus** — o próprio PPC traz dois valores diferentes
   (73903-000 na identificação e 73.900-000 na infraestrutura); por isso o CEP
   não foi publicado. Confirmar antes de incluir.
4. **URL do portal do Campus Posse** (`https://www.ifgoiano.edu.br/posse`) —
   extraída do PPC; validar se continua ativa.
5. **Vagas, carga horária, turnos e duração** — conferidos entre briefing, anotações
   e PPC (40 vagas, 3.000 h, noturno, 4 anos/8 semestres). Reconfirmar a cada edição do PPC.
6. **E-mails e coordenação** — `si.pos@ifgoiano.edu.br` e
   `reidner.cavalcante@ifgoiano.edu.br` (não foram informados no PPC; vieram do
   material de anotações/briefing).
7. **Início das atividades do curso** — o PPC informa 2026; a informação não foi
   publicada no site por não haver confirmação de calendário.
8. **Identidade cromática** — o briefing sugere "tons de verde", mas a direção final
   adotada é roxo/lilás, coerente com a logo do curso.

### Técnico (antes do upload)

1. **Abrir o site localmente** e testar: menu mobile, rolagem, acordeões,
   galeria, PPC (visualizar/baixar), mapa e todos os links externos.
2. **Conferir links externos** — todos apontam para domínios oficiais
   (`ifgoiano.edu.br`, `google.com`, `instagram.com`) e abrem em nova aba
   com `rel="noopener"`.
3. **Tornar a URL do Open Graph absoluta** — após hospedar, editar
   `og:image`/`twitter:image` em `index.html` com a URL final
   (ex.: `https://seudominio.com/assets/images/og-si.jpg`).
4. **Adicionar `robots.txt` e `sitemap.xml`** na raiz (hospedagem não exige,
   mas melhora a indexação).
5. **Testar em celular real** (ou DevTools) em 360 px: sem rolagem horizontal,
   menu acessível, mapa e fotos carregando.
6. **Lighthouse** no endereço publicado: meta 100/100/100 (o site local já
   atinge essa pontuação).
7. **Compressão ativa** no hospedeiro (gzip/brotli) — o site é leve
   (~1,5 MB no total, sendo ~900 KB de fotos).

### Segurança

Este é um site **100 % estático**: não há banco de dados, nem formulários
processados no servidor, nem login — não existe superfície de ataque do lado
do servidor. O que protege a publicação:

1. **Hospedagem com HTTPS** — certificado válido (GitHub Pages, Netlify,
   Vercel e afins já fornecem).
2. **Comentários de código removidos** — HTML, CSS e JS limpos antes de
   publicar (nenhuma instrução interna fica visível na página).
3. **Nenhum segredo no código** — não há chaves, tokens ou senhas nos
   arquivos; o iframe do Google Maps usa a chave pública do próprio embed.
4. **Links externos endurecidos** — todos com `rel="noopener noreferrer"`,
   impedindo que a aba aberta acesse `window.opener`.
5. **Conteúdo imutável** — como não há backend, invadir o site se resume a
   comprometer a conta do hospedeiro: use senha forte + 2FA na conta de
   hospedagem e mantenha o acesso restrito.
6. **Sem dependências de terceiros exceto Google Fonts** — se preferir
   eliminar por completo requisições externas, baixe a Inter e sirva-a
   localmente (opcional).

## Navegação do site

Início · O curso · Formação · Carreiras · Projetos · Ingresso · Campus —
além de seções de *Informações gerais*, *Tecnologia na região*, *Quebrando mitos*,
*Materiais*, *Instagram* e *Contato*.

## Compatibilidade

Navegadores modernos (Chrome, Edge, Firefox e Safari atuais). Sem build, sem
transpilação e sem bibliotecas externas — apenas a folha de estilo do Google Fonts
(possui fallback local caso não carregue).

## Melhorias planejadas (próximas etapas)

Itens registrados para acompanhamento:

1. ~~**Prévia do mapa do campus**~~ — ✔️ **aplicado**: iframe do Google Maps na
   seção *Campus Posse* (com link "Abrir no Google Maps").
2. ~~**Refinamento do design**~~ — ✔️ **aplicado** (3 rodadas, ver observação abaixo).
3. **Publicação** — hospedar e completar o checklist acima (URL absoluta do
   Open Graph, `robots.txt`, `sitemap.xml`).

> Observação: três rodadas de refinamento foram aplicadas em 23–25/11/2026:
> **1ª** — navbar com vidro fosco, elevação de cards/botões no hover, traço nos
> rótulos de seção, flutuação da logo no hero, entrada escalonada dos grids e
> cantos mais suaves; **2ª** — indicador deslizante no menu ativo (com prévia no
> hover), gradiente e texto em degradê no hero, ícones dos cards com degradê e
> textura de pontos nas seções *O curso* e *Contato*; **3ª** — gradientes leves
> no botão primário, na barra de CTA, no rodapé, nos traços dos rótulos e na
> seção escura, além da foto aérea do campus. Tudo desligado automaticamente
> para quem usa *reduzir movimento*.
