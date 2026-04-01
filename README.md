# 🏠 Nobre Imóveis — Site Imobiliário em Next.js + TypeScript

Site completo de imobiliária com design refinado e profissional.

## 🎨 Design

- **Paleta 70-20-10:**
  - 70% → Branco quente / cinza clarinho (`#F5F4F0`)
  - 20% → Azul navy profundo (`#0F1E2B`)
  - 10% → Dourado âmbar (`#C9A05A`)
- **Tipografia:** Playfair Display (títulos) + Outfit (corpo)
- Animações suaves, hover states elegantes, lightbox de fotos com zoom

## 📄 Páginas

| Rota | Descrição |
|---|---|
| `/` | Home com hero, destaques e diferenciais |
| `/imoveis` | Listagem com filtro (Todos / Apartamento / Casa) + busca |
| `/imoveis/[id]` | Detalhe do imóvel — abre em nova aba (`_blank`) |
| `/quem-somos` | Sobre a empresa, time e valores |
| `/localizacao` | Mapa embutido Google Maps + informações de contato |
| `*` | Página 404 personalizada |

## ✨ Funcionalidades

- ✅ Filtro por tipo (Apartamento / Casa)
- ✅ Busca por bairro ou cidade
- ✅ Galeria de imagens com lightbox fullscreen
- ✅ Zoom nas fotos (clique ou botão)
- ✅ Navegação entre fotos (teclado ← → ou botões)
- ✅ Thumbnails no lightbox
- ✅ Botão flutuante do WhatsApp
- ✅ Header com scroll e menu mobile
- ✅ Footer completo com navegação
- ✅ Totalmente responsivo

## 🚀 Instalação e uso

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Acessar no navegador
http://localhost:3000
```

## 📝 Personalização

### Trocar nome e dados da imobiliária
- **Nome/marca:** `components/Header.tsx` e `components/Footer.tsx`
- **WhatsApp:** Buscar `5511999999999` e substituir pelo número real
- **Endereço/contato:** `app/localizacao/page.tsx` e `components/Footer.tsx`
- **CRECI:** `components/Footer.tsx`

### Adicionar imóveis reais
Edite o arquivo `data/properties.ts` seguindo o modelo existente.
Substitua as URLs das imagens por fotos reais dos imóveis.

### Trocar imagens do hero
- Hero da Home: `app/page.tsx` → URL do Unsplash
- Seção CTA: `app/page.tsx` → segunda imagem
- Quem Somos: `app/quem-somos/page.tsx`

### Mapa (Localização)
Substitua o `mapSrc` em `app/localizacao/page.tsx` com o embed do Google Maps
do endereço real. No Google Maps: **Compartilhar → Incorporar um mapa → Copiar HTML**
(pegue apenas o valor do atributo `src`).

## 🏗️ Estrutura do projeto

```
imoveis-site/
├── app/
│   ├── layout.tsx          # Layout raiz (Header + Footer + WhatsApp)
│   ├── page.tsx            # Home
│   ├── not-found.tsx       # Página 404
│   ├── globals.css         # Estilos globais + Tailwind
│   ├── imoveis/
│   │   ├── page.tsx        # Listagem com filtros
│   │   └── [id]/
│   │       └── page.tsx    # Detalhe do imóvel
│   ├── quem-somos/
│   │   └── page.tsx
│   └── localizacao/
│       └── page.tsx
├── components/
│   ├── Header.tsx          # Navbar responsivo com scroll
│   ├── Footer.tsx          # Footer completo
│   ├── WhatsAppButton.tsx  # Botão flutuante WhatsApp
│   ├── PropertyCard.tsx    # Card do imóvel
│   ├── ImageGallery.tsx    # Galeria com lightbox + zoom
│   └── FilterBar.tsx       # Filtros de tipo
├── data/
│   └── properties.ts       # Dados mock dos imóveis
├── types/
│   └── index.ts            # TypeScript interfaces
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## 🛠 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)
- **Google Fonts** — Playfair Display + Outfit
