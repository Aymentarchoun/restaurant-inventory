<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET — fetch logs filtered by date range
if ($method === 'GET') {
    $from = $_GET['from'] ?? date('Y-m-d', strtotime('-30 days'));
    $to   = $_GET['to']   ?? date('Y-m-d');

    $from_dt = $from . ' 00:00:00';
    $to_dt   = $to   . ' 23:59:59';

    $stmt = get_pdo()->prepare(
        'SELECT u.*, i.name AS ingredient_name, i.unit
         FROM usage_logs u
         LEFT JOIN ingredients i ON i.id = u.ingredient_id
         WHERE u.timestamp BETWEEN :from AND :to
         ORDER BY u.staff_name, u.timestamp'
    );
    $stmt->execute([':from' => $from_dt, ':to' => $to_dt]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['qty_deducted'] = (float) $r['qty_deducted'];
    }
    json_out(['success' => true, 'data' => $rows]);
}

// POST — insert usage logs and deduct quantities (atomic transaction)
if ($method === 'POST') {
    $b    = body();
    $logs = $b['logs']       ?? [];
    $name = $b['staff_name'] ?? '';

    if (empty($logs))  json_err('logs array required');
    if (empty($name))  json_err('staff_name required');

    $pdo = get_pdo();
    $pdo->beginTransaction();
    try {
        $insert = $pdo->prepare(
            'INSERT INTO usage_logs (id, ingredient_id, qty_deducted, staff_name, location, timestamp)
             VALUES (:id, :ingredient_id, :qty_deducted, :staff_name, :location, NOW())'
        );
        $deduct = $pdo->prepare(
            'UPDATE ingredients
             SET current_qty = GREATEST(0, current_qty - :qty)
             WHERE id = :id'
        );

        foreach ($logs as $log) {
            $id  = 'log-' . bin2hex(random_bytes(8));
            $qty = (float)($log['qty_deducted'] ?? 0);
            if ($qty <= 0) continue;

            $insert->execute([
                ':id'            => $id,
                ':ingredient_id' => $log['ingredient_id'],
                ':qty_deducted'  => $qty,
                ':staff_name'    => $name,
                ':location'      => $log['location'] ?? 'Maamoura Kitchen',
            ]);
            $deduct->execute([':qty' => $qty, ':id' => $log['ingredient_id']]);
        }

        $pdo->commit();
        json_out(['success' => true]);
    } catch (Throwable $e) {
        $pdo->rollBack();
        json_err('Transaction failed: ' . $e->getMessage(), 500);
    }
}

json_err('Method not allowed', 405);
