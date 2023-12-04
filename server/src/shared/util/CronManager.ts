import cron from 'node-cron';


namespace CronManager {
    let cronJobs: cron.ScheduledTask[] = [];

    export function startCronJob(schedule: string, callback: () => void): void {
        console.log(`Starting cron job with schedule: ${schedule}`);
        try {
            const job = cron.schedule(schedule, callback);
            cronJobs.push(job);
        } catch (error) {
            // @ts-ignore
            console.error(`Error scheduling cron job: ${error.message}`);
        }
    }

    export function stopAllCronJobs(): void {
        console.log('Stopping all cron jobs');
        try {
            cronJobs.forEach(job => job.stop());
            cronJobs = [];
        } catch (error) {
            // @ts-ignore
            console.error(`Error stopping cron jobs: ${error.message}`);
        }
    }

    export function verifyActiveCronJobs() {
        console.log("Active cron jobs: " + cronJobs.length);
    }
}
export default CronManager