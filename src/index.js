import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './users/userRoutes.js';
import supplierRoutes from './supliers/supliersRoute.js';
import userRolesRoutes from './users/UserRolesRoutes.js';
import customerRoutes from './customers/customerRouter.js';
import productRoutes from './product/productRoute.js';
import categoryRoutes from './categories/categoriesRoutes.js';
import subcategoryRoutes from './categories/subCategoriesRoutes.js';

//CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Handle bad JSON syntax
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     return res.status(400).json({ error: 'Invalid JSON format in request body' });
//   }
//   next();
// });



app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/userRoles', userRolesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
//SERVER
const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})