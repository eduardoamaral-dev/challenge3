import 'reflect-metadata'
import 'babel-plugin-transform-typescript-metadata'
import app from './app'
import PunchClockManager from "./modules/punch-clock/PunchClockManager.ts";
import WorkScheduleRepository from "./shared/persistence/repositories/WorkScheduleRepository.ts";
import {container} from "./shared/container/diContainer.ts";

const port = process.env.PORT || 5000

app.listen(port, async () => {
  const punchClockManager = container.resolve(PunchClockManager)
  await punchClockManager.configWorkSchedule()
  await punchClockManager.runAllCounters()
})
