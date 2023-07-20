import express, { Application } from "express";
import clientsRoutes from "./routes/clients.routes";

const app: Application = express();
app.use(express.json());

app.use('/clients', clientsRoutes)

export default app;