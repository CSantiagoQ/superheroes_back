import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/authRoutes';
import heroRoutes from '../src/routes/heroRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite que tu frontend acceda al backend
app.use(express.json());

const personas = [
  { id: 1, nombre: 'Tyron', edad: 36 },
  { id: 2, nombre: 'Dongle', edad: 16 },
  { id: 3, nombre: 'Sprite', edad: 18 },
  { id: 4, nombre: 'hopper', edad: 20 },
  { id: 5, nombre: 'Carlos', edad: 34 },
  { id: 6, nombre: 'Lucía', edad: 29 },
  { id: 7, nombre: 'Angel', edad: 45 },
  { id: 8, nombre: 'Ariel', edad: 22 },
  { id: 9, nombre: 'Javier', edad: 31 },
  { id: 10, nombre: 'Jose Juan', edad: 27 },
];

app.get('/', (req, res) => {
  res.send('<h1>!Bienvenido a mi API con Express y TypeScript</h1>');
});

app.get('/personas/:id', (req, res) => {
  const numid = parseInt(req.params.id);
  const persona = personas.find((persona) => persona.id === numid);
  res.send(
    `<h1> el usuario solicitado es: ${persona ? persona.nombre : 'no encontrado'}</h1>`
  );
});

app.get('/mul/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const resultado = num1 * num2;
  res.send(`<h1> el resultado es: ${resultado} </h1>`);
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/heroes', heroRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
