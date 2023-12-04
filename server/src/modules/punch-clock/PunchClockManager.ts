import WorkScheduleService from "./services/WorkScheduleService.ts";
import {container} from "../../shared/container/diContainer.ts";
import WorkSchedule from "./models/WorkSchedule.ts";
import WorkHoursCounter from "./helpers/WorkHoursCounter.ts";
import CronManager from "../../shared/util/CronManager.ts";

class PunchClockManager {
    public workSchedule: WorkSchedule | undefined

    constructor() {
    }

    public async reload(){
        CronManager.verifyActiveCronJobs()
        CronManager.stopAllCronJobs()
        CronManager.verifyActiveCronJobs()
        await this.configWorkSchedule()
        await this.runAllCounters()
        CronManager.verifyActiveCronJobs()
    }

    public async configWorkSchedule() {
        const workScheduleService = container.resolve(WorkScheduleService)
        await workScheduleService.get()
            .then((result) => {
                if (result != undefined) {
                    this.workSchedule = result
                }
            }).catch((e) => {
                console.error(e)
            })
    }

    public async runAllCounters(){
        const startOfWork = new WorkHoursCounter()
        startOfWork.start(this.workSchedule?.startOfWork!)

        const breakTime = new WorkHoursCounter()
        breakTime.start(this.workSchedule?.breakTime!)

        const backToWork = new WorkHoursCounter()
        backToWork.start(this.workSchedule?.backToWork!)

        const endOfWork = new WorkHoursCounter()
        endOfWork.start(this.workSchedule?.endOfWork!)
    }
}

export default PunchClockManager