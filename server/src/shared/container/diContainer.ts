import { container } from 'tsyringe'
import ToastProvider from "../../modules/punch-clock/helpers/ToastProvider.ts"
import WorkScheduleRepository from "../persistence/repositories/WorkScheduleRepository.ts";
import WorkScheduleService from "../../modules/punch-clock/services/WorkScheduleService.ts";
import PunchClockManager from "../../modules/punch-clock/PunchClockManager.ts";
import CronManager from "../util/CronManager.ts";

// ========== Helpers ==========
container.registerSingleton<ToastProvider>('ToastProvider',ToastProvider)
// ========== Services ==========
container.registerSingleton<WorkScheduleService>('WorkScheduleService',WorkScheduleService);
container.registerSingleton<PunchClockManager>('PunchClockManager', PunchClockManager);

// ========== Repositories ==========
container.registerSingleton<WorkScheduleRepository>('WorkScheduleRepository',WorkScheduleRepository)
export { container }
