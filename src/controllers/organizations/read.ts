
import express from 'express'
import { Request, Response } from 'express'
import { Model, ObjectId } from 'mongoose';
import { BadRequestError } from '../../errors';
import { currentUser, requireAuth } from '../../middlewares';
import { Customer, Program, Payment, Project, Organization } from '../../models';
import { OrganizationAttrs } from '../../models/organization';

export const getOrganizations = async (filter: Object, sort: Object) => {
  const organizations = await Organization.find(filter).sort(sort);

  return organizations;
}

export const getOneOrganizationById = async (organizationId: ObjectId) => {
  const organization = await Organization.findById(organizationId);

  return organization;
}
export const getOneOrganization = async (filter: Object) => {
  const organization = await Organization.findOne(filter);

  return organization;
}
export const createOrganization = async (organizationSchema: OrganizationAttrs) => {
  const organization = Organization.build(organizationSchema);
  await organization.save();

  return organization;
}
export const updateOrganization = async (organizationToUpdate: any, organizationSchema: OrganizationAttrs) => {
  const organization = organizationToUpdate.set(organizationSchema);

  await organizationToUpdate.save();
  return organization;
}

export const deleteOneOrganization = async (organizationId: ObjectId) => {
  const organizations = await Organization.deleteOne(organizationId);

  return organizations;
}


export const getAllProjects = async (filter: Object, sort: Object) => {
  const organizations = await Project.find(filter).sort(sort);

  return organizations;
}
export const getAllCustomers = async (filter: Object, sort: Object) => {
  const organizations = await Customer.find(filter).sort(sort);

  return organizations;
}
export const getAllPrograms = async (isAdmin: boolean, filter: Object, sort: Object) => {
  const organizations = await Program.find(filter).sort(sort);

  return organizations;
}
export const getAllPayments = async (isAdmin: boolean, filter: Object, sort: Object) => {
  const organizations = await Payment.find(filter).sort(sort);

  return organizations;
}