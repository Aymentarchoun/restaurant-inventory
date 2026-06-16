<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET — list all ingredients ordered by category then name
if ($method === 'GET') {
    $rows = get_pdo()
        ->query('SELECT * FROM ingredients ORDER BY category, name')
        ->fetchAll();
    // cast numeric fields
    foreach ($rows as &$r) {
        $r['current_qty'] = (float) $r['current_qty'];
        $r['min_limit']   = (float) $r['min_limit'];
        $r['bulk_qty']    = (float) $r['bulk_qty'];
    }
    json_out($rows);
}

// POST — add new ingredient
if ($method === 'POST') {
    $b = body();
    if (empty($b['name']))     json_err('name required');
    if (!isset($b['min_limit'])) json_err('min_limit required');

    $id = 'KIT-' . strtoupper(substr(md5(uniqid('', true)), 0, 8));
    $pdo = get_pdo();
    $stmt = $pdo->prepare(
        'INSERT INTO ingredients (id, name, category, current_qty, min_limit, unit, bulk_unit, bulk_qty, location)
         VALUES (:id, :name, :category, :current_qty, :min_limit, :unit, :bulk_unit, :bulk_qty, :location)'
    );
    $stmt->execute([
        ':id'          => $id,
        ':name'        => trim($b['name']),
        ':category'    => $b['category']    ?? null,
        ':current_qty' => (float)($b['current_qty'] ?? 0),
        ':min_limit'   => (float) $b['min_limit'],
        ':unit'        => $b['unit']        ?? 'KG',
        ':bulk_unit'   => $b['bulk_unit']   ?? null,
        ':bulk_qty'    => (float)($b['bulk_qty'] ?? 1),
        ':location'    => $b['location']    ?? 'Maamoura Kitchen',
    ]);

    // also ensure category exists
    if (!empty($b['category'])) {
        $pdo->prepare('INSERT IGNORE INTO categories (name) VALUES (?)')
            ->execute([$b['category']]);
    }

    $row = $pdo->query("SELECT * FROM ingredients WHERE id = " . $pdo->quote($id))->fetch();
    $row['current_qty'] = (float) $row['current_qty'];
    $row['min_limit']   = (float) $row['min_limit'];
    $row['bulk_qty']    = (float) $row['bulk_qty'];
    json_out(['success' => true, 'data' => $row], 201);
}

// PUT — update current_qty
if ($method === 'PUT') {
    $b  = body();
    $id = $b['id'] ?? null;
    if (!$id) json_err('id required');

    $mode = $b['mode'] ?? 'add';   // 'add' | 'set'
    $qty  = (float)($b['qty'] ?? 0);
    $pdo  = get_pdo();

    if ($mode === 'add') {
        $stmt = $pdo->prepare(
            'UPDATE ingredients SET current_qty = GREATEST(0, current_qty + :qty) WHERE id = :id'
        );
    } else {
        $stmt = $pdo->prepare(
            'UPDATE ingredients SET current_qty = GREATEST(0, :qty) WHERE id = :id'
        );
    }
    $stmt->execute([':qty' => $qty, ':id' => $id]);
    json_out(['success' => true]);
}

json_err('Method not allowed', 405);
