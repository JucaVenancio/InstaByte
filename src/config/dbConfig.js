import { MongoClient } from 'mongodb';

export default async function databaseConnection(stringConnection) {

    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConnection);
        console.log("Connecting to the database cluster...");
        await mongoClient.connect();
        console.log("Connected to MongoDb Atlas successfully!");

        return mongoClient;
    } catch (error) {

        console.error("Fail to connection witch database!!", error);
        process.exit();
    }
}