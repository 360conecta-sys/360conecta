# 360conecta

Site estático do portal 360 CONECTA, feito em HTML, CSS e JavaScript puro. Não usa Supabase nem precisa de processo de build.

## Páginas
- `index.html` — página inicial
- `categorias.html` — segmentos de empresas
- `anunciantes.html` — diretório com busca e filtro
- `planos.html` — planos de divulgação
- `sobre.html` — informações do portal

## Editar pelo GitHub
Abra o arquivo desejado no repositório, clique no ícone de lápis (**Edit this file**), faça as alterações e selecione **Commit changes**. Para mudar o visual, edite `styles.css`; para ajustar busca e contatos, edite `script.js`.

Para alterar o número de WhatsApp, edite a constante `WHATSAPP_NUMBER` no início de `script.js`, usando apenas números (código do país + DDD + telefone).

## Publicar no GitHub Pages
No repositório, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**. O GitHub Pages publicará a página inicial a partir de `index.html`.
