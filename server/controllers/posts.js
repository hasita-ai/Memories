import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';


// Controller function to get all posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();  // Fetch posts from MongoDB
    console.log('Posts fetched successfully:', postMessages); // Add logging here
    res.status(200).json(postMessages);  // Return the fetched posts in the response
  } catch (error) {
    console.error('Error fetching posts:', error);  // Log the error if something goes wrong
    res.status(404).json({ message: error.message });
  }
};

// You can also add other functions for creating, updating, and deleting posts like this:
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







// export const getPosts = async (req,res) => {
//     try {
//         const postMessages = await PostMessage.find();
//         res.status(200).json(postMessages);
//     }
//     catch (error) {
//         res.status(404).json({message: error.message});
//     }
    
// }

// export const createPost = async (req, res) => {
//     const post = req.body;
//     const newPost = new PostMessage(post);
//     try {
//         await newPost.save();
//         res.status(201).json(newPost);
//     }
//     catch (error) {
//         res.status(409).json({message: error.message});
//     }
// }


export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, {new:true});
    res.json(updatePost);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({message:'Post deleted successfully'});
}

export const likePost = async (req,res) => {
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findByIdAndUpdate(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new:true});
    res.json(updatedPost);
}