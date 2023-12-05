import notifier, {Notification} from 'node-notifier'
import shell from "shelljs"
import {injectable} from "tsyringe"
import path from "path";

// @ts-ignore
@injectable()
class ToastProvider {
    public async testNotification() {
        const linkToOpen = 'https://dell.populisservicos.com.br/populisII-web/paginas/protegidas/dashboard.xhtml?igHisNav=true&login=true'
        notifier.notify({
            wait: true,
            title: "Testando",
            message: "Parece que tá funcionando XD",
            icon: path.join(__dirname, '../../../../../assets/populis_icon.png'),
            open: linkToOpen
        })
        notifier.on('click', function (notifierObject, options, event) {
            shell.exec(`start /MAX ${linkToOpen}`)
        })
    }

    public async showToast(notification: Notification, redirectTo: string) {
        notifier.notify({
            wait: true,
            title: notification.title,
            message: notification.message,
            icon: path.join(__dirname, '../../../../../assets/populis_icon.png'),
            dropdownLabel:'Lembretes do ponto',
            open: redirectTo
        })
        notifier.on('click', () => {
            shell.exec(`start /MAX ${redirectTo}`)
        })
    }
}
export default ToastProvider