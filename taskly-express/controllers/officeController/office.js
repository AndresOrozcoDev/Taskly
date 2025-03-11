const db = require('../../configs/database');

// Obtener todas las oficinas
exports.getAllOffices = (req, res) => {
    db.all('SELECT * FROM office', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
};

// Crear una nueva oficina
exports.createOffice = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    db.run('INSERT INTO office (name) VALUES (?)', [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name });
    });
};

// Eliminar una oficina por ID
exports.deleteOffice = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM office WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Office not found' });
        }
        res.json({ message: 'Office deleted successfully' });
    });
};
