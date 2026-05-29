-- Habilitar extensión pgcrypto para generar UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear el schema si no existe
CREATE SCHEMA IF NOT EXISTS next_auth;
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL PRIVILEGES ON SCHEMA next_auth TO service_role;

-- Crear tabla users
CREATE TABLE IF NOT EXISTS next_auth.users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text,
  email text UNIQUE,
  "emailVerified" timestamp with time zone,
  image text
);

-- Crear tabla accounts
CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId" uuid NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  "providerAccountId" text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  UNIQUE(provider, "providerAccountId")
);

-- Crear tabla sessions
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId" uuid NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires timestamp with time zone NOT NULL,
  "sessionToken" text NOT NULL UNIQUE
);

-- Crear tabla verification_tokens
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier text NOT NULL,
  token text NOT NULL UNIQUE,
  expires timestamp with time zone NOT NULL,
  UNIQUE(identifier, token)
);

-- Asegurarse de que service_role tiene permisos sobre todas las tablas
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA next_auth TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA next_auth TO service_role;
