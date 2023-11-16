import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import AdminJsSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Course, Episode, User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";
import { authtenticationOptions } from "./authentication";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import session from "express-session";
import connectSession from "connect-session-sequelize";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";

const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });
store.sync();

AdminJs.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJs({
  databases: [sequelize],
  resources: adminJsResources,
  rootPath: "/admin",
  locale: locale,
  dashboard: dashboardOptions,
  branding: brandingOptions,
});

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  authtenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD,
  }
);
