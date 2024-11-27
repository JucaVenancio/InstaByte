import fs from "fs";
import descriptionGeneratorWithGemini from "../../services/geminiServices.js";
import { getAllPosts, createPost, updatingPost } from "../models/postModel.js";


//Busca todos os posts
export async function listPosts(req, res) {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Fail the GET posts!" })
    }

}

//Cria um novo post
export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Resquest failure!!" })
    }

}

//Publica uma imagem 
export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        //Verifica se já existe a pasta 'upload', caso seja false cria uma   -->*Validação
        if (!fs.existsSync('upload')) { fs.mkdirSync('upload'); }
        const postCreated = await createPost(newPost);
        const imageUpdate = `upload/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imageUpdate);
        res.status(200).json(postCreated);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Fail to upload image!" });
    }

}

//Atualiza um novo post
export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/upload/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`upload/${id}.png`);
        const descricao = await descriptionGeneratorWithGemini(imageBuffer);
        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt
        }

        const postUpdate = await updatingPost(id, post);
        res.status(200).json(postUpdate);

    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Fail the update post!!" });
    }

}