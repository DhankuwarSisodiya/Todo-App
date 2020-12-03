import todoService from '../services/todo.service';

/**
 * Controller to get all todo items
 * @param {*} request : api request
 * @param {*} response : api response
 */
const index = (request, response) => {
    todoService.search({})
        .then((todo) => {
            response.status(200);
            response.json(todo);
            console.log(todo);
        })
        .catch(handleError(response));
};

/**
 * Controller to get todo item by id param
 * @param {*} request : api request
 * @param {*} response : api response
 */
const get = (request, response) => {
    const id = request.params.id;
    todoService.get(id)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Controller to create a new todo item
 * @param {*} request : api request
 * @param {*} response : api response
 */
const create = (request, response) => {
    let obj = {
        title : request.body.title,
        description: request.body.description,
        dueDate: request.body.dueDate,
        time: request.body.time,
        completed: request.body.completed
    }
    console.log(obj)
    const newtodo = Object.assign({}, obj);
    todoService.create(newtodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Controller to update a todo item by id param
 * @param {*} request : api request
 * @param {*} response : api response
 */
const update = (request, response) => {
    const id = request.params.id;
    let obj = {
        title : request.body.title,
        description: request.body.description,
        time: request.body.time,
        completed: request.body.completed
    }
    const updatetodo = Object.assign({}, obj);
    todoService.update(id, updatetodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Controller to delete a todo item by id param
 * @param {*} request : api request
 * @param {*} response : api response
 */
const remove = (request, response) => {
    const id = request.params.id;
    todoService.remove(id)
        .then((todo) => {
            response.status(200);
            response.json({
                message: "Delete Successful"
            });
        })
        .catch(handleError(response));
};

/**
 * Controller function to handle error status and response
 * @param {*} response : api response
 */
const handleError = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

export default {
    index: index,
    get: get,
    create: create,
    update: update,
    remove: remove
}