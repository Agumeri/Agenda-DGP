import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {options} from './swaggerOptions';

const specs = swaggerJSDoc(options);

import userRoutes from './routes/usuario';
import adminRoutes from './routes/administrador';
import profeRoutes from './routes/profesor';
import inventarioRoutes from './routes/inventario';
import objetosRoutes from './routes/objetos';
import tareaRoutes from './routes/tarea';
import alumnoRoutes from './routes/alumno';
import autorizacionRoutes from './routes/autorizacion';
import multimediaRoutes from './routes/multimedia';
import claseRoutes from './routes/clase';
//import dgpRoutes from './routes/dgp';






const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Usamos las rutas de cada tabla
app.use(userRoutes);
app.use(adminRoutes);
app.use(profeRoutes);
app.use(inventarioRoutes);
app.use(objetosRoutes);
app.use(tareaRoutes);
app.use(alumnoRoutes);
app.use(autorizacionRoutes);
app.use(multimediaRoutes);
app.use(claseRoutes);
//app.use(dgpRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))



export default app;