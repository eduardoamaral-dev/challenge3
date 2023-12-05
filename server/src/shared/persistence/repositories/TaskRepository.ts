import * as fs from "fs"
import path from "path"
import {injectable} from "tsyringe";

interface Data {
    tasks: Task[]
}
@injectable()
class WorkScheduleRepository {
    dataFilePath = path.join(__dirname, '../database/db-tasks.json')
    public add(task: Task) {
        const data: Data = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf-8'))
        data.tasks.push()
        fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8')
    }

    public getTasks() {
        try {
            const data: Data = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf-8'));
            return data.tasks;
        } catch (error) {
            console.error('Error reading or parsing the file:', error);
            return undefined;
        }
    }
}


export default WorkScheduleRepository




