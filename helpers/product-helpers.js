const db = require('../config/connection')

module.exports={
    addProduct : (product,callback) => {
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    }
}