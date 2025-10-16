
# Horyzonty Nauki – Next.js + Supabase Starter

Minimalny szkielet aplikacji z logowaniem (uczeń/nauczyciel/admin) i ochroną stron.
Gotowe do wdrożenia na **Vercel**.

## Szybki start

```bash
pnpm i  # albo: npm i / yarn
cp .env.example .env.local
# Uzupełnij wartości z Supabase
pnpm dev
```

## Supabase – krok po kroku

1. Wejdź na https://supabase.com i utwórz nowy projekt.
2. Skopiuj `Project URL` i `anon public key` → wklej do `.env.local`.
3. W SQL Editor wklej ten skrypt, aby utworzyć profil i role:

```sql
-- Tabela profili
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  created_at timestamp with time zone default now()
);

-- Włącz RLS
alter table public.profiles enable row level security;

-- Każdy widzi swój profil
create policy "Users can select their own profile"
on public.profiles for select
using ( auth.uid() = user_id );

-- Użytkownik może dodać/aktualizować Swój profil
create policy "Users can insert their own profile"
on public.profiles for insert
with check ( auth.uid() = user_id );

create policy "Users can update their own profile"
on public.profiles for update
using ( auth.uid() = user_id );

-- Admin może wszystko (po nadaniu roli w kolumnie role)
create policy "Admins can do anything"
on public.profiles
for all
using ( exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin') )
with check ( exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin') );
```

4. (Opcjonalnie) w **Authentication → Providers** włącz logowanie e-mail/hasło.
5. Dodaj do `Authentication → URL Configuration`:
   - Site URL: `http://localhost:3000` (dev) oraz produkcyjny `https://horyzontynauki.com`.

## Deploy na Vercel

1. Zrób repo na GitHub i wyślij kod.
2. W Vercel → *New Project* → wybierz repo.
3. W *Environment Variables* dodaj wartości z `.env.local`.
4. Deploy. Dodaj domenę w *Settings → Domains*.

## Role

- Domyślnie nowy użytkownik dostaje `student`.
- Administratora ustawisz ręcznie w Supabase: `update profiles set role='admin' where user_id='...'`.
- Dostęp do stron jest weryfikowany na serwerze (Server Components).
