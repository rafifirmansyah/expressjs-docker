import express from 'express';
import env from 'dotenv';
import { createClient } from 'redis';
import pgPromiseLib from 'pg-promise';

env.config();

const app = express();
const port = process.env.APP_PORT;

app.get('/', (req, res) => res.send('Express JS with Redis and Postgres'));
app.get('/test-connection', async (req, res) => {
    // Redis
    const clientRedis = createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    clientRedis.on('error', (err) => console.log(`Redis Client Error`, err));

    await clientRedis.connect();

    // PostgreSQL
    const pgp = pgPromiseLib({});
    const db = pgp(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`);

    return res.send('Test Connection for Redis & PostgreSQL');
});

app.listen(port, () => {
    console.log(`Express JS with Redis and Postgres listening on port ${port}`);
});