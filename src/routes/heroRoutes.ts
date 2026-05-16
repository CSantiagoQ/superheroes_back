import { Router } from 'express';
import {
  getCatalog,
  addFavorite,
  getMyFavorites,
  createHero,
  updateHero,
  deleteHero,
  removeFavorite,
} from '../Controllers/heroController';
import { verifyToken } from '../Middlewares/authMiddleware';

const router = Router();

// Rutas Públicas (Lectura)
router.get('/catalog', getCatalog);

// Rutas Protegidas (Requieren Login)
router.get('/favorites', verifyToken, getMyFavorites);
router.post('/favorites', verifyToken, addFavorite);
router.delete('/favorites/:id', verifyToken, removeFavorite);

//
// Rutas CRUD de Administrador de Superhéroes (Requieren Login)
// CRUD -> CREATE, UPDATE, DELETE
//
router.post('/', verifyToken, createHero); // Agregar nuevo superhéroe
router.put('/:id', verifyToken, updateHero); // Modificar datos del superhéroe
router.delete('/:id', verifyToken, deleteHero); // Eliminar superhéroe

export default router;
