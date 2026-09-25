-- Seed Tables
INSERT INTO dining_tables (table_number, section_type, seat_capacity, min_spend_floor) VALUES
('Counter 01-02', 'counter', 2, 295.00),
('Counter 03-04', 'counter', 2, 295.00),
('Counter 05-06', 'counter', 2, 295.00),
('Counter 07-08', 'counter', 2, 295.00),
('Booth Alpha', 'booth', 4, 350.00),
('Booth Beta', 'booth', 4, 350.00),
('Salon 11', 'salon', 2, 265.00),
('Salon 12', 'salon', 4, 265.00),
('Grand Cellar Vault', 'cellar', 10, 500.00)
ON CONFLICT (table_number) DO NOTHING;

-- Seed Cellar
INSERT INTO sommelier_cellar (vintage_year, producer_name, appellation, bottles_in_vault, bottle_price, pairing_tier) VALUES
(2018, 'Domaine de la Romanée-Conti', 'Vosne-Romanée, Burgundy', 3, 4200.00, 'trophy_library'),
(2010, 'Château Margaux 1er Cru', 'Margaux, Bordeaux', 5, 1850.00, 'grand_cru'),
(2012, 'Dom Pérignon Vintage Brut', 'Épernay, Champagne', 8, 420.00, 'grand_cru')
ON CONFLICT DO NOTHING;

-- Seed Tastings
INSERT INTO tasting_pairings (course_count, tasting_name, price_per_cover) VALUES
(9, '9-Course Omakase Hearth Experience', 295.00),
(12, '12-Course Grand Prestige Journey', 385.00)
ON CONFLICT DO NOTHING;
