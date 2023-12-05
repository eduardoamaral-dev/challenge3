import TaskRepository from "../../../shared/persistence/repositories/TaskRepository.ts"
import {inject} from "tsyringe"

export default class TaskService{
    constructor(@inject('TaskRepository') private repo: TaskRepository) {
    }
    public async create(task: Task){
        this.repo.add(task)
    }

    public getAll(){
        return this.repo.getTasks()
    }
}