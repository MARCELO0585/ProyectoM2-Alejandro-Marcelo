const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio y no puede estar vacío' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'El email es obligatorio y debe tener un formato válido' });
  }
  next();
};

const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'El título es obligatorio y no puede estar vacío' });
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ message: 'El contenido es obligatorio y no puede estar vacío' });
  }
  if (!author_id || isNaN(parseInt(author_id))) {
    return res.status(400).json({ message: 'El author_id es obligatorio y debe ser un número entero' });
  }
  next();
};

module.exports = { validateAuthor, validatePost };
