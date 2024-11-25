import express from "express";
import {listPosts, postNewPost, updatePost} from "../controllers/postsController.js";

const routes = (app) => {

    app.use(express.json());

    app.get("/posts", listPosts);
    app.post("/posts",postNewPost);
    app.put("/posts/:id", updatePost);
}


export default routes;