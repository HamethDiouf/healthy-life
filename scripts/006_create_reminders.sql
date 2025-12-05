-- Create reminders table with RLS
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reminder_type text not null check (reminder_type in ('water', 'exercise', 'meal', 'sleep', 'custom')),
  title text not null,
  description text,
  reminder_time time not null,
  days_of_week integer[] not null default '{0,1,2,3,4,5,6}', -- 0=Sunday, 6=Saturday
  is_enabled boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.reminders enable row level security;

-- RLS Policies
create policy "reminders_select_own"
  on public.reminders for select
  using (auth.uid() = user_id);

create policy "reminders_insert_own"
  on public.reminders for insert
  with check (auth.uid() = user_id);

create policy "reminders_update_own"
  on public.reminders for update
  using (auth.uid() = user_id);

create policy "reminders_delete_own"
  on public.reminders for delete
  using (auth.uid() = user_id);
