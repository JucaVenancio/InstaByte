import {getAllPosts, createPost} from "../models/postModel.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);

}

export async function postNewPost(req, res){
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(posts);
    } catch(erro) {
             console.error(erro.message);
             res.status(500).json({"Erro":"Resquest failure!!"})
    }

}