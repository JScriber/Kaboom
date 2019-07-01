import { Injectable } from '@nestjs/common';
import { RunningContest } from '../../../redis/entities/running-contest.entity';

/**
 * Options to schedule an action.
 */
interface ScheduleOptions {
  /** Interval in miliseconds. */
  interval: number;

  /** Says if the action must be executed. */
  repeat: boolean;
}

/** Dictionnary of processes. */
interface ScheduleProcesses {
  [key: string]: NodeJS.Timeout[];
}

/**
 * Service to schedule and attach action to a {@link RunningContest}.
 */
@Injectable()
export class GameSchedulerService {

  /** List of all running or pending processes. */
  private processes: ScheduleProcesses = {};

  /**
   * Schedules an action.
   * @param contest
   * @param action
   * @param options
   */
  schedule(contest: RunningContest, action: () => void, { repeat, interval }: ScheduleOptions) {

    const process = repeat ? setInterval(action, interval) : setTimeout(action, interval);

    this.attachProcess(contest, process);
  }

  /**
   * Kills all the processes of the given running contest.
   * @param {RunningContest} contest
   */
  unscheduleAll({ id }: RunningContest) {
    if (this.processes[id]) {
      this.processes[id].forEach(p => clearInterval(p));
    }
  }

  /**
   * Attach a process to the running contest.
   * @param {RunningContest} contest
   * @param {NodeJS.Timeout} timeout - Process to attach.
   */
  private attachProcess({ id }: RunningContest, timeout: NodeJS.Timeout) {
    if (this.processes[id]) {
      this.processes[id].push(timeout);
    } else {
      this.processes[id] = [timeout];
    }
  }
}
