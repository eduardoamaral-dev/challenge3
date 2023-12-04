import * as cron from 'node-cron'
import ToastProvider from "./ToastProvider.ts"

import CronManager from "../../../shared/util/CronManager.ts";
import {container} from "../../../shared/container/diContainer.ts";

class WorkHoursCounter {
    targetHour: number = 0
    targetMinute: number = 0

    constructor() {
    }

    start(date: Date) {
        const dateUTC = this.convertToUTC(date)
        CronManager.startCronJob(`${dateUTC.getMinutes()} ${dateUTC.getHours()} * * *`, async () => {
            console.log('cron is running')
            const toastProvider = container.resolve(ToastProvider)
            await toastProvider.testNotification()
            console.log('cron finished')
        })
    }

    private convertToUTC(date: Date){
        const dateInstance = new Date(date)
        dateInstance.setHours(dateInstance.getHours() + 3)
        return dateInstance
    }
}

export default WorkHoursCounter