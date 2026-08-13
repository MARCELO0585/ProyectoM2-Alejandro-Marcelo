const postsService = require('../services/posts.service');
const authorsService = require('../services/authors.service');

exports.getAll = async (req, res, next) => {
  try {
    const posts = await postsService.getAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const post = await postsService.getById(req.params.id);
    if (!post) return res.status(404).json({ message: `Publicación con ID ${req.params.id} no encontrada` });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.getByAuthorId = async (req, res, next) => {
  try {
    const author = await authorsService.getById(req.params.authorId);
    if (!author) return res.status(404).json({ message: `Autor con ID ${req.params.authorId} no encontrado` });

    const posts = await postsService.getByAuthorId(req.params.authorId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    const author = await authorsService.getById(author_id);
    if (!author) return res.status(400).json({ message: `El author_id ${author_id} no existe` });

    const newPost = await postsService.create({ title, content, author_id, published });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await postsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: `Publicación con ID ${req.params.id} no encontrada` });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await postsService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: `Publicación con ID ${req.params.id} no encontrada` });
    res.json({ message: `Publicación ${req.params.id} eliminada` });
  } catch (err) {
    next(err);
  }
};