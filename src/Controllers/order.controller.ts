import { Request, Response } from 'express';
import knex from '../database';

interface AuthRequest extends Request {
  userId?: number;
}

interface CartRow {
  superheroe_id: number;
  quantity: number;
  precio: string | number;
  nombre: string;
}

export const checkout = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }

  try {
    const order = await knex.transaction(async (trx) => {
      const cartItems: CartRow[] = await trx('cart_items as ci')
        .select('ci.superheroe_id', 'ci.quantity', 'c.precio', 'c.nombre')
        .join('catsuperheroe as c', 'c.id', '=', 'ci.superheroe_id')
        .where('ci.user_id', userId);

      if (cartItems.length === 0) {
        throw new Error('EmptyCart');
      }

      const total = cartItems.reduce((sum, item) => {
        return sum + Number(item.precio) * item.quantity;
      }, 0);

      const [newOrder] = await trx('orders')
        .insert({
          user_id: userId,
          status: 'en_camino',
          total: total.toFixed(2),
        })
        .returning('*');

      const orderItems = cartItems.map((item) => ({
        order_id: newOrder.id,
        superheroe_id: item.superheroe_id,
        quantity: item.quantity,
        precio: item.precio,
      }));

      const insertedItems = await trx('order_items')
        .insert(orderItems)
        .returning('*');

      await trx('cart_items').where({ user_id: userId }).del();

      return {
        ...newOrder,
        items: insertedItems,
      };
    });

    return res.status(201).json({
      message: 'Pedido creado con exito.',
      order,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'EmptyCart') {
      return res.status(400).json({ error: 'El carrito esta vacio.' });
    }

    console.error('Error al realizar checkout:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al crear el pedido.' });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(403)
      .json({ error: 'No autorizado. Usuario no logeado.' });
  }

  try {
    const orders = await knex('orders')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await knex('order_items as oi')
          .select(
            'oi.id',
            'oi.order_id',
            'oi.superheroe_id',
            'oi.quantity',
            'oi.precio',
            'c.nombre',
            'c.poder',
            'c.imagen_url'
          )
          .join('catsuperheroe as c', 'c.id', '=', 'oi.superheroe_id')
          .where('oi.order_id', order.id)
          .orderBy('c.nombre', 'asc');

        return {
          ...order,
          items,
        };
      })
    );

    return res.json(ordersWithItems);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    return res
      .status(500)
      .json({ error: 'Error interno del servidor al obtener pedidos.' });
  }
};
