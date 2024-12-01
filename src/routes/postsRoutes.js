import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, postNewPost, uploadImage, updatePost, listByIdUnique} from "../controllers/postsController.js";

const corsOptions = {

    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./upload", storage });

const routes = (app) => {

    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listPosts);
    app.get("posts/:id", listByIdUnique);
    app.post("/posts", postNewPost);
    app.post("/upload", upload.single("image"), uploadImage);
    app.put("/upload/:id", updatePost);
}


export default routes;