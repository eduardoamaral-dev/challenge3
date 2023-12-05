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
        startOfWork.start(this.workSchedule?.startOfWork!, 'Não se esqueça de bater o seu ponto!', 'Clique aqui para bater o seu ponto')

        const breakTime = new WorkHoursCounter()
        breakTime.start(this.workSchedule?.breakTime!, 'Intervalooo!', 'Clique aqui para bater o seu ponto')

        const backToWork = new WorkHoursCounter()
        backToWork.start(this.workSchedule?.backToWork!, 'De volta ao trabalho!', 'Clique aqui para bater o seu ponto')

        const endOfWork = new WorkHoursCounter()
        endOfWork.start(this.workSchedule?.endOfWork!, 'Até logo, mas não se esqueça do ponto!', 'Clique aqui para bater o seu ponto')
    }
}

export default PunchClockManager