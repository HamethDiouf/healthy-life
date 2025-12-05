-- Create activities table with RLS
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in ('running', 'walking', 'cycling', 'swimming', 'yoga', 'gym', 'other')),
  duration_minutes integer not null,
  distance_km numeric(6,2),
  calories_burned integer,
  steps integer,
  notes text,
  activity_date date not null default current_date,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.activities enable row level security;

-- RLS Policies
create policy "activities_select_own"
  on public.activities for select
  using (auth.uid() = user_id);

create policy "activities_insert_own"
  on public.activities for insert
  with check (auth.uid() = user_id);

create policy "activities_update_own"
  on public.activities for update
  using (auth.uid() = user_id);

create policy "activities_delete_own"
  on public.activities for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index activities_user_date_idx on public.activities(user_id, activity_date desc);
