-- =====================================================================
-- TECHFORT INSIGHT HUB — SUPABASE DATABASE SCHEMA SETUP
-- =====================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com)
-- to initialize all required tables, columns, and security policies.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROGRAMS TABLE
create table if not exists public.programs (
    id uuid default gen_random_uuid() primary key,
    tag text not null default '',
    title text not null default '',
    overview text not null default '',
    goals text[] not null default '{}',
    impact text not null default '',
    outcomes text[] not null default '{}',
    future text not null default '',
    "order" integer default 0
);

-- 2. SESSIONS TABLE
create table if not exists public.sessions (
    id uuid default gen_random_uuid() primary key,
    title text not null default '',
    date text not null default '',
    category text not null default '',
    status text not null default 'upcoming',
    "order" integer default 0,
    theme text default ''
);

-- 3. ARTICLES (RESEARCH) TABLE
create table if not exists public.articles (
    id uuid default gen_random_uuid() primary key,
    tag text not null default '',
    title text not null default '',
    excerpt text not null default '',
    "order" integer default 0
);

-- 4. RESOURCES TABLE
create table if not exists public.resources (
    id uuid default gen_random_uuid() primary key,
    course_title text not null default '',
    pdf_url text not null default '',
    resource_id text not null default '',
    "order" integer default 0
);

-- 5. SOCIAL LINKS TABLE
create table if not exists public.social_links (
    id uuid default gen_random_uuid() primary key,
    platform text not null default '',
    url text not null default '',
    icon text not null default 'Globe',
    "order" integer default 0
);

-- 6. PARTNERS TABLE
create table if not exists public.partners (
    id uuid default gen_random_uuid() primary key,
    name text not null default '',
    logo_url text not null default '',
    "order" integer default 0
);

-- 7. SPEAKERS TABLE
create table if not exists public.speakers (
    id uuid default gen_random_uuid() primary key,
    name text not null default '',
    picture_url text not null default '',
    short_bio text not null default '',
    date text not null default '',
    theme text not null default '',
    type text not null default 'upcoming',
    "order" integer default 0
);

-- 8. TEAM MEMBERS TABLE
create table if not exists public.team_members (
    id uuid default gen_random_uuid() primary key,
    name text not null default '',
    role text not null default '',
    specialization text not null default '',
    picture_url text not null default '',
    linkedin_url text not null default '',
    twitter_url text not null default '',
    "order" integer default 0
);

-- 9. SITE SETTINGS TABLE
create table if not exists public.site_settings (
    id text primary key default 'global',
    about_hero_url text not null default '',
    logo_url text default '',
    hero_bg_url text default ''
);

-- Ensure site_settings columns exist if table was created previously
alter table public.site_settings add column if not exists logo_url text default '';
alter table public.site_settings add column if not exists hero_bg_url text default '';
alter table public.sessions add column if not exists theme text default '';
alter table public.speakers add column if not exists "order" integer default 0;


-- Insert default site settings if empty
insert into public.site_settings (id, about_hero_url, logo_url, hero_bg_url)
values ('global', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070', '', '')
on conflict (id) do nothing;

-- 10. GALLERY IMAGES TABLE
create table if not exists public.gallery_images (
    id uuid default gen_random_uuid() primary key,
    url text not null default '',
    caption text default '',
    "order" integer default 0
);

-- 11. APPLICATIONS TABLE (Submissions)
create table if not exists public.applications (
    id uuid default gen_random_uuid() primary key,
    name text not null default '',
    email text not null default '',
    country text not null default '',
    org text not null default '',
    track text not null default '',
    message text not null default '',
    status text not null default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. CONTACTS TABLE (Inquiries)
create table if not exists public.contacts (
    id uuid default gen_random_uuid() primary key,
    name text not null default '',
    email text not null default '',
    org text not null default '',
    subject text not null default '',
    message text not null default '',
    read boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

-- Enable RLS on all tables
alter table public.programs enable row level security;
alter table public.sessions enable row level security;
alter table public.articles enable row level security;
alter table public.resources enable row level security;
alter table public.social_links enable row level security;
alter table public.partners enable row level security;
alter table public.speakers enable row level security;
alter table public.team_members enable row level security;
alter table public.site_settings enable row level security;
alter table public.gallery_images enable row level security;
alter table public.applications enable row level security;
alter table public.contacts enable row level security;

-- 1. Public Select (Read) / Admin Write Policies
create policy "Allow public read access for programs" on public.programs for select using (true);
create policy "Allow admin write access for programs" on public.programs for all using (auth.role() = 'authenticated');

create policy "Allow public read access for sessions" on public.sessions for select using (true);
create policy "Allow admin write access for sessions" on public.sessions for all using (auth.role() = 'authenticated');

create policy "Allow public read access for articles" on public.articles for select using (true);
create policy "Allow admin write access for articles" on public.articles for all using (auth.role() = 'authenticated');

create policy "Allow public read access for resources" on public.resources for select using (true);
create policy "Allow admin write access for resources" on public.resources for all using (auth.role() = 'authenticated');

create policy "Allow public read access for social_links" on public.social_links for select using (true);
create policy "Allow admin write access for social_links" on public.social_links for all using (auth.role() = 'authenticated');

create policy "Allow public read access for partners" on public.partners for select using (true);
create policy "Allow admin write access for partners" on public.partners for all using (auth.role() = 'authenticated');

create policy "Allow public read access for speakers" on public.speakers for select using (true);
create policy "Allow admin write access for speakers" on public.speakers for all using (auth.role() = 'authenticated');

create policy "Allow public read access for team_members" on public.team_members for select using (true);
create policy "Allow admin write access for team_members" on public.team_members for all using (auth.role() = 'authenticated');

create policy "Allow public read access for site_settings" on public.site_settings for select using (true);
create policy "Allow admin write access for site_settings" on public.site_settings for all using (auth.role() = 'authenticated');

create policy "Allow public read access for gallery_images" on public.gallery_images for select using (true);
create policy "Allow admin write access for gallery_images" on public.gallery_images for all using (auth.role() = 'authenticated');

-- 2. Public Submit (Insert) / Admin Read-Write Policies
create policy "Allow public insert access for applications" on public.applications for insert with check (true);
create policy "Allow admin read-write access for applications" on public.applications for all using (auth.role() = 'authenticated');

create policy "Allow public insert access for contacts" on public.contacts for insert with check (true);
create policy "Allow admin read-write access for contacts" on public.contacts for all using (auth.role() = 'authenticated');

-- =====================================================================
-- STORAGE BUCKETS (For File Uploads)
-- =====================================================================

-- Note: Ensure you go to Storage in your Supabase dashboard and create a public bucket named "uploads".
-- You can run the following SQL statements to configure bucket security policy commands in Supabase.

insert into storage.buckets (id, name, public) 
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

create policy "Allow public read access for uploads" on storage.objects for select using (bucket_id = 'uploads');
create policy "Allow admin write access for uploads" on storage.objects for all using (bucket_id = 'uploads' and auth.role() = 'authenticated');
