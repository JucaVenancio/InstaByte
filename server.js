import express from "express";
import routes from "./src/routes/postsRoutes.js";


const app = express();
routes(app);
app.listen(3000, () => {
    console.log("Servidor escutando");
});



/*function getPostID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
}

app.get("/posts/:id", (req, res) => {
    const index = getPostID(req.params.id);
    res.status(200).json(posts[index]);

})

*/