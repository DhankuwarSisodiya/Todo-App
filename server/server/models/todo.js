import mongoose from 'mongoose';
/**
 * Schema constructor to declare model 
 */
const todo = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title is a required property."
        },
        description: {
            type: String
        },
        createdDate: {
            type: Date,
            default: Date.now,
            noUpdate: true
        },
        dueDate: {
            type: Date
        },
        time: {
            type: String
        },
        completed:{
            type: Boolean
        }
    },
    {
        versionKey: false
    }
);

/**
 * Creates a virtual type with the given name.
 */
todo.virtual('id').get(function() {
    return this._id.toHexString();
});

/**
 * Sets/gets a schema option.

@param key — option name

@param value — if not passed, the current option value is returned
 */
todo.set('toJSON', { virtuals: true });

const model = mongoose.model('Todo', todo);

export default model;