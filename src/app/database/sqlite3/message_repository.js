class MessageRepository {
    constructor(dao) {
        this.dao = dao;
        this.tabel = 'messenger';
    }

    _createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tabel} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        to_id TEXT,
        from_id TEXT,
        short_id TEXT,
        status INTEGER DEFAULT 0,
        created_at TEXT)`;
        return this.dao.run(sql)
    }

    _create(message, to_id, from_id, short_id, status, created_at) {
        return this.dao.run(
            `INSERT INTO ${this.tabel} (message, to_id, from_id, short_id, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?)`,
            [message, to_id, from_id, short_id, status, created_at])
    }

    _update(data) {
        const { message, status, id } = data;
        return this.dao.run(
            `UPDATE ${this.tabel}
              SET message = ?,
              status =?
              WHERE id = ?`,
            [message, status, id]
        )
    }

    _delete(id) {
        return this.dao.run(
            `DELETE FROM ${this.tabel}
              WHERE id = ?`,
            [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM ${this.tabel} ORDER BY created_at ASC`)
    }

    getById(id) {
       return this.dao.get(`SELECT * FROM ${this.tabel} WHERE id = ? ORDER BY created_at ASC`, [id])
    }

    getByFieldName(key, value) {
        return this.dao.all(`SELECT * FROM ${this.tabel} WHERE ${key} = ? ORDER BY created_at ASC`, [value]);
    }
}

export default MessageRepository;
