-- Create goals table with RLS
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_type text not null check (goal_type in ('steps', 'calories', 'sleep', 'water', 'exercise')),
  target_value numeric(10,2) not null,
  current_value numeric(10,2) default 0,
  unit text not null, -- 'steps', 'calories', 'hours', 'ml', 'minutes'
  frequency text not null check (frequency in ('daily', 'weekly', 'monthly')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.goals enable row level security;

-- RLS Policies
create policy "goals_select_own"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "goals_insert_own"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "goals_update_own"
  on public.goals for update
  using (auth.uid() = user_id);

create policy "goals_delete_own"
  on public.goals for delete
  using (auth.uid() = user_id);
