import { Task } from "./task";

/**
 * Represents a volunteer who can be assigned to tasks.
 */
class Volunteer {
  id: number; // Unique identifier for the volunteer
  name: string; // Name of the volunteer
  interestedTasks: Task[]; // List of tasks the volunteer is interested in

  /**
   * Creates a new Volunteer.
   *
   * @param id - The unique volunteer ID.
   * @param name - The name of the volunteer.
   */
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.interestedTasks = [];
  }

  /**
   * Returns a string representation of the volunteer.
   *
   * @returns A string in the format "Volunteer #id: name".
   */
  toString(): string {
    return `Volunteer #${this.id}: ${this.name}`;
  }

  /**
   * Adds a task to the volunteer's list of interested tasks.
   *
   * @param task - The task to add.
   */
  addInterestedTask(task: Task): void {
    this.interestedTasks.push(task);
  }

  /**
   * Removes a task from the volunteer's list of interested tasks.
   *
   * @param task - The task to remove.
   */
  removeInterestedTask(task: Task): void {
    const index = this.interestedTasks.indexOf(task);
    if (index >= 0) {
      this.interestedTasks.splice(index, 1);
    }
  }

  /**
   * Checks if the volunteer is interested in a specific task.
   *
   * @param task - The task to check.
   * @returns True if the volunteer is interested in the task, otherwise false.
   */
  isInterested(task: Task): boolean {
    return this.interestedTasks.includes(task);
  }

  /**
   * Gets the preference rank of a task for this volunteer.
   *
   * @param task - The task to get the rank for.
   * @returns The rank of the task (1-based index), or -1 if not interested.
   */
  getPreferenceRank(task: Task): number {
    const index = this.interestedTasks.indexOf(task);
    return index >= 0 ? index + 1 : -1;
  }
}

export { Volunteer };
