import app from './app.js'
import {coneccionBD} from "./db.js";

const PORT = process.env.PORT || 3000;

coneccionBD();
app.listen(PORT);

console.log("Servidor corriendo en el puerto:" , PORT )