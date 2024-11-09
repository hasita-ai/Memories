import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

// Controller function to get all posts
export const getPosts = async (req, res) => {
  //Retrieves all the posts from the database
  try {
    const postMessages = await PostMessage.find(); // Uses Mongoose's find method to fetch all documents (posts) from the PostMessage collection
    console.log('Posts fetched successfully:', postMessages); // Add logging here
    res.status(200).json(postMessages); // Sends the fetched posts as a JSON response with an HTTP status of 200 (OK)
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the error if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
  const updatePost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');
  const post = await PostMessage.findByIdAndUpdate(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
