const db = require('../config/connection')
const collection = require('../config/collections');
const { resolve, reject } = require('promise');
const ObjectId = require('mongodb').ObjectID
module.exports={
    addProduct : (product,callback) => {
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllProducts: ()=>{
        return new Promise(async (resolve,reject) => {
            let products =  await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct : (proId) => {
        return new Promise ((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id : ObjectId(proId) }).then((response) => {
                console.log(response);
                resolve(response);
            })
        })
    },
    getProductDetails : (proId) => {
        return new Promise ((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id : ObjectId(proId)}).then((product) => {
                resolve(product);
            })
        })
    },
    updateProduct : (proId,proDetails) => {
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id : ObjectId(proId)},{
                $set:{
                    name: proDetails.name,
                    price : proDetails.price,
                    description : proDetails.description
                }
            }).then((response) => {
                resolve(response)
            })
        })
    }
}
