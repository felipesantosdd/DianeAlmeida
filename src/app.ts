import express, { Application } from "express";
import clientsRoutes from "./routes/clients.routes";
import contractRoutes from "./routes/contracts.routes";
import addressRoutes from "./routes/address.routes";

const app: Application = express();
app.use(express.json());

app.use('/clients', clientsRoutes)
app.use('/contracts', contractRoutes)
app.use('/address', addressRoutes)

export default app;