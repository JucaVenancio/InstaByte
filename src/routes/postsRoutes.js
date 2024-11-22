import express from "express";
import {listPosts, postNewPost} from "../controllers/postsController.js";

const routes = (app) => {

    app.use(express.json());

    app.get("/posts", listPosts);
    app.post("/posts",postNewPost);
}


export default routes;