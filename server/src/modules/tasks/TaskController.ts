import {Request, Response} from 'express'
import {inject} from "tsyringe";
import TaskService from "./services/TaskService.ts";

class TaskController {

    constructor(@inject('TaskService') private service: TaskService) {
    }

    public create(req: Request, res: Response) {
        try {
            this.service.create(req.body);
            res.send().status(200)
        } catch (e) {
            res.send(e).status(400)
        }
    }

    public get(req: Request, res: Response) {
        this.service.create(req.body)
            .then((result) => {
                res.send(result).status(200)})
            .catch((e) => {
            res.send(e).status(400)
        })

    }
}
