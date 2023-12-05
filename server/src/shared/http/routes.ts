import express from 'express'

import MessageResponse from '../../interfaces/MessageResponse.ts'
import emojis from '../../api/emojis.ts'
import ToastController from "../../modules/punch-clock/controllers/ToastController.ts"
import WorkScheduleController from "../../modules/punch-clock/controllers/WorkScheduleController.ts";
import TaskController from "../../modules/tasks/controller/TaskController.ts";



const routes = express.Router()

routes.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    })
})

routes.post('/testToast', ToastController.show)
routes.post('/updateWorkSchedule', WorkScheduleController.update)
routes.post('/setDefaultWorkSchedule', WorkScheduleController.setDefault)
routes.get('/getWorkSchedule', WorkScheduleController.get)
routes.get('/getTasks', TaskController.get)
routes.post('/createTask', TaskController.create)


routes.use('/emojis', emojis)

export default routes
