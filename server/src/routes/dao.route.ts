import { Router } from 'express';
import { DAOController } from '../controller/dao.controller';
import { validateResponse } from "../middlewares/validate.middleware";

const router = Router();
const daoController = new DAOController();

router.use(validateResponse);

// Create single DAO
router.post('/daos', daoController.createDAO);

// Delete single DAO
router.delete('/daos/:id', daoController.removeDAO);

// Delete multiple/all DAOs
router.delete('/daos', daoController.deleteDAOs);

// Update DAO
router.put('/daos/:id', daoController.updateDAO);

// Get all DAOs
router.get('/daos', daoController.getAllDAOs);

// Get single DAO
router.get('/daos/:id', daoController.getSingleDAO);

export default router;