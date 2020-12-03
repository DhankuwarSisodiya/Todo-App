import express from 'express';
import todoController from './../controllers/todo.controller';

const router = express.Router();

/**
 * Search - GET /todo
 * Create - POST /todo
*/
router.route('/todo')
    .get(todoController.index)
    .post(todoController.create);

/**
 * Retrieve - GET /todo/${id}
 * Update - GET /todo/${id}
 * Delete - DELETE /todo/${id}
*/
router.route('/todo/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default router;