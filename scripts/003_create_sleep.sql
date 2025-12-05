-- Create sleep tracking table with RLS
create table if not exists public.sleep_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sleep_date date not null,
  bedtime timestamptz not null,
  wake_time timestamptz not null,
  duration_hours numeric(4,2) not null,
  quality text check (quality in ('excellent', 'good', 'fair', 'poor')),
  deep_sleep_hours numeric(4,2),
  light_sleep_hours numeric(4,2),
  rem_sleep_hours numeric(4,2),
  awake_hours numeric(4,2),
  notes text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.sleep_records enable row level security;

-- RLS Policies
create policy "sleep_select_own"
  on public.sleep_records for select
  using (auth.uid() = user_id);

create policy "sleep_insert_own"
  on public.sleep_records for insert
  with check (auth.uid() = user_id);

create policy "sleep_update_own"
  on public.sleep_records for update
  using (auth.uid() = user_id);

create policy "sleep_delete_own"
  on public.sleep_records for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index sleep_user_date_idx on public.sleep_records(user_id, sleep_date desc);
