// from the tutorial:
// https://www.mongodb.com/languages/javascript/mongodb-and-npm-tutorial

import { MongoClient } from 'mongodb';

class MongoDbUtils {

    async connectToCluster(uri) {
        let mongoClient;
     
        try {
            mongoClient = new MongoClient(uri);
            console.log('Connecting to MongoDB Atlas cluster...');
            await mongoClient.connect();
            console.log('Successfully connected to MongoDB Atlas!');
     
            return mongoClient;
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);
            process.exit();
        }
     };
}

export {MongoDbUtils};

