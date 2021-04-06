import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session'
import {errorHandler,NotFoundError } from '@hok/common';

import {currentUserRouter } from './routes/auth/current-user';
import {signinRouter } from './routes/auth/signin';
import {signupRouter } from './routes/auth/signup';
import {signoutRouter } from'./routes/auth/signout';

import {createCustomerRouter } from './routes/customers/create';
import {readCustomersRouter } from './routes/customers/read';
import {updateCustomerRouter } from './routes/customers/update';
import {deleteCustomerRouter } from'./routes/customers/delete';
import {showCustomerRouter } from'./routes/customers/show';

import {createOrganizationRouter } from './routes/organizations/create';
import {readOrganizationsRouter } from './routes/organizations/read';
import {updateOrganizationRouter } from './routes/organizations/update';
import {deleteOrganizationRouter } from'./routes/organizations/delete';
import {showOrganizationRouter } from'./routes/organizations/show';

import {createProgramRouter } from './routes/programs/create';
import {readProgramsRouter } from './routes/programs/read';
import {updateProgramRouter } from './routes/programs/update';
import {deleteProgramRouter } from'./routes/programs/delete';
import {showProgramRouter } from'./routes/programs/show';

import {createProjectRouter } from './routes/projects/create';
import {readProjectsRouter } from './routes/projects/read';
import {updateProjectRouter } from './routes/projects/update';
import {deleteProjectRouter } from'./routes/projects/delete';
import {showProjectRouter } from'./routes/projects/show';

import {createUserRouter } from './routes/users/create';
import {readUsersRouter } from './routes/users/read';
import {updateUserRouter } from './routes/users/update';
import {deleteUserRouter } from'./routes/users/delete';
import {showUserRouter } from'./routes/users/show';


const app = express();

app.set('trust-proxy',true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

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

app.use(createUserRouter);
app.use(readUsersRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(showUserRouter);

app.use(cors());

app.all('*',async ()=>{
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
