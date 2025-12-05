-- Create meals table with RLS
create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_name text not null,
  calories integer not null,
  proteins numeric(6,2),
  carbs numeric(6,2),
  fats numeric(6,2),
  fruits_vegetables integer default 0,
  meal_date date not null default current_date,
  meal_time timestamptz default now(),
  notes text,
  created_at timestamptz default now()
);

-- Create water intake table with RLS
create table if not exists public.water_intake (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount_ml integer not null,
  intake_date date not null default current_date,
  intake_time timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable RLS for meals
alter table public.meals enable row level security;

-- RLS Policies for meals
create policy "meals_select_own"
  on public.meals for select
  using (auth.uid() = user_id);

create policy "meals_insert_own"
  on public.meals for insert
  with check (auth.uid() = user_id);

create policy "meals_update_own"
  on public.meals for update
  using (auth.uid() = user_id);

create policy "meals_delete_own"
  on public.meals for delete
  using (auth.uid() = user_id);

-- Enable RLS for water intake
alter table public.water_intake enable row level security;

-- RLS Policies for water intake
create policy "water_select_own"
  on public.water_intake for select
  using (auth.uid() = user_id);

create policy "water_insert_own"
  on public.water_intake for insert
  with check (auth.uid() = user_id);

create policy "water_delete_own"
  on public.water_intake for delete
  using (auth.uid() = user_id);

-- Create indexes for faster queries
create index meals_user_date_idx on public.meals(user_id, meal_date desc);
create index water_user_date_idx on public.water_intake(user_id, intake_date desc);
