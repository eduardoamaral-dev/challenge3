import * as cron from 'node-cron'
import ToastProvider from "./ToastProvider.ts"

import CronManager from "../../../shared/util/CronManager.ts";
import {container} from "../../../shared/container/diContainer.ts";
import path from "path";

class WorkHoursCounter {
    targetHour = ''
    targetMinute = ''

    constructor() {
    }

    start(date: string, title: string, message:string) {
        CronManager.startCronJob(`${this.getMinutes(date)} ${this.getHours(date)} * * *`, async () => {
            console.log('cron is running')
            const toastProvider = container.resolve(ToastProvider)
            await toastProvider.showToast({
                wait: true,
                title,
                message,
                icon: path.join(__dirname, 'assets/populis_icon.png')
            },'https://dell.populisservicos.com.br/populisII-web/paginas/protegidas/dashboard.xhtml?igHisNav=true&login=true')
            console.log('cron finished')
        })
    }

    private getHours(date: string){
        return date.slice(0,2)
    }


    private getMinutes(date: string){
        return date.slice(-2)
    }
}

export default WorkHoursCounter