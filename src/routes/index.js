import sqlite from './v1/saveSqlite'

const routes = (app) => {
  app.use(sqlite)
}

export default routes
