import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './users/userRoutes.js';
import supplierRoutes from './supliers/supliersRoute.js';
import userRolesRoutes from './roles/UserRolesRoutes.js';
import customerRoutes from './customers/customerRouter.js';
import productRoutes from './product/productRoute.js';
import categoryRoutes from './categories/categoriesRoutes.js';
import subcategoryRoutes from './categories/subCategoriesRoutes.js';
import attributeRoutes from './attribute/attributeRoue.js';


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

app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/userRoles', userRolesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/attributes', attributeRoutes);
//SERVER
const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})