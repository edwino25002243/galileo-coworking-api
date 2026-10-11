const express = require('express');
const cors = require('cors');
const redis = require ('redis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const roleRoutes = require('./src/routes/role.routes');
const authRoutes = require('./src/routes/auth.routes');
const emailRoutes = require('./src/routes/email.routes');
require('./src/workers/email.worker');

const redisClient = redis.createClient({ url: 'redis://redis:6379'});

redisClient.on('connect', () => {
    console.log('Conexion exitosa a Redis establecida');
});

redisClient.on('error', (err) => {
    console.error('Error de conexion a Redis:', err);
});

redisClient.connect().catch(console.error);

app.use(cors());
app.use(express.json());
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log('Conexion exitosa a PostgreSQL (Prisma) establecida');
});