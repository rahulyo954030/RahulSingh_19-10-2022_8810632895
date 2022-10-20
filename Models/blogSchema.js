const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    title : String,
    body: String,
    category : String,
})

const blog = model("blogpost", blogSchema)

module.exports = blog;