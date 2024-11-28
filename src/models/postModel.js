import 'dotenv/config'
import { ObjectId } from "mongodb";
import databaseConnection from "../config/dbConfig.js";

let connection;

(async () => {
    try {
        connection = await databaseConnection(process.env.STRING_CONNECTION);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
})();

export async function getAllPosts() {
    try {
        if (!connection) {
            throw new Error("No database connection");
        }
        const db = connection.db("InstaByte");
        const collection = db.collection("posts");
        return await collection.find().toArray();
    } catch (error) {
        console.error("Failed to retrieve posts:", error);
    }
}

export async function createPost(newPost) {
    try {
        if (!connection) {
            throw new Error("No database connection");
        }
        const db = connection.db("InstaByte");
        const collection = db.collection("posts");
        return await collection.insertOne(newPost);
    } catch (error) {
        console.error("Failed to create new post:", error);
    }

}

async function getPostById(id) {
    const { ObjectId } = require('mongodb');

    try {
        if (!connection) {
            throw new Error("No database connection");
        }
        const db = connection.db("InstaByte");
        const collection = db.collection("posts");
        return await collection.findOne({ _id: ObjectId(id) });
    } catch (error) {
        console.error("Failed the get post by id:", error);
    }
}

export async function updatingPost(id, newPost) {
    const db = connection.db("InstaByte");
    //const collection = getPostById(id);
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);

    try {

        if (!collection) {
            throw new Error("Post not found!")
        }

        return await collection.updateOne({ _id: objID }, { $set: newPost });

    } catch (error) {

        console.error("Failed the updating post:", error);
    }

}
