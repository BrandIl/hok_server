import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session'
import { currentUser, requireAuth, errorHandler } from './src/middlewares';
import { NotFoundError } from './src/errors';


import {
  currentUserRouter, signoutRouter, signinRouter, signupRouter,
  createCustomerRouter,
  createArrgFileRouter,
  createOrganizationRouter,
  createProgramRouter,
  createProjectRouter,
  deleteCustomerRouter,
  deleteOrganizationRouter,
  deleteProgramRouter,
  deleteProjectRouter,
  readCustomersRouter,
  readOrganizationsRouter,
  readProgramsRouter,
  readProjectsRouter,
  showCustomerRouter,
  showOrganizationRouter,
  showProgramRouter,
  showProjectRouter,
  updateCustomerRouter,
  updateOrganizationRouter,
  updateProgramRouter,
  updateProjectRouter,
  createPaymentRouter,
  deletePaymentRouter,
  readPaymentsRouter,
  showPaymentRouter,
  updatePaymentRouter,
  createUserRouter,
  deleteUserRouter,
  readUsersRouter,
  showUserRouter,
  updateUserRouter,
  deleteManyOrganizationRouter
} from './src/routes';



const app = express();

app.set('trust-proxy', true);
app.use(json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
  next();
});

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(createCustomerRouter);
app.use(readCustomersRouter);
app.use(updateCustomerRouter);
app.use(deleteCustomerRouter);
app.use(showCustomerRouter);

app.use(createOrganizationRouter);
app.use(readOrganizationsRouter);
app.use(updateOrganizationRouter);
app.use(deleteOrganizationRouter);
app.use(showOrganizationRouter)
app.use(deleteManyOrganizationRouter)

app.use(createProgramRouter);
app.use(readProgramsRouter);
app.use(updateProgramRouter);
app.use(deleteProgramRouter);
app.use(showProgramRouter);

app.use(createProjectRouter);
app.use(readProjectsRouter);
app.use(updateProjectRouter);
app.use(deleteProjectRouter);
app.use(showProjectRouter);

app.use(createPaymentRouter);
app.use(readPaymentsRouter);
app.use(updatePaymentRouter);
app.use(deletePaymentRouter);
app.use(showPaymentRouter);

app.use(createUserRouter);
app.use(readUsersRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(showUserRouter);

app.use(createArrgFileRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
