const db = require('../config/db_conect');

class PostsService {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM posts ORDER BY id ASC');
    return rows;
  }

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    return rows[0];
  }

  async getByAuthorId(authorId) {
    const { rows } = await db.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY id ASC', [authorId]);
    return rows;
  }

  async create({ title, content, author_id, published = false }) {
    const { rows } = await db.query(
      'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, author_id, published]
    );
    return rows[0];
  }

  async update(id, { title, content, published }) {
    const post = await this.getById(id);
    if (!post) return null;

    const newTitle = title !== undefined ? title : post.title;
    const newContent = content !== undefined ? content : post.content;
    const newPublished = published !== undefined ? published : post.published;

    const { rows } = await db.query(
      'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
      [newTitle, newContent, newPublished, id]
    );
    return rows[0];
  }

  async delete(id) {
    const { rows } = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}

module.exports = new PostsService();