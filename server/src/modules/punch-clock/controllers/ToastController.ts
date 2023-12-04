import 'reflect-metadata'
import {Request, Response} from 'express'
import ToastProvider from "../helpers/ToastProvider.ts"
import {container} from "tsyringe";

class ToastController {
    async show(req: Request, res: Response) {
        const {message} = req.body
        const toastProvider: ToastProvider = container.resolve('ToastProvider')
        await toastProvider.testNotification()
            .then(() => {
                res.send().status(200)
            })
            .catch((e: any) => {
                res.send(e).status(400)
            })
    }
}

export default container.resolve(ToastController)