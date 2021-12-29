import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);

export default blogPostModel;