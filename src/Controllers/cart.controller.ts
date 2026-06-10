import { Request, Response } from 'express';
import knex from '../database';

interface AuthRequest extends Request {
  userId?: number;
}

interface CartItem {
  user_id: number;
  superheroe_id: number;
  quantity: number;
}

const parseHeroId = (value: unknown): number | null => {
  const heroId = Number(value);
  return Number.isInteger(heroId) && heroId > 0 ? heroId : null;
};

const findHero = async (heroId: number) => {
  return knex('catsuperheroe').where({ id: heroId }).first();
};

export const getCart = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }

  try {
    const items = await knex('cart_items as ci')
      .select('c.*', 'ci.quantity')
      .join('catsuperheroe as c', 'c.id', '=', 'ci.superheroe_id')
      .where('ci.user_id', userId)
      .orderBy('c.nombre', 'asc');

    return res.json(items);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al obtener el carrito.' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const heroId = parseHeroId(req.body.heroId);

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }
  if (!heroId) {
    return res
      .status(400)
      .json({ error: 'Se requiere un ID de heroe valido.' });
  }

  try {
    const hero = await findHero(heroId);
    if (!hero) {
      return res.status(404).json({ error: 'Heroe no encontrado.' });
    }

    const currentItem = await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .first();

    if (currentItem) {
      await knex<CartItem>('cart_items')
        .where({ user_id: userId, superheroe_id: heroId })
        .update({ quantity: currentItem.quantity + 1 });
    } else {
      await knex<CartItem>('cart_items').insert({
        user_id: userId,
        superheroe_id: heroId,
        quantity: 1,
      });
    }

    return res.json({ message: 'Heroe agregado al carrito.' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al agregar al carrito.' });
  }
};

export const incrementCartItem = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const heroId = parseHeroId(req.params.heroId);

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }
  if (!heroId) {
    return res
      .status(400)
      .json({ error: 'Se requiere un ID de heroe valido.' });
  }

  try {
    const currentItem = await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .first();

    if (!currentItem) {
      return res.status(404).json({ error: 'El heroe no esta en el carrito.' });
    }

    await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .update({ quantity: currentItem.quantity + 1 });

    return res.json({ message: 'Cantidad incrementada.' });
  } catch (error) {
    console.error('Error al incrementar carrito:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al incrementar el carrito.' });
  }
};

export const decrementCartItem = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const heroId = parseHeroId(req.params.heroId);

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }
  if (!heroId) {
    return res
      .status(400)
      .json({ error: 'Se requiere un ID de heroe valido.' });
  }

  try {
    const currentItem = await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .first();

    if (!currentItem) {
      return res.status(404).json({ error: 'El heroe no esta en el carrito.' });
    }

    if (currentItem.quantity <= 1) {
      await knex<CartItem>('cart_items')
        .where({ user_id: userId, superheroe_id: heroId })
        .del();
      return res.json({ message: 'Heroe eliminado del carrito.' });
    }

    await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .update({ quantity: currentItem.quantity - 1 });

    return res.json({ message: 'Cantidad decrementada.' });
  } catch (error) {
    console.error('Error al decrementar carrito:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al decrementar el carrito.' });
  }
};

export const removeCartItem = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const heroId = parseHeroId(req.params.heroId);

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }
  if (!heroId) {
    return res
      .status(400)
      .json({ error: 'Se requiere un ID de heroe valido.' });
  }

  try {
    const rowsDeleted = await knex<CartItem>('cart_items')
      .where({ user_id: userId, superheroe_id: heroId })
      .del();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ error: 'El heroe no estaba en el carrito.' });
    }

    return res.json({ message: 'Heroe eliminado del carrito.' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al eliminar del carrito.' });
  }
};
