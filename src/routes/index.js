import hadits from './v1/getRouter'

const routes = (app) => {
  app.use(hadits)
}

export default routes
