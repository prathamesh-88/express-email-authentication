//Database connection and setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const {MONGODB_URI} = require('../constants/environment.js');
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Global constants
const {SUCCESS, FAILED} = require('../constants/global.js');


async function add_entry(target_db, target_collection, entry){
    let query_result = {
                status: FAILED,
                error: 'Cannot process, try again later'
            };
    try{
        await client.connect();
        const db = client.db(target_db);
        const collection = db.collection(target_collection);
        const result = await collection.insertOne(entry);
        query_result = {
            status: SUCCESS,
            _id: result.insertedId,
        }
    }catch(err){
        query_result = {
            status: FAILED,
            error: 'Database error',
            details: err
        }
    }finally{
        client.close();
    }
    return query_result;
}


async function find_one_entry(target_db, target_collection, parameters){
    let query_result = {
        status: 'failed',
        error: 'Cannot process, try again later'
    };
    try{
        await client.connect();
        const db = client.db(target_db);
        const collection = db.collection(target_collection);
        const result = await collection.findOne(parameters);
        // console.log("Parameters",parameters)
        // console.log("Inside find one query", result)
        if (result){
            query_result = {
                status: 'success',
                result: result
            }
        }else{
            query_result = {
                status: 'failed',
                error: 'No such documents found'
            }
        }

    }catch(err){
        query_result = {
            status: 'failed',
            error: 'Database error',
            details: err
        }
    }finally{
        client.close();
    }

    return query_result;
}

module.exports = {add_entry, find_one_entry};

