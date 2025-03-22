import express from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const openapiRouter = express.Router();
const swaggerDocument = YAML.load(path.join(process.cwd(), 'openapi.yaml'));

openapiRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default openapiRouter;
