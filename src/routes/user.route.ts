/**
 * @author Ajantha Bandara
 * @description Keep all the routes
 */

import * as UserController from '../controllers/user.controller';

const routes = (app: any) => {
  // users routes
  app.route('/api/v1/users')
    .get(UserController.getUsers)
    .post(UserController.creteUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);
}

export default routes;