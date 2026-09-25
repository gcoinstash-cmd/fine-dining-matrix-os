-- ============================================================================
-- AURA ÉTOILE — Michelin Seat Matrix & Sommelier Cellar OS
-- Supabase PostgreSQL Schema with Row Level Security (RLS)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DINING TABLES & SEATS
CREATE TABLE IF NOT EXISTS dining_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_number TEXT NOT NULL UNIQUE,
  section_type TEXT NOT NULL CHECK (section_type IN ('counter', 'booth', 'salon', 'cellar')),
  seat_capacity INTEGER NOT NULL DEFAULT 2,
  min_spend_floor NUMERIC(10,2) NOT NULL DEFAULT 250.00,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SOMMELIER CELLAR INVENTORY
CREATE TABLE IF NOT EXISTS sommelier_cellar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vintage_year INTEGER NOT NULL,
  producer_name TEXT NOT NULL,
  appellation TEXT NOT NULL,
  bottle_format TEXT NOT NULL DEFAULT '750ml',
  bottles_in_vault INTEGER NOT NULL DEFAULT 1,
  bottle_price NUMERIC(10,2) NOT NULL,
  pairing_tier TEXT NOT NULL CHECK (pairing_tier IN ('standard', 'grand_cru', 'trophy_library')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TASTING EXPERIENCES & PAIRINGS
CREATE TABLE IF NOT EXISTS tasting_pairings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_count INTEGER NOT NULL,
  tasting_name TEXT NOT NULL,
  price_per_cover NUMERIC(10,2) NOT NULL,
  includes_binchotan_hearth BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESERVATIONS & COVERS
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID REFERENCES dining_tables(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  party_size INTEGER NOT NULL DEFAULT 2,
  reservation_date DATE NOT NULL,
  seating_time TEXT NOT NULL,
  dietary_flags TEXT[] DEFAULT '{}',
  total_experience_amount NUMERIC(10,2) NOT NULL,
  deposit_collected NUMERIC(10,2) NOT NULL,
  reservation_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (reservation_status IN ('confirmed', 'seated', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE dining_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE sommelier_cellar ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasting_pairings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Public read access for client storefront
CREATE POLICY "Public tables view" ON dining_tables FOR SELECT USING (true);
CREATE POLICY "Public cellar view" ON sommelier_cellar FOR SELECT USING (true);
CREATE POLICY "Public tasting view" ON tasting_pairings FOR SELECT USING (true);
CREATE POLICY "Public reservation insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public reservation view self" ON reservations FOR SELECT USING (true);
