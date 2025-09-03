import express from 'express';
import morgan from 'morgan';
import InvoiceRoutes from "./routes/Invoice.routes.js"
import UserRoutes from "./routes/User.routes.js"
import RatesRoutes from "./routes/Rates.routes.js"

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use('/invoice', InvoiceRoutes);
app.use('/rates', RatesRoutes);
app.use('/user', UserRoutes);

export default app;