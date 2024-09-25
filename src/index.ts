// src/index.ts
import { AssignmentServer } from "./server/assignmentServer";
import { loadTasks, loadVolunteers } from "./utils/util";

const main = async () => {
  const tasks = await loadTasks("data/tasks.csv");
  const volunteers = await loadVolunteers("data/volunteers.csv", tasks);
  const server = new AssignmentServer(tasks, volunteers);

  server.assignTasks();
  server.printAssignments();
};

main();
