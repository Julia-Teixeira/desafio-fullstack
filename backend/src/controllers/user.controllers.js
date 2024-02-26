import UserService from "../services/user.services.js";

class UserController {
  async create(req, res) {
    // #swagger.tags = ['Users']
    const userService = new UserService();
    const userData = req.body;
    const newUser = await userService.create(userData);

    return res.status(201).json(newUser);
  }

  async getById(req, res) {
    const userService = new UserService();
    let user
    if(res.locals.userParams != undefined){
      user = await userService.getById(res.locals.userParams)
    } else {
      user = await userService.getById(res.locals.userTokenId)
    }
  

    return res.status(200).json(user);
  }

  async update(req, res) {
    const userService = new UserService();
    const updatedData = req.body;
    return res.status(200).json(await userService.partialUpdate(req.params.id, updatedData));
  }

  async delete(req, res) {
    const userService = new UserService();
    await userService.delete(req.params.id);
    return res.sendStatus(204);
  }
  
  async login(req, res) {
    const userService = new UserService();
    return res.status(200).json(await userService.login(req.body));
  }
}

export default UserController;
