import databaseConnection from "../config/dbConfig.js";

let connection;

(async () => {
    try {
        connection = await databaseConnection(process.env.STRING_CONNECTION);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
})();

export default async function getAllPosts() {
    try {
        if (!connection) {
            throw new Error("No database connection");
        }
        const db = connection.db("InstaByte");
        const collection = db.collection("posts");
        return await collection.find().toArray();
    } catch (error) {
        console.error("Failed to retrieve posts:", error);
        return [];
    }
}
