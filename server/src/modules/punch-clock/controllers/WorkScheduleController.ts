import WorkSchedule from "../models/WorkSchedule.ts";
import {Request, Response} from 'express'
import WorkScheduleService from "../services/WorkScheduleService.ts";
import {container} from "../../../shared/container/diContainer.ts";
import {inject, injectable} from "tsyringe";

@injectable()
class WorkScheduleController {
    public update(req: Request<WorkSchedule>, res: Response) {
        const service = container.resolve(WorkScheduleService)
        service.update(req.body)
            .then(() => {
                res.send("Successful updated =)").status(200)
            })
            .catch(() => {
                res.send("Something went wrong =(").status(400)
            })
    }

    public setDefault(req: Request<WorkSchedule>, res: Response) {
        const service = container.resolve(WorkScheduleService)
        service.setDefault()
            .then(() => {
                res.send("Successful updated =)").status(200)
            })
            .catch(() => {
                res.send("Something went wrong =(").status(400)
            })
    }

    public get(req: Request<WorkSchedule>, res: Response) {
        const service = container.resolve(WorkScheduleService)

        service.get()
            .then((result) => {
                res.send(result).status(200)
            })
            .catch(() => {
                res.send("Something went wrong =(").status(400)
            })
    }
}

export default container.resolve(WorkScheduleController)