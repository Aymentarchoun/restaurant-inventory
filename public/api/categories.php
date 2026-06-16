<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET — list all category names
if ($method === 'GET') {
    $rows = get_pdo()->query('SELECT name FROM categories ORDER BY name')->fetchAll();
    json_out(array_column($rows, 'name'));
}

// POST — add new category
if ($method === 'POST') {
    $b    = body();
    $name = trim($b['name'] ?? '');
    if (!$name) json_err('name required');

    try {
        get_pdo()->prepare('INSERT INTO categories (name) VALUES (?)')->execute([$name]);
        json_out(['success' => true], 201);
    } catch (PDOException $e) {
        // duplicate entry
        json_err('Category already exists', 409);
    }
}

json_err('Method not allowed', 405);
