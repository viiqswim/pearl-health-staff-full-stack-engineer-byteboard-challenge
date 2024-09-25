import { AssignmentServer } from "./server/assignmentServer";
import { loadTasks, loadVolunteers } from "./utils/util";
import { Task } from "./models/task";
import { Volunteer } from "./models/volunteer";

/**
 * Runs the task assignment process and outputs the results.
 *
 * @param tasks - A record of task IDs mapped to Task objects.
 * @param volunteers - A record of volunteer IDs mapped to Volunteer objects.
 */
const runAssignment = (
  tasks: Record<number, Task>,
  volunteers: Record<number, Volunteer>
): void => {
  const server = new AssignmentServer(tasks, volunteers);

  server.assignTasks(); // Assign tasks to volunteers
  server.printAssignments(); // Print the task assignments
  server.calculateSatisfactionScore(); // Calculate and print the satisfaction score
};

/**
 * Main function to load tasks and volunteers, then run the assignment.
 */
const main = async (): Promise<void> => {
  // Load tasks and volunteers from CSV files
  const tasks = await loadTasks("data/tasks.csv");
  const volunteers = await loadVolunteers("data/volunteers.csv", tasks);

  // Run the assignment process
  runAssignment(tasks, volunteers);
};

// Execute the main function
main();

export { runAssignment };
