import notifier, {Notification} from 'node-notifier'
import shell from "shelljs"
import {injectable} from "tsyringe"

// @ts-ignore
@injectable()
class ToastProvider {
    public async testNotification() {
        const linkToOpen = 'https://google.com'
        notifier.notify({
            wait: true,
            title: 'My notification',
            message: 'Hello, there!',
            sound: true,
        })
        notifier.on('click', function (notifierObject, options, event) {
            shell.exec(`start /MAX ${linkToOpen}`)
        })
    }

    public async showToast(notification: Notification, redirectTo: string) {
        notifier.notify(notification)
        notifier.on('click', () => {
            shell.exec(`start /MAX ${redirectTo}`)
        })
    }
}
export default ToastProvider