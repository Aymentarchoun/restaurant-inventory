-- ============================================================
-- Seed data — sample ingredients for both locations
-- ============================================================

insert into public.ingredients (name, current_qty, min_limit, unit, bulk_unit, bulk_qty, location) values
  -- Maamoura Kitchen
  ('Pasta (Spaghetti)',   120,  50,  'kg',   'Bag (5kg)',   5,   'Maamoura Kitchen'),
  ('Pasta (Penne)',       80,   40,  'kg',   'Bag (5kg)',   5,   'Maamoura Kitchen'),
  ('Tomato Sauce',       45,   20,  'L',    'Can (5L)',    5,   'Maamoura Kitchen'),
  ('Heavy Cream',        18,   10,  'L',    'Carton (1L)', 1,   'Maamoura Kitchen'),
  ('Parmesan Cheese',    12,   8,   'kg',   'Block (1kg)', 1,   'Maamoura Kitchen'),
  ('Chicken Breast',     30,   15,  'kg',   'Pack (2kg)',  2,   'Maamoura Kitchen'),
  ('Beef Mince',         25,   12,  'kg',   'Pack (1kg)',  1,   'Maamoura Kitchen'),
  ('Olive Oil',          10,   5,   'L',    'Bottle (2L)', 2,   'Maamoura Kitchen'),
  ('Garlic',             3,    1.5, 'kg',   'Pack (500g)', 0.5, 'Maamoura Kitchen'),
  ('Onions',             8,    4,   'kg',   'Bag (1kg)',   1,   'Maamoura Kitchen'),
  ('Salt',               5,    2,   'kg',   'Bag (1kg)',   1,   'Maamoura Kitchen'),
  ('Black Pepper',       1.2,  0.5, 'kg',   'Pack (250g)', 0.25,'Maamoura Kitchen'),
  ('Flour',              40,   20,  'kg',   'Bag (5kg)',   5,   'Maamoura Kitchen'),
  ('Eggs',               150,  60,  'pcs',  'Tray (30)',   30,  'Maamoura Kitchen'),
  ('Butter',             6,    3,   'kg',   'Pack (500g)', 0.5, 'Maamoura Kitchen'),

  -- Sheraton Shop
  ('Pasta (Fettuccine)', 60,   30,  'kg',   'Bag (5kg)',   5,   'Sheraton Shop'),
  ('Pasta (Rigatoni)',   45,   25,  'kg',   'Bag (5kg)',   5,   'Sheraton Shop'),
  ('Tomato Sauce',       30,   15,  'L',    'Can (5L)',    5,   'Sheraton Shop'),
  ('Mozzarella',         20,   10,  'kg',   'Pack (1kg)',  1,   'Sheraton Shop'),
  ('Shrimp',             15,   8,   'kg',   'Pack (1kg)',  1,   'Sheraton Shop'),
  ('Salmon Fillet',      12,   6,   'kg',   'Pack (1kg)',  1,   'Sheraton Shop'),
  ('Heavy Cream',        10,   5,   'L',    'Carton (1L)', 1,   'Sheraton Shop'),
  ('Olive Oil',          8,    4,   'L',    'Bottle (2L)', 2,   'Sheraton Shop'),
  ('Garlic',             2,    1,   'kg',   'Pack (500g)', 0.5, 'Sheraton Shop'),
  ('Basil (Fresh)',      0.8,  0.4, 'kg',   'Pack (100g)', 0.1, 'Sheraton Shop'),
  ('Parmesan Cheese',    8,    5,   'kg',   'Block (1kg)', 1,   'Sheraton Shop'),
  ('Eggs',               90,   40,  'pcs',  'Tray (30)',   30,  'Sheraton Shop'),
  ('Bread (Ciabatta)',   24,   12,  'pcs',  'Pack (6)',    6,   'Sheraton Shop'),
  ('Lemon',              30,   15,  'pcs',  'Bag (10)',    10,  'Sheraton Shop'),
  ('Cherry Tomatoes',    5,    2,   'kg',   'Punnet (500g)',0.5, 'Sheraton Shop');
