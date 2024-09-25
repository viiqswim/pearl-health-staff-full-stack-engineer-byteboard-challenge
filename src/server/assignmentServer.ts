import { Task } from "../models/task";
import { Volunteer } from "../models/volunteer";

/**
 * The AssignmentServer class handles the logic for assigning tasks to volunteers.
 */
class AssignmentServer {
  tasks: Record<number, Task>; // All tasks to be assigned
  volunteers: Record<number, Volunteer>; // All volunteers available
  assignments: Map<Task, Volunteer[]>; // Map of tasks to assigned volunteers

  /**
   * Creates a new AssignmentServer.
   *
   * @param tasks - A record of tasks to be assigned.
   * @param volunteers - A record of volunteers who can be assigned tasks.
   */
  constructor(
    tasks: Record<number, Task>,
    volunteers: Record<number, Volunteer>
  ) {
    this.tasks = tasks;
    this.volunteers = volunteers;
    this.assignments = new Map();
  }

  /**
   * Retrieves a list of volunteers interested in a specific task.
   *
   * @param task - The task to find interested volunteers for.
   * @returns An array of volunteers interested in the task.
   */
  getInterestedVolunteers(task: Task): Volunteer[] {
    return Object.values(this.volunteers).filter((volunteer) => {
      return volunteer.isInterested(task);
    });
  }

  /**
   * Assigns tasks to volunteers based on their preferences.
   *
   * This method implements a round-robin algorithm to assign tasks:
   * - Iterates over volunteers in order, assigning one task per pass.
   * - Assigns the highest-ranked preferred task that is still available.
   * - If no preferred tasks are available, assigns any available task.
   */
  assignTasks(): void {
    const tasksNeedingAssignment = new Set<Task>(Object.values(this.tasks)); // Tasks that still need volunteers
    const volunteers = Object.values(this.volunteers); // List of volunteers in order

    // Keep track of the number of tasks assigned to each volunteer
    const volunteerAssignments: Record<number, number> = {};
    volunteers.forEach((volunteer) => {
      volunteerAssignments[volunteer.id] = 0;
    });

    // Initialize the assignments map with empty arrays for each task
    this.assignments = new Map();
    Object.values(this.tasks).forEach((task) => {
      this.assignments.set(task, []);
    });

    // Continue assigning tasks until all tasks have enough volunteers
    while (tasksNeedingAssignment.size > 0) {
      // Iterate over each volunteer in order
      for (const volunteer of volunteers) {
        // If all tasks are assigned, exit the loop
        if (tasksNeedingAssignment.size === 0) {
          break;
        }

        // Find the volunteer's preferred tasks that still need volunteers
        const preferredTasks = volunteer.interestedTasks.filter((task) => {
          const assignedVolunteers = this.assignments.get(task)!;
          return (
            tasksNeedingAssignment.has(task) &&
            assignedVolunteers.length < task.requiredVolunteers
          );
        });

        let assignedTask: Task | null = null;

        if (preferredTasks.length > 0) {
          // Assign the highest-ranked preferred task
          assignedTask = preferredTasks[0];
        } else {
          // Assign any task that still needs volunteers
          for (const task of tasksNeedingAssignment) {
            const assignedVolunteers = this.assignments.get(task)!;
            if (assignedVolunteers.length < task.requiredVolunteers) {
              assignedTask = task;
              break;
            }
          }
        }

        if (assignedTask) {
          // Assign the volunteer to the task
          this.assignments.get(assignedTask)!.push(volunteer);
          volunteerAssignments[volunteer.id] += 1;

          // Check if the task now has enough volunteers
          if (
            this.assignments.get(assignedTask)!.length >=
            assignedTask.requiredVolunteers
          ) {
            // Remove the task from the set of tasks needing assignment
            tasksNeedingAssignment.delete(assignedTask);
          }
        }
      }
    }
  }

  /**
   * Calculates and prints the overall satisfaction score based on the assignments.
   *
   * The score for each assignment is calculated as:
   * - 4 points if the task is the volunteer's top preference.
   * - 3 points if the task is the volunteer's second preference.
   * - 2 points if the task is the volunteer's third preference.
   * - 1 point if the task is in the volunteer's list of interested tasks but not top 3.
   * - -1 point if the volunteer is assigned a task they are not interested in.
   *
   * @returns The total satisfaction score.
   */
  calculateSatisfactionScore(): number {
    let totalScore = 0;

    // Iterate over each task and its assigned volunteers
    for (const [task, volunteers] of this.assignments.entries()) {
      volunteers.forEach((volunteer) => {
        const preferenceRank = volunteer.getPreferenceRank(task);
        let score = 0;

        // Assign points based on the volunteer's preference rank
        switch (preferenceRank) {
          case 1:
            score = 4;
            break;
          case 2:
            score = 3;
            break;
          case 3:
            score = 2;
            break;
          default:
            score = preferenceRank > 0 ? 1 : -1;
            break;
        }

        totalScore += score;
      });
    }

    console.log(`Overall Satisfaction Score: ${totalScore}`);
    return totalScore;
  }

  /**
   * Prints the task assignments to the console.
   */
  printAssignments(): void {
    for (const task of Object.values(this.tasks)) {
      const assignees = this.assignments.get(task);
      console.log(`${task}`);
      if (assignees && assignees.length > 0) {
        assignees.forEach((assignee) => {
          console.log(`\tAssigned to ${assignee}`);
        });
      } else {
        console.log("\tUnassigned");
      }
      console.log();
    }
  }
}

export { AssignmentServer };
