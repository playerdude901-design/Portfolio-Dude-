-- Supabase SQL Schema for Dude 3D Booking Calendar
-- Run this in your Supabase project's SQL Editor

-- 1. Weekly default capacity
CREATE TABLE weekly_capacity (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  hours DECIMAL(4,1) NOT NULL DEFAULT 2,
  UNIQUE(day_of_week)
);

INSERT INTO weekly_capacity (day_of_week, hours) VALUES
  (0, 4), -- domingo
  (1, 2), -- lunes
  (2, 2), -- martes
  (3, 2), -- miércoles
  (4, 3), -- jueves
  (5, 3), -- viernes
  (6, 4); -- sábado

-- 2. Admin day overrides (block or adjust specific dates)
CREATE TABLE day_overrides (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  hours DECIMAL(4,1) NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Service hours (how many hours each service type consumes)
CREATE TABLE service_hours (
  id SERIAL PRIMARY KEY,
  service_id TEXT NOT NULL UNIQUE,
  hours DECIMAL(4,1) NOT NULL
);

INSERT INTO service_hours (service_id, hours) VALUES
  ('video-editing', 2.5),
  ('gaming-editing', 2.0),
  ('shorts-editing', 0.75),
  ('thumbnail-design', 0.6),
  ('channel-branding', 5.0);

-- 4. Bookings (confirmed reservations)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  booking_date DATE NOT NULL,
  service_ids TEXT[] NOT NULL,
  hours_used DECIMAL(5,1) NOT NULL,
  client_name TEXT DEFAULT '',
  client_email TEXT DEFAULT '',
  project_name TEXT DEFAULT '',
  order_id TEXT DEFAULT '',
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','rescheduled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- 5. Enable Row Level Security (optional but recommended)
ALTER TABLE weekly_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE day_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read capacity and overrides (needed for availability check)
CREATE POLICY "Public can read weekly_capacity" ON weekly_capacity FOR SELECT USING (true);
CREATE POLICY "Public can read day_overrides" ON day_overrides FOR SELECT USING (true);
CREATE POLICY "Public can read service_hours" ON service_hours FOR SELECT USING (true);
CREATE POLICY "Public can read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update own bookings" ON bookings FOR UPDATE USING (true);

-- Admin policies (will be used by the admin panel)
CREATE POLICY "Admin full access day_overrides" ON day_overrides FOR ALL USING (true);
CREATE POLICY "Admin full access bookings" ON bookings FOR ALL USING (true);
