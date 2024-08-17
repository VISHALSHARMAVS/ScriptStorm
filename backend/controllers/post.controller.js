import Post from '../model/post.model.js';
import  errorHandler  from '../utils/errorHandler.js';

export const createPost = async (req, res, next) => {
   
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return next(errorHandler(400, 'A post with this title already exists'));
    }
  try {
    const post = await Post.create({
            ...req.body,
            slug,
            userId: req.user.id,
    })
    res.status(201).json({success:true,post});
  } catch (error) {
    next(error);
  }
};