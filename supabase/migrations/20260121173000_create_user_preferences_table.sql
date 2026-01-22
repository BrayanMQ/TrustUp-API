-- Migration: create user_preferences table
-- Description: Store non-critical user preferences used only for UX customization.
-- Relationship: One-to-one with users table.

-- Core user_preferences table
create table if not exists public.user_preferences (
  user_id uuid primary key references public.users(id) on delete cascade,
  preferred_stablecoin text not null default 'USDC',
  country text, -- ISO 3166-1 alpha-2
  currency text, -- ISO 4217
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger function to maintain updated_at
create or replace function public.set_user_preferences_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger attaching updated_at behavior
do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'trg_user_preferences_updated_at'
  ) then
    create trigger trg_user_preferences_updated_at
    before update on public.user_preferences
    for each row
    execute function public.set_user_preferences_updated_at();
  end if;
end;
$$;

-- Comments for documentation
comment on table public.user_preferences is 'Stores non-critical user preferences for UX personalization';
comment on column public.user_preferences.user_id is 'Primary key and foreign key referencing users.id';
comment on column public.user_preferences.preferred_stablecoin is 'Default stablecoin for user transactions';
comment on column public.user_preferences.country is 'User country code (ISO 3166-1 alpha-2)';
comment on column public.user_preferences.currency is 'Preferred display currency (ISO 4217)';
