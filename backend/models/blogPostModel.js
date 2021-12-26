import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);

export default blogPostModel;