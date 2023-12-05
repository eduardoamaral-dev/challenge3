import {Request, Response} from 'express'

import TaskService from "../services/TaskService.ts";
import {inject, injectable} from "tsyringe";
import {container} from "../../../shared/container/diContainer.ts";
import WorkScheduleService from "../../punch-clock/services/WorkScheduleService.ts";

@injectable()
class TaskController {

    constructor() {
    }

    public create(req: Request, res: Response) {
        const service = container.resolve(TaskService)
        try {
            service.create(req.body);
            res.send().status(200)
        } catch (e) {
            res.send(e).status(400)
        }
    }

    public get(req: Request, res: Response) {
        const service = container.resolve(TaskService)
        service.getAll()
            .then((result) => {
                res.send(result).status(200)})
            .catch((e) => {
            res.send(e).status(400)
        })

    }
}

export default container.resolve(TaskController)