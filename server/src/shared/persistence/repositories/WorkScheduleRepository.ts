import WorkSchedule from "../../../modules/punch-clock/models/WorkSchedule.ts"
import * as fs from "fs"
import path from "path"
import {injectable} from "tsyringe";

interface Data {
    workSchedule: WorkSchedule
}
@injectable()
class WorkScheduleRepository {
    dataFilePath = path.join(__dirname, '../database/db.json')
    public async overwriteWorkSchedule(workSchedule: WorkSchedule) {
        const data: Data = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf-8'))
        data.workSchedule = workSchedule
        fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8')
    }

    public getWorkSchedule(): WorkSchedule | undefined {
        try {
            const data: Data = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf-8'));
            console.log(data.workSchedule)
            return data.workSchedule;
        } catch (error) {
            console.error('Error reading or parsing the file:', error);
            return undefined;
        }
    }
}


export default WorkScheduleRepository




