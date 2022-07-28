const User = {
    required : {
        fname : 'string',
        lname : 'string',
        email : 'EMAIL',
        password : 'string'
    },
    optional :{
        nItems : 'INTEGER'
    }
}


module.exports = User;