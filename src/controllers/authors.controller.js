const authorsService = require('../services/authors.service');

exports.getAll = async (req, res, next) => {
  try {
    const authors = await authorsService.getAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const author = await authorsService.getById(req.params.id);
    if (!author) return res.status(404).json({ message: `Autor con ID ${req.params.id} no encontrado` });
    res.json(author);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    const existing = await authorsService.getByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'El email ya se encuentra registrado' });
    }

    const newAuthor = await authorsService.create({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await authorsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: `Autor con ID ${req.params.id} no encontrado` });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await authorsService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: `Autor con ID ${req.params.id} no encontrado` });
    res.json({ message: `Autor ${req.params.id} y sus publicaciones asociadas eliminados` });
  } catch (err) {
    next(err);
  }
};
