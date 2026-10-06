# CineMatch Web

Projeto web de uma aplicação de recomendação e catálogo de séries, desenvolvida para coletar preferências do usuário e apresentar conteúdos de acordo com seus gêneros favoritos.

## Tecnologias

- HTML5
- CSS
- JavaScript
- JavaScript Modules (`type="module"`)

## Interface

A interface utiliza uma identidade visual baseada principalmente nas seguintes variáveis CSS:

- `--aqua`: cor principal;
- `--aqua-dark`: cor de destaque e títulos;
- `--aqua-light`: fundos e estados suaves;
- `--orange`: ações principais;
- `--orange-dark`: estado de interação;
- `--text`: texto principal;
- `--text-light`: texto secundário;
- `--border`: bordas;
- `--background`: fundo geral;
- `--white`: superfícies claras.

A identidade visual deve ser mantida através dessas variáveis. Evite adicionar cores isoladas diretamente aos componentes quando uma variável existente atender à necessidade.

## Cadastro do usuário

O formulário possui:

- e-mail;
- nome;
- data de nascimento;
- seleção de gêneros favoritos;

Os campos obrigatórios são identificados visualmente por `*` e também utilizam atributos de acessibilidade, como `required` e `aria-required`.

## Responsividade

A estratégia utilizada é mobile-first.

## Acessibilidade

Foram adotadas práticas básicas de acessibilidade:

- `lang="pt-BR"` no documento;
- `meta viewport`;
- link para pular diretamente ao conteúdo;
- hierarquia de títulos;
- `fieldset` e `legend` para agrupamento dos campos;
- associação explícita entre `label` e `input`;
- `required` e `aria-required` nos campos obrigatórios;

## JavaScript

O HTML carrega:

```html
<script type="module" src="./js/script.js"></script>
```

## Como executar

Por utilizar módulos JavaScript, recomenda-se executar o projeto por um servidor HTTP local em vez de abrir diretamente o `index.html` pelo sistema de arquivos.

Exemplo com uma extensão de servidor local:

1. abra a pasta do projeto no editor;
2. instale e execute a extensão Live-server do VS Code;
3. acesse o endereço "http://localhost:5500";
4. abra o `index.html`.

