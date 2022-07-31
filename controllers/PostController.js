import PostModel from '../models/Post';

export const create = (res, req) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    });
  } catch (error) {}
};
