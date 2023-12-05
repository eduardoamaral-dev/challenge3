import WorkScheduleRepository from "../../../shared/persistence/repositories/WorkScheduleRepository.ts";
import WorkSchedule from "../models/WorkSchedule.ts";
import {inject, injectable} from "tsyringe";

import PunchClockManager from "../PunchClockManager.ts";
import {container} from "../../../shared/container/diContainer.ts";
@injectable()
class WorkScheduleService {
    constructor(@inject('WorkScheduleRepository') private repo: WorkScheduleRepository, @inject('PunchClockManager') private punchClock :PunchClockManager) {
    }

    public async setDefault() {
        const defaultWorkSchedule: WorkSchedule = {
            startOfWork: '08:00',
            breakTime: '12:00',
            backToWork: '13:00',
            endOfWork: '17:00'
        }
        await this.repo.overwriteWorkSchedule(defaultWorkSchedule)
    }

    public async update(workSchedule: WorkSchedule) {
        try {
            await this.repo.overwriteWorkSchedule(workSchedule).then(async () => {
                await this.punchClock.reload()
            })
        } catch (e: any) {
            console.error(e)
        }
    }

    public async get(): Promise<WorkSchedule | undefined> {
        try {
            return this.repo.getWorkSchedule()
        } catch (e: any) {
            console.error(e)
        }
    }
}

export default WorkScheduleService;