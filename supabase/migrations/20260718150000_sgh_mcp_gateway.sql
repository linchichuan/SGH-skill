-- SGH MCP gateway additions.
-- Apply after the SGH Japan Agent Platform migrations. Existing agent_tasks,
-- agent_passes, reserve_booking_requests, audit and billing ledgers remain the
-- canonical control-plane records; this migration adds the OAuth/consent/Pass
-- token/outbox boundaries required by the public MCP resource server.

create extension if not exists pgcrypto;

create table if not exists public.agent_oauth_subject_links (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  issuer text not null,
  subject text not null,
  owner_key text not null,
  profile_id uuid references public.agent_profiles(id) on delete set null,
  tenant_key text not null default 'sgh',
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'REVOKED')),
  linked_at timestamptz not null default now(),
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  unique (app_id, issuer, subject)
);

create table if not exists public.agent_consent_records (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  owner_key text not null,
  agent_task_id uuid references public.agent_tasks(id) on delete cascade,
  reserve_booking_request_id text references public.reserve_booking_requests(id) on delete cascade,
  action text not null check (action in ('CREATE_DRAFT', 'CONFIRM_CALL', 'CANCEL_REQUEST', 'HANDOFF', 'REDEEM_PASS', 'SHARE_PERSONAL_DATA', 'PAYMENT')),
  contract_version integer not null check (contract_version > 0),
  policy_version text not null,
  approved_fields jsonb not null default '[]'::jsonb check (jsonb_typeof(approved_fields) = 'array'),
  fee_snapshot jsonb not null default '{}'::jsonb check (jsonb_typeof(fee_snapshot) = 'object'),
  consent_snapshot jsonb not null default '{}'::jsonb check (jsonb_typeof(consent_snapshot) = 'object'),
  idempotency_key text not null,
  confirmed_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_by text not null,
  unique (app_id, owner_key, idempotency_key),
  check ((agent_task_id is not null)::integer + (reserve_booking_request_id is not null)::integer = 1)
);

create table if not exists public.agent_pass_tokens (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  pass_id uuid not null references public.agent_passes(id) on delete cascade,
  tenant_key text not null,
  token_hash text not null check (token_hash ~ '^[0-9a-f]{64}$'),
  token_prefix text not null check (char_length(token_prefix) between 6 and 16),
  scopes jsonb not null default '[]'::jsonb check (jsonb_typeof(scopes) = 'array'),
  max_uses integer not null default 1 check (max_uses > 0),
  use_count integer not null default 0 check (use_count >= 0 and use_count <= max_uses),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  created_by text not null,
  unique (app_id, token_hash)
);

create table if not exists public.agent_pass_redemptions (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  pass_token_id uuid not null references public.agent_pass_tokens(id) on delete restrict,
  pass_id uuid not null references public.agent_passes(id) on delete restrict,
  owner_key text not null,
  idempotency_key text not null,
  scopes_granted jsonb not null default '[]'::jsonb check (jsonb_typeof(scopes_granted) = 'array'),
  redeemed_at timestamptz not null default now(),
  unique (app_id, owner_key, idempotency_key)
);

create table if not exists public.agent_outbox_events (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  aggregate_type text not null check (aggregate_type in ('agent_task', 'reserve_booking', 'pass_redemption')),
  aggregate_id text not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  status text not null default 'PENDING' check (status in ('PENDING', 'PROCESSING', 'DELIVERED', 'RETRY', 'DEAD_LETTER')),
  available_at timestamptz not null default now(),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  claimed_at timestamptz,
  delivered_at timestamptz,
  last_error_code text,
  created_at timestamptz not null default now(),
  unique (app_id, event_type, aggregate_id)
);

create table if not exists public.agent_processed_webhook_events (
  id uuid primary key default gen_random_uuid(),
  app_id text not null default 'sgh_service' check (app_id = 'sgh_service'),
  provider text not null,
  provider_event_id text not null,
  payload_digest text not null check (payload_digest ~ '^[0-9a-f]{64}$'),
  processed_at timestamptz not null default now(),
  unique (app_id, provider, provider_event_id)
);

create index if not exists idx_agent_oauth_owner
  on public.agent_oauth_subject_links(owner_key, status);
create index if not exists idx_agent_consent_task
  on public.agent_consent_records(agent_task_id, confirmed_at desc);
create index if not exists idx_agent_consent_booking
  on public.agent_consent_records(reserve_booking_request_id, confirmed_at desc);
create index if not exists idx_agent_pass_token_lookup
  on public.agent_pass_tokens(token_hash) where revoked_at is null;
create index if not exists idx_agent_outbox_claim
  on public.agent_outbox_events(status, available_at, created_at)
  where status in ('PENDING', 'RETRY');

alter table public.agent_oauth_subject_links enable row level security;
alter table public.agent_oauth_subject_links force row level security;
alter table public.agent_consent_records enable row level security;
alter table public.agent_consent_records force row level security;
alter table public.agent_pass_tokens enable row level security;
alter table public.agent_pass_tokens force row level security;
alter table public.agent_pass_redemptions enable row level security;
alter table public.agent_pass_redemptions force row level security;
alter table public.agent_outbox_events enable row level security;
alter table public.agent_outbox_events force row level security;
alter table public.agent_processed_webhook_events enable row level security;
alter table public.agent_processed_webhook_events force row level security;

revoke all on table public.agent_oauth_subject_links from public, anon, authenticated, service_role;
revoke all on table public.agent_consent_records from public, anon, authenticated, service_role;
revoke all on table public.agent_pass_tokens from public, anon, authenticated, service_role;
revoke all on table public.agent_pass_redemptions from public, anon, authenticated, service_role;
revoke all on table public.agent_outbox_events from public, anon, authenticated, service_role;
revoke all on table public.agent_processed_webhook_events from public, anon, authenticated, service_role;

create or replace function public.redeem_sgh_pass_atomic(
  p_owner_key text,
  p_token text,
  p_idempotency_key text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  v_hash text;
  v_token public.agent_pass_tokens%rowtype;
  v_existing public.agent_pass_redemptions%rowtype;
  v_redemption public.agent_pass_redemptions%rowtype;
begin
  if char_length(coalesce(p_token, '')) < 24 then
    return jsonb_build_object('ok', false, 'code', 'INVALID_PASS');
  end if;
  if p_idempotency_key !~ '^[A-Za-z0-9:_-]{8,160}$' then
    return jsonb_build_object('ok', false, 'code', 'INVALID_IDEMPOTENCY_KEY');
  end if;

  v_hash := encode(digest(p_token, 'sha256'), 'hex');

  select * into v_existing
  from public.agent_pass_redemptions
  where app_id = 'sgh_service'
    and owner_key = p_owner_key
    and idempotency_key = p_idempotency_key;
  if found then
    select * into v_token
    from public.agent_pass_tokens
    where id = v_existing.pass_token_id;
    if not found or v_token.token_hash <> v_hash then
      return jsonb_build_object('ok', false, 'code', 'IDEMPOTENCY_CONFLICT');
    end if;
    return jsonb_build_object(
      'ok', true,
      'idempotent_replay', true,
      'redemption_id', v_existing.id,
      'pass_id', v_existing.pass_id,
      'scopes', v_existing.scopes_granted
    );
  end if;

  select * into v_token
  from public.agent_pass_tokens
  where app_id = 'sgh_service' and token_hash = v_hash
  for update;

  if not found or v_token.revoked_at is not null or v_token.expires_at <= now() then
    return jsonb_build_object('ok', false, 'code', 'INVALID_OR_EXPIRED_PASS');
  end if;
  if v_token.use_count >= v_token.max_uses then
    return jsonb_build_object('ok', false, 'code', 'PASS_ALREADY_USED');
  end if;

  update public.agent_pass_tokens
  set use_count = use_count + 1
  where id = v_token.id;

  insert into public.agent_pass_redemptions (
    pass_token_id, pass_id, owner_key, idempotency_key, scopes_granted
  ) values (
    v_token.id, v_token.pass_id, p_owner_key, p_idempotency_key, v_token.scopes
  ) returning * into v_redemption;

  return jsonb_build_object(
    'ok', true,
    'idempotent_replay', false,
    'redemption_id', v_redemption.id,
    'pass_id', v_redemption.pass_id,
    'scopes', v_redemption.scopes_granted
  );
  exception
  when unique_violation then
    select * into v_existing
    from public.agent_pass_redemptions
    where app_id = 'sgh_service'
      and owner_key = p_owner_key
      and idempotency_key = p_idempotency_key;
    select * into v_token
    from public.agent_pass_tokens
    where id = v_existing.pass_token_id;
    if not found or v_token.token_hash <> v_hash then
      return jsonb_build_object('ok', false, 'code', 'IDEMPOTENCY_CONFLICT');
    end if;
    return jsonb_build_object(
      'ok', true,
      'idempotent_replay', true,
      'redemption_id', v_existing.id,
      'pass_id', v_existing.pass_id,
      'scopes', v_existing.scopes_granted
    );
end
$$;

revoke execute on function public.redeem_sgh_pass_atomic(text, text, text)
  from public, anon, authenticated, service_role;

do $$
declare
  table_name text;
begin
  if exists (select 1 from pg_roles where rolname = 'sgh_reserve_backend') then
    grant select, insert, update on public.agent_oauth_subject_links to sgh_reserve_backend;
    grant select, insert, update on public.agent_consent_records to sgh_reserve_backend;
    grant select, insert, update on public.agent_pass_tokens to sgh_reserve_backend;
    grant select, insert on public.agent_pass_redemptions to sgh_reserve_backend;
    grant select, insert, update on public.agent_outbox_events to sgh_reserve_backend;
    grant select, insert on public.agent_processed_webhook_events to sgh_reserve_backend;
    grant execute on function public.redeem_sgh_pass_atomic(text, text, text)
      to sgh_reserve_backend;
    foreach table_name in array array[
      'agent_oauth_subject_links', 'agent_consent_records',
      'agent_pass_tokens', 'agent_pass_redemptions',
      'agent_outbox_events', 'agent_processed_webhook_events'
    ] loop
      execute format('drop policy if exists sgh_reserve_backend_all on public.%I', table_name);
      execute format(
        'create policy sgh_reserve_backend_all on public.%I for all to sgh_reserve_backend using (true) with check (true)',
        table_name
      );
    end loop;
  end if;
end
$$;
