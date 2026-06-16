// Mock data for development / demo mode (no Supabase credentials needed)

const today = new Date()
const d = (daysAgo, h, m) => {
  const t = new Date(today)
  t.setDate(t.getDate() - daysAgo)
  t.setHours(h, m, 0, 0)
  return t.toISOString()
}

export const DEFAULT_CATEGORIES = [
  'Baking & Flour',
  'Beverages',
  'Cleaning & Kitchen Tools',
  'Dairy & Cheese',
  'Disposables & Packaging',
  'General Groceries',
  'Meat & Poultry',
  'Oils & Creams',
  'Pasta & Grains',
  'Sauces, Condiments & Pastes',
  'Spices & Seasonings',
  'Vegetables & Fruits',
]

export const mockCategories = [...DEFAULT_CATEGORIES]

export const mockIngredients = [
  // ── Baking & Flour ──────────────────────────────────────────────────────────
  { id:'KIT-001', category:'Baking & Flour',             name:'ARABIC FLOUR',           current_qty:15,    min_limit:3,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-002', category:'Baking & Flour',             name:'FLOUR NO. 1',            current_qty:0,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-003', category:'Baking & Flour',             name:'FLOUR NO. 3',            current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-004', category:'Baking & Flour',             name:'HAREES',                 current_qty:5,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-005', category:'Baking & Flour',             name:'ITALIAN FLOUR',          current_qty:25,    min_limit:5,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-006', category:'Baking & Flour',             name:'SAGOU',                  current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-007', category:'Baking & Flour',             name:'SEMOLINA',               current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-008', category:'Baking & Flour',             name:'YEAST',                  current_qty:0,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Beverages ────────────────────────────────────────────────────────────────
  { id:'KIT-009', category:'Beverages',                  name:'KINZA COLA',             current_qty:20,    min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-010', category:'Beverages',                  name:'KINZA DIET',             current_qty:20,    min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-011', category:'Beverages',                  name:'KINZA LEMON',            current_qty:16,    min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-012', category:'Beverages',                  name:'KINZA ORANGE',           current_qty:13,    min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-013', category:'Beverages',                  name:'ROSE WATER',             current_qty:6,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-014', category:'Beverages',                  name:'STAFF WATER',            current_qty:16,    min_limit:4,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-015', category:'Beverages',                  name:'TEA',                    current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-016', category:'Beverages',                  name:'VIMTO',                  current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Cleaning & Kitchen Tools ─────────────────────────────────────────────────
  { id:'KIT-017', category:'Cleaning & Kitchen Tools',   name:'CLOROX',                 current_qty:2,     min_limit:0,    unit:'GALLON', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-018', category:'Cleaning & Kitchen Tools',   name:'DISHWASHING LIQUID',     current_qty:2,     min_limit:1,    unit:'GALLON', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-019', category:'Cleaning & Kitchen Tools',   name:'HAND WASH',              current_qty:0,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-020', category:'Cleaning & Kitchen Tools',   name:'SPONGE',                 current_qty:6,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-021', category:'Cleaning & Kitchen Tools',   name:'WIPER',                  current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Dairy & Cheese ───────────────────────────────────────────────────────────
  { id:'KIT-022', category:'Dairy & Cheese',             name:'BUTTER',                 current_qty:1,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-023', category:'Dairy & Cheese',             name:'CHEDDAR CHEESE',         current_qty:0,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-024', category:'Dairy & Cheese',             name:'EMMENTAL',               current_qty:0,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-025', category:'Dairy & Cheese',             name:'FETTA',                  current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-026', category:'Dairy & Cheese',             name:'HALLOUMI',               current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-027', category:'Dairy & Cheese',             name:'LABAN',                  current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-028', category:'Dairy & Cheese',             name:'LABNEH',                 current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-029', category:'Dairy & Cheese',             name:'MOZZARELLA CHEESE',      current_qty:12,    min_limit:4,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-030', category:'Dairy & Cheese',             name:'PARMISAN',               current_qty:5,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-031', category:'Dairy & Cheese',             name:'YOGURT',                 current_qty:10,    min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Disposables & Packaging ──────────────────────────────────────────────────
  { id:'KIT-032', category:'Disposables & Packaging',    name:'ALUMINUM CONTAINER',     current_qty:8,     min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-033', category:'Disposables & Packaging',    name:'CLING FILM',             current_qty:0,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-034', category:'Disposables & Packaging',    name:'DATE LABEL',             current_qty:5,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-035', category:'Disposables & Packaging',    name:'GARBAGE BAG',            current_qty:3,     min_limit:1,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-036', category:'Disposables & Packaging',    name:'GLOVES',                 current_qty:5,     min_limit:1,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-037', category:'Disposables & Packaging',    name:'NAPKIN',                 current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-038', category:'Disposables & Packaging',    name:'ZIP BAG',                current_qty:1,     min_limit:1,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── General Groceries ────────────────────────────────────────────────────────
  { id:'KIT-039', category:'General Groceries',          name:'CASHEW NUTS',            current_qty:400,   min_limit:100,  unit:'G',      location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-040', category:'General Groceries',          name:'CHICK PEAS',             current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-041', category:'General Groceries',          name:'CORN',                   current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-042', category:'General Groceries',          name:'DATES',                  current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-043', category:'General Groceries',          name:'EGGS',                   current_qty:4,     min_limit:2,    unit:'TRAY',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-044', category:'General Groceries',          name:'FRIES',                  current_qty:2,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-045', category:'General Groceries',          name:'GRAPE LEAVES',           current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-046', category:'General Groceries',          name:'IRANI BREAD',            current_qty:50,    min_limit:10,   unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-047', category:'General Groceries',          name:'KIRI POWDER',            current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-048', category:'General Groceries',          name:'PINE NUTS',              current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-049', category:'General Groceries',          name:'REGAG',                  current_qty:5,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-050', category:'General Groceries',          name:'SAMBOSA',                current_qty:20,    min_limit:5,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-051', category:'General Groceries',          name:'SAUSAGE',                current_qty:1,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-052', category:'General Groceries',          name:'SEED',                   current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-053', category:'General Groceries',          name:'SUGAR',                  current_qty:20,    min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-054', category:'General Groceries',          name:'SWEET CORN',             current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-055', category:'General Groceries',          name:'TORTILLA',               current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-056', category:'General Groceries',          name:'TUNA',                   current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-057', category:'General Groceries',          name:'ZABIB',                  current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Meat & Poultry ───────────────────────────────────────────────────────────
  { id:'KIT-058', category:'Meat & Poultry',             name:'CHICKEN BREAST',         current_qty:4,     min_limit:2,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-059', category:'Meat & Poultry',             name:'CHICKEN FRANKS',         current_qty:0,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-060', category:'Meat & Poultry',             name:'CHICKEN NUGGETS',        current_qty:7,     min_limit:2,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-061', category:'Meat & Poultry',             name:'MUTTON',                 current_qty:24,    min_limit:5,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-062', category:'Meat & Poultry',             name:'TOPSIDE',                current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Oils & Creams ────────────────────────────────────────────────────────────
  { id:'KIT-063', category:'Oils & Creams',              name:'ALUMINUM FOIL',          current_qty:1,     min_limit:1,    unit:'LITER',  location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-064', category:'Oils & Creams',              name:'COOKING CREAM',          current_qty:8,     min_limit:2,    unit:'LITER',  location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-065', category:'Oils & Creams',              name:'CORN OIL',               current_qty:8,     min_limit:5,    unit:'LITER',  location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-066', category:'Oils & Creams',              name:'DRUM OIL',               current_qty:1,     min_limit:1,    unit:'LITER',  location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-067', category:'Oils & Creams',              name:'OLIVE OIL',              current_qty:5,     min_limit:1,    unit:'LITER',  location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-068', category:'Oils & Creams',              name:'PALM OIL',               current_qty:1,     min_limit:1,    unit:'GALLON', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Pasta & Grains ───────────────────────────────────────────────────────────
  { id:'KIT-069', category:'Pasta & Grains',             name:'AZEEMA',                 current_qty:80,    min_limit:20,   unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-070', category:'Pasta & Grains',             name:'BABYLONE',               current_qty:80,    min_limit:20,   unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-071', category:'Pasta & Grains',             name:'FETTUCCINE PASTA',       current_qty:0,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-072', category:'Pasta & Grains',             name:'FUSILLI PASTA',          current_qty:8,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-073', category:'Pasta & Grains',             name:'LASAGNA PASTA',          current_qty:2,     min_limit:2,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-074', category:'Pasta & Grains',             name:'MACARONI PASTA',         current_qty:10,    min_limit:5,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-075', category:'Pasta & Grains',             name:'PENNE PASTA',            current_qty:19,    min_limit:5,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-076', category:'Pasta & Grains',             name:'RISOTTO',                current_qty:5,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-077', category:'Pasta & Grains',             name:'SPAGHETTI PASTA',        current_qty:5,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-078', category:'Pasta & Grains',             name:'SUNWHITE RICE',          current_qty:20,    min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-079', category:'Pasta & Grains',             name:'TORTELLA',               current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-080', category:'Pasta & Grains',             name:'VERMICELLI PASTA',       current_qty:0,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Sauces, Condiments & Pastes ──────────────────────────────────────────────
  { id:'KIT-081', category:'Sauces, Condiments & Pastes', name:'BLACK OLIVES',          current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-082', category:'Sauces, Condiments & Pastes', name:'DATE PASTE',            current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-083', category:'Sauces, Condiments & Pastes', name:'HOT SAUCE',             current_qty:1,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-084', category:'Sauces, Condiments & Pastes', name:'HUMMUS',                current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-085', category:'Sauces, Condiments & Pastes', name:'KETCHUP',               current_qty:1,     min_limit:1,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-086', category:'Sauces, Condiments & Pastes', name:'MAYONNAISE',            current_qty:3,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-087', category:'Sauces, Condiments & Pastes', name:'PEELED TOMATO',         current_qty:2,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-088', category:'Sauces, Condiments & Pastes', name:'TABASCO SAUCE',         current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-089', category:'Sauces, Condiments & Pastes', name:'TAHINA',                current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-090', category:'Sauces, Condiments & Pastes', name:'TOMATO PASTE',          current_qty:11,    min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Spices & Seasonings ──────────────────────────────────────────────────────
  { id:'KIT-091', category:'Spices & Seasonings',        name:'BLACK PEPPER',           current_qty:1,     min_limit:0.5,  unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-092', category:'Spices & Seasonings',        name:'CUMIN',                  current_qty:1,     min_limit:0.5,  unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-093', category:'Spices & Seasonings',        name:'MAJBOOS SPICES',         current_qty:5,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-094', category:'Spices & Seasonings',        name:'OREGANO',                current_qty:2,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-095', category:'Spices & Seasonings',        name:'PEPPERONI',              current_qty:0.5,   min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-096', category:'Spices & Seasonings',        name:'SAFFRON (ZAAFRAN)',      current_qty:0,     min_limit:1,    unit:'G',      location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-097', category:'Spices & Seasonings',        name:'SALT',                   current_qty:25,    min_limit:5,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-098', category:'Spices & Seasonings',        name:'SHYOUKH SPICES',         current_qty:3,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-099', category:'Spices & Seasonings',        name:'THYME POWDER',           current_qty:0,     min_limit:0,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },

  // ── Vegetables & Fruits ──────────────────────────────────────────────────────
  { id:'KIT-100', category:'Vegetables & Fruits',        name:'BROCCOLI',               current_qty:2,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-101', category:'Vegetables & Fruits',        name:'CARROT',                 current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-102', category:'Vegetables & Fruits',        name:'CHERRY TOMATO',          current_qty:4,     min_limit:1,    unit:'PACK',   location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-103', category:'Vegetables & Fruits',        name:'CHILI',                  current_qty:4,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-104', category:'Vegetables & Fruits',        name:'CORIANDER',              current_qty:5,     min_limit:1,    unit:'BUNDLE', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-105', category:'Vegetables & Fruits',        name:'CUCUMBER',               current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-106', category:'Vegetables & Fruits',        name:'DILL',                   current_qty:2,     min_limit:1,    unit:'BUNDLE', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-107', category:'Vegetables & Fruits',        name:'GARLIC',                 current_qty:2,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-108', category:'Vegetables & Fruits',        name:'GREEN CAPSICUM',         current_qty:2,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-109', category:'Vegetables & Fruits',        name:'JALAPENO',               current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-110', category:'Vegetables & Fruits',        name:'LEMON',                  current_qty:16,    min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-111', category:'Vegetables & Fruits',        name:'LEMON SALT',             current_qty:0.4,   min_limit:0.1,  unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-112', category:'Vegetables & Fruits',        name:'LETTUCE',                current_qty:6,     min_limit:2,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-113', category:'Vegetables & Fruits',        name:'MINT',                   current_qty:3,     min_limit:1,    unit:'BUNDLE', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-114', category:'Vegetables & Fruits',        name:'MUSHROOM',               current_qty:2,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-115', category:'Vegetables & Fruits',        name:'ONION',                  current_qty:8,     min_limit:3,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-116', category:'Vegetables & Fruits',        name:'ORANGE',                 current_qty:10,    min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-117', category:'Vegetables & Fruits',        name:'PARSLEY',                current_qty:8,     min_limit:2,    unit:'BUNDLE', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-118', category:'Vegetables & Fruits',        name:'POMEGRANATE',            current_qty:0,     min_limit:0.5,  unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-119', category:'Vegetables & Fruits',        name:'POMEGRANATE MOLASSES',   current_qty:1,     min_limit:1,    unit:'PCS',    location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-120', category:'Vegetables & Fruits',        name:'POTATO',                 current_qty:3,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-121', category:'Vegetables & Fruits',        name:'RED CAPSICUM',           current_qty:0,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-122', category:'Vegetables & Fruits',        name:'ROCKET / JARJIR',        current_qty:3,     min_limit:2,    unit:'BUNDLE', location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-123', category:'Vegetables & Fruits',        name:'SPINACH',                current_qty:3,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-124', category:'Vegetables & Fruits',        name:'TOMATO',                 current_qty:3,     min_limit:3,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-125', category:'Vegetables & Fruits',        name:'WHITE ONIONS',           current_qty:4,     min_limit:2,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-126', category:'Vegetables & Fruits',        name:'YELLOW CAPSICUM',        current_qty:0,     min_limit:0,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
  { id:'KIT-127', category:'Vegetables & Fruits',        name:'ZUCCHINI',               current_qty:3,     min_limit:1,    unit:'KG',     location:'Maamoura Kitchen', bulk_unit:null, bulk_qty:1 },
]

export const mockUsageLogs = [
  { id:'log-1',  ingredient_id:'KIT-075', qty_deducted:2,   staff_name:'Nijam',     location:'Maamoura Kitchen', timestamp: d(3,8,30)  },
  { id:'log-2',  ingredient_id:'KIT-029', qty_deducted:1.5, staff_name:'Ikram',     location:'Maamoura Kitchen', timestamp: d(3,9,10)  },
  { id:'log-3',  ingredient_id:'KIT-097', qty_deducted:0.5, staff_name:'Sanaullah', location:'Maamoura Kitchen', timestamp: d(3,10,0)  },
  { id:'log-4',  ingredient_id:'KIT-061', qty_deducted:3,   staff_name:'Ahad',      location:'Maamoura Kitchen', timestamp: d(3,11,45) },
  { id:'log-5',  ingredient_id:'KIT-064', qty_deducted:1,   staff_name:'Habib',     location:'Maamoura Kitchen', timestamp: d(2,8,0)   },
  { id:'log-6',  ingredient_id:'KIT-110', qty_deducted:2,   staff_name:'Nijam',     location:'Maamoura Kitchen', timestamp: d(2,9,30)  },
  { id:'log-7',  ingredient_id:'KIT-115', qty_deducted:1,   staff_name:'Ikram',     location:'Maamoura Kitchen', timestamp: d(2,10,15) },
  { id:'log-8',  ingredient_id:'KIT-077', qty_deducted:2,   staff_name:'Yassir',    location:'Maamoura Kitchen', timestamp: d(2,11,0)  },
  { id:'log-9',  ingredient_id:'KIT-053', qty_deducted:1,   staff_name:'Majid',     location:'Maamoura Kitchen', timestamp: d(2,14,0)  },
  { id:'log-10', ingredient_id:'KIT-043', qty_deducted:1,   staff_name:'Mola',      location:'Maamoura Kitchen', timestamp: d(1,8,0)   },
  { id:'log-11', ingredient_id:'KIT-065', qty_deducted:2,   staff_name:'Jabid',     location:'Maamoura Kitchen', timestamp: d(1,9,0)   },
  { id:'log-12', ingredient_id:'KIT-090', qty_deducted:2,   staff_name:'Umair',     location:'Maamoura Kitchen', timestamp: d(1,10,30) },
  { id:'log-13', ingredient_id:'KIT-107', qty_deducted:0.5, staff_name:'Aymen',     location:'Maamoura Kitchen', timestamp: d(1,11,0)  },
  { id:'log-14', ingredient_id:'KIT-074', qty_deducted:3,   staff_name:'Nijam',     location:'Maamoura Kitchen', timestamp: d(1,12,0)  },
  { id:'log-15', ingredient_id:'KIT-078', qty_deducted:2,   staff_name:'Ikram',     location:'Maamoura Kitchen', timestamp: d(1,13,30) },
  { id:'log-16', ingredient_id:'KIT-029', qty_deducted:2,   staff_name:'Sanaullah', location:'Maamoura Kitchen', timestamp: d(0,8,0)   },
  { id:'log-17', ingredient_id:'KIT-091', qty_deducted:0.2, staff_name:'Ahab',      location:'Maamoura Kitchen', timestamp: d(0,9,0)   },
  { id:'log-18', ingredient_id:'KIT-112', qty_deducted:1,   staff_name:'Habib',     location:'Maamoura Kitchen', timestamp: d(0,10,0)  },
  { id:'log-19', ingredient_id:'KIT-058', qty_deducted:1,   staff_name:'Yassir',    location:'Maamoura Kitchen', timestamp: d(0,11,30) },
  { id:'log-20', ingredient_id:'KIT-075', qty_deducted:3,   staff_name:'Majid',     location:'Maamoura Kitchen', timestamp: d(0,12,0)  },
]

export function applyMockLogs(logs) {
  logs.forEach(({ ingredient_id, qty_deducted, staff_name, location }) => {
    const item = mockIngredients.find(i => i.id === ingredient_id)
    if (item) item.current_qty = Math.max(0, item.current_qty - qty_deducted)
    mockUsageLogs.push({
      id: `log-${Date.now()}-${Math.random()}`,
      ingredient_id,
      qty_deducted,
      staff_name,
      location,
      timestamp: new Date().toISOString(),
    })
  })
}

export function applyMockStockUpdate(ingredientId, qty, mode) {
  const item = mockIngredients.find(i => i.id === ingredientId)
  if (!item) return
  if (mode === 'add') {
    item.current_qty = Math.max(0, item.current_qty + qty)
  } else {
    item.current_qty = Math.max(0, qty)
  }
}
