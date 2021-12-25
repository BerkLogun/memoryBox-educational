import mongoose from 'mongoose';

const memoScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    creator: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
})


const Memory = mongoose.model('memo',memoScheme)

export default Memory