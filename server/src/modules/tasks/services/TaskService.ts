import TaskRepository from "../../../shared/persistence/repositories/TaskRepository.ts"
import {inject, injectable} from "tsyringe"
import Task from '../models/Task.ts'

@injectable()
export default class TaskService{
    constructor(@inject('TaskRepository') private repo: TaskRepository) {
    }
    public async create(task: Task){
        this.repo.add(task)
    }

    public async getAll(){
        return this.repo.getTasks()
    }
}