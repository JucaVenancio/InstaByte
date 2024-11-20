import express from "express";

const posts = [

    {
        id: 0,
        descricao: "Teste 1",
        imagem: "https://placecats.com/millie/300/150",
        data: "2023-11-23",
        autor: "João Silva",
        curtidas: 10
    },
    {
        id: 1,
        descricao: "Novidades sobre JavaScript!",
        imagem: "https://via.placeholder.com/600/400",
        data: "2023-11-22",
        autor: "Maria Oliveira",
        comentarios: 5
    },
    {
        id: 2,
        descricao: "Receita deliciosa de bolo de chocolate",
        imagem: "https://picsum.photos/id/237/400/300",
        data: "2023-11-21",
        categoria: "Receitas",
        tempoPreparo: "30 minutos"
    },
    {
        id: 3,
        descricao: "Dicas para iniciantes em programação",
        imagem: "https://source.unsplash.com/random/400x300",
        data: "2023-11-20",
        tags: ["programação", "javascript", "html", "css"]
    },
    {
        id: 4,
        descricao: "Viagem incrível para a Europa!",
        imagem: "https://unsplash.com/photos/SihUkdP-L4s",
        data: "2023-11-19",
        local: "Paris, França",
        avaliacao: 5
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function getPostID(id)
{
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
}

app.get("/posts/:id", (req, res) => {
    const index = getPostID(req.params.id);
    res.status(200).json(posts[index]);

})