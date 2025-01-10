import { Router } from "express";
import { DAOController } from "../controller/dao.controller";
import { validateResponse } from "../middlewares/validate.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
const daoController = new DAOController();

router.use(validateResponse);

// Create DAO
router.post("/daos", auth, daoController.createDAO);

// Delete DAO
router.delete("/daos/:id", auth, daoController.removeDAO);

// Update DAO
router.put("/daos/:id", auth, daoController.updateDAO);

// Get all DAOs
router.get("/daos", daoController.getAllDAOs);

// Get single DAO
router.get("/daos/:id", daoController.getSingleDAO);

export default router;
