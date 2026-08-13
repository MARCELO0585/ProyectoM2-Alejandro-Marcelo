const db = require('../config/db_conect');

class AuthorsService {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM authors ORDER BY id ASC');
    return rows;
  }

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    return rows[0];
  }

  async getByEmail(email) {
    const { rows } = await db.query('SELECT * FROM authors WHERE email = $1', [email]);
    return rows[0];
  }

  async create({ name, email, bio }) {
    const { rows } = await db.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio]
    );
    return rows[0];
  }

  async update(id, { name, email, bio }) {
    const author = await this.getById(id);
    if (!author) return null;

    const newName = name !== undefined ? name : author.name;
    const newEmail = email !== undefined ? email : author.email;
    const newBio = bio !== undefined ? bio : author.bio;

    const { rows } = await db.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
      [newName, newEmail, newBio, id]
    );
    return rows[0];
  }

  async delete(id) {
    const { rows } = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}

module.exports = new AuthorsService();
