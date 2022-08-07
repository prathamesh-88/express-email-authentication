//Database connection and setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const {MONGODB_URI} = require('../constants/environment.js');
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Global constants
const {SUCCESS, FAILED} = require('../constants/global.js');


async function addEntry(targetDb, targetCollection, entry){
    let queryResult = {
                status: FAILED,
                error: 'Cannot process, try again later'
            };
    try{
        await client.connect();
        const db = client.db(targetDb);
        const collection = db.collection(targetCollection);
        const result = await collection.insertOne(entry);
        queryResult = {
            status: SUCCESS,
            _id: result.insertedId,
        }
    }catch(err){
        queryResult = {
            status: FAILED,
            error: 'Database error',
            details: err
        }
    }finally{
        client.close();
    }
    return queryResult;
}

async function findOneEntry(targetDb, targetCollection, parameters){
    let queryResult = {
        status: 'failed',
        error: 'Cannot process, try again later'
    };
    try{
        await client.connect();
        const db = client.db(targetDb);
        const collection = db.collection(targetCollection);
        const result = await collection.findOne(parameters);
        if (result){
            queryResult = {
                status: 'success',
                result: result
            }
        }else{
            queryResult = {
                status: 'failed',
                error: 'No such documents found'
            }
        }

    }catch(err){
        queryResult = {
            status: 'failed',
            error: 'Database error',
            details: err
        }
    }finally{
        client.close();
    }

    return queryResult;
}

async function updateOneEntry(targetDb, targetCollection, parameters, update){
    let queryResult = {
        status: FAILED,
        error: 'Cannot process, try again later'
    };
    try{
        await client.connect();
        const db = client.db(targetDb);
        const collection = db.collection(targetCollection);
        const result = await collection.updateOne(parameters, update);
        if (result){
            queryResult = {
                status: SUCCESS,
                result: result
            }
        }else{
            queryResult = {
                status: FAILED,
                error: 'No such documents found'
            }
        }

    }catch(err){
        queryResult = {
            status: FAILED,
            error: 'Database error',
            details: err
        }
    }finally{
        client.close();
    }

    return queryResult;
}

module.exports = {addEntry, findOneEntry, updateOneEntry};

