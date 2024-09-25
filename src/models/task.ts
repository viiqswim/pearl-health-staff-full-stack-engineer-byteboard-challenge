import { Volunteer } from "./volunteer";

/**
 * Represents a task that needs to be completed.
 */
class Task {
  id: number; // Unique identifier for the task
  name: string; // Name of the task
  description: string; // Description of the task
  requiredVolunteers: number; // Number of volunteers required
  assignedVolunteers: Volunteer[]; // Volunteers assigned to this task

  /**
   * Creates a new Task.
   *
   * @param id - The unique task ID.
   * @param name - The name of the task.
   * @param description - A description of the task.
   * @param requiredVolunteers - The number of volunteers required for the task.
   */
  constructor(
    id: number,
    name: string,
    description: string,
    requiredVolunteers: number = 1
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.requiredVolunteers = requiredVolunteers;
    this.assignedVolunteers = [];
  }

  /**
   * Returns a string representation of the task.
   *
   * @returns A string in the format "Task #id: name".
   */
  toString(): string {
    return `Task #${this.id}: ${this.name}`;
  }
}

export { Task };
