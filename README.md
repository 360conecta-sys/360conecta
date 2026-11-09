# 360conecta

Site estático do portal 360 CONECTA, feito em HTML, CSS e JavaScript puro. Não usa Supabase nem precisa de processo de build.

## Páginas
- `index.html` — página inicial
- `categorias.html` — segmentos de empresas
- `anunciantes.html` — diretório com busca e filtro
- `anunciante.html?id=360-conecta` — modelo de página individual do anunciante
- `planos.html` — planos de divulgação
- `sobre.html` — informações do portal

## Cadastrar um anunciante com página própria
Edite `advertisers-data.js` no GitHub e acrescente um objeto na lista `window.ADVERTISERS`. Use um `id` único, sem espaços, e informe nome, categoria, descrição, cidade, telefone, URL do banner, URL do logo e até cinco URLs de fotos. O cartão entra automaticamente no diretório e o perfil abre em `anunciante.html?id=ID`.

Exemplo de campos do cadastro:

```js
{
  id: "minha-empresa",
  name: "Minha Empresa",
  category: "Alimentação",
  description: "Descrição do negócio",
  city: "Caçapava do Sul",
  phone: "5553999999999",
  logo: "imagens/minha-empresa-logo.jpg",
  cover: "imagens/minha-empresa-banner.jpg",
  photos: ["imagens/foto1.jpg", "imagens/foto2.jpg", "imagens/foto3.jpg", "imagens/foto4.jpg", "imagens/foto5.jpg"]
}
```

Para usar imagens próprias, adicione os arquivos de imagem ao repositório (por exemplo, numa pasta `imagens/`) e referencie os caminhos. Este processo gera páginas individuais por identificador, mas o cadastro ainda é feito editando `advertisers-data.js` no GitHub; um formulário de administração que salve diretamente exigiria backend/CMS e autenticação.

## Editar pelo GitHub
Abra o arquivo desejado no repositório, clique no ícone de lápis (**Edit this file**), faça as alterações e selecione **Commit changes**. Para mudar o visual, edite `styles.css`; para ajustar busca e contatos, edite `script.js`.

Para configurar o WhatsApp, edite `WHATSAPP_NUMBER` no início de `script.js` com o número do portal, incluindo código do país e DDD, somente números. O telefone individual do anunciante é informado em `advertisers-data.js`.

## Publicar no GitHub Pages
No repositório, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**. O GitHub Pages publicará a página inicial a partir de `index.html`.
