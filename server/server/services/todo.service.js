import Todo from '../models/todo';

/**
 * Service to search for todo items
 * @param {*} filter : search condition
 */
const search = (filter) => {
    const promise = Todo.find(filter).exec();
    return promise;
};

/**
 * Service to find todo by id
 * @param {*} id : Todo Id
 */
const get = (id) => {
    const promise = Todo.findById(id).exec();
    return promise;
}

/**
 * Service to create a new todo
 * @param {*} newtodo : Todo object to be added
 */
const create = (newtodo) => {
    const todo = new Todo(newtodo);
    const promise = todo.save();
    return promise;
}

/**
 * Service to update a todo by id
 * @param {*} id : id of item to be updated
 * @param {*} updatedtodo : updated values
 */
const update = (id, updatedtodo) => {
    const promise = Todo.findByIdAndUpdate(
        { _id: id },
        updatedtodo,
        { new: true,runValidators: true }
    ).exec();
    return promise;
}

/**
 * Service to delete todo by id 
 * @param {*} id : id of item to be removed
 */
const remove = (id) => {
    const promise = Todo.remove({ _id: id }).exec();
    return promise;
}

export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}