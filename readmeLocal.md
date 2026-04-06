# 🏠 VA. Lima Imóveis — Next.js 14 + TypeScript + Supabase

Site completo de imobiliária com painel administrativo seguro.

---

## 🚀 Instalação

```bash
npm install
cp .env.example .env.local
# Preencha o .env.local com suas chaves (veja abaixo)
npm run dev
```

---

## ⚙️ Configuração do .env.local

### 1. JWT Secret
```bash
# Gere um segredo forte:
openssl rand -base64 64
# Cole o resultado em JWT_SECRET
```

### 2. Hash da senha do admin
```bash
npm run hash-password -- SuaSenhaAqui
# Cole o hash em ADMIN_PASSWORD_HASH
```

### 3. Supabase
No painel Supabase → **Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon / public key
- `SUPABASE_SERVICE_ROLE_KEY` → service_role key ⚠️ NUNCA exponha essa chave

---

## 🗄️ Setup do Supabase

### Criar a tabela `properties`
Execute no **SQL Editor** do Supabase:

```sql
create table properties (
  id            bigint generated always as identity primary key,
  title         text not null,
  price         numeric not null,
  contract_type text,
  description   text,
  bedrooms      int4,
  bathrooms     int4,
  parkingspots  int4,
  area          numeric,
  type          text,
  status        text default 'disponivel',
  neighborhood  text,
  city          text,
  images_       text,
  address       text,
  state         text,
  featured      bool default false,
  created_at    timestamptz default now()
);

-- Permite leitura pública dos imóveis disponíveis (anon key)
alter table properties enable row level security;

create policy "Leitura pública — apenas disponíveis"
  on properties for select
  using (status = 'disponivel');

create policy "Admin pode tudo"
  on properties for all
  using (true)
  with check (true);
```

### Criar o bucket de Storage para fotos
1. Supabase Dashboard → **Storage → New bucket**
2. Nome: `imoveis`
3. Marcar como **Public bucket** (para que as URLs sejam acessíveis)
4. Configurar CORS se necessário

---

## 🔐 Acessar o Admin

URL (não linkada em lugar algum):
```
http://localhost:3000/admin/login
```

Em produção: `https://seudominio.com.br/admin/login`

### Segurança implementada
- ✅ Middleware Next.js bloqueia todas as rotas `/admin/*` sem JWT
- ✅ Cookie `httpOnly` + `SameSite=strict` (token nunca acessível pelo JS)
- ✅ Senha armazenada apenas como hash bcrypt (custo 12)
- ✅ Rate limit: 5 tentativas por 15 minutos por IP
- ✅ Página de login **não indexada** pelo Google
- ✅ `SUPABASE_SERVICE_ROLE_KEY` usada apenas no servidor (nunca exposta ao cliente)

---

## 📄 Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — imóveis em destaque do Supabase |
| `/imoveis` | Listagem filtrada — apenas `status=disponivel` |
| `/imoveis/[id]` | Detalhe do imóvel (abre em nova aba) |
| `/quem-somos` | Sobre a empresa |
| `/localizacao` | Mapa + contato |
| `/admin/login` | Login do admin (oculto) |
| `/admin` | Dashboard |
| `/admin/imoveis` | Listar / excluir imóveis |
| `/admin/imoveis/novo` | Cadastrar imóvel |
| `/admin/imoveis/[id]/editar` | Editar imóvel + gerenciar fotos |

---

## 🔧 Personalizações rápidas

| O que mudar | Onde |
|---|---|
| Número do WhatsApp | Buscar `5511999999999` em todos os arquivos |
| Endereço / contato | `app/localizacao/page.tsx` e `components/Footer.tsx` |
| Mapa (Google Maps embed) | `app/localizacao/page.tsx` → variável `mapSrc` |
| URL do site | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |
