import { AssignmentServer } from "../src/server/assignmentServer";
import { Task } from "../src/models/task";
import { Volunteer } from "../src/models/volunteer";

// Prepare mock data

// Initialize tasks as per data/tasks.csv
const tasksData = [
  new Task(
    1,
    "Get Supplies",
    "We need rakes, shovels, trash bags, gloves, and a first aid kit",
    1
  ),
  new Task(
    2,
    "Bring Snacks",
    "We'll need plenty of water, trail mix, and maybe lemonade",
    1
  ),
  new Task(
    3,
    "Volunteer Check-in",
    "Someone needs to confirm which volunteers are present",
    3
  ),
  new Task(
    4,
    "Separate Recyclables",
    "Go through the unsorted items and identify which can be recycled",
    1
  ),
  new Task(
    5,
    "Haul Trash",
    "Person responsible for taking the trash to the landfill",
    1
  ),
  new Task(
    6,
    "Haul Recyclables",
    "Person responsible for taking recyclables to the recycling center",
    1
  ),
  new Task(7, "First Aid", "Person with some skills and heart", 2),
  new Task(
    8,
    "After Party Coordination",
    "Someone should book a big table for us to celebrate afterward",
    1
  ),
  new Task(
    9,
    "Transportation",
    "We need a volunteer with a big car or van to drive",
    2
  ),
  new Task(
    10,
    "Playground Repair",
    "Someone who can fix things needs to look at the swing set",
    1
  ),
  new Task(
    11,
    "Green Thumb",
    "We would love to have some flowers planted in the park",
    1
  ),
  new Task(
    12,
    "Mowing",
    "There are several areas that need mowed. Do you have a big mower?",
    1
  ),
  new Task(13, "Edging", "If you have a trimmer you're our hero!", 1),
  new Task(
    14,
    "Get Donated Plants",
    "Can you convince area greenhouses to give us plants to plant?",
    2
  ),
  new Task(15, "Paparazzi", "We would love to have someone document this", 2),
  new Task(
    16,
    "Social Media Guru",
    "Can you help advertise this event and bring in more volunteers?",
    2
  ),
];

// Initialize volunteers as per data/volunteers.csv
const volunteersData = [
  new Volunteer(1, "Mike"),
  new Volunteer(2, "Carol"),
  new Volunteer(3, "Greg"),
  new Volunteer(4, "Marcia"),
  new Volunteer(5, "Peter"),
  new Volunteer(6, "Jan"),
  new Volunteer(7, "Bobby"),
  new Volunteer(8, "Cindy"),
  new Volunteer(9, "Alice"),
];

// Create maps for easy lookup
const tasksById: Record<number, Task> = {};
tasksData.forEach((task) => {
  tasksById[task.id] = task;
});

const volunteersById: Record<number, Volunteer> = {};
volunteersData.forEach((volunteer) => {
  volunteersById[volunteer.id] = volunteer;
});

// Function to set volunteer preferences
function setVolunteerPreferences(volunteerId: number, taskIds: number[]) {
  const volunteer = volunteersById[volunteerId];
  volunteer.interestedTasks = taskIds.map((id) => tasksById[id]);
}

// Set the interested tasks for each volunteer
setVolunteerPreferences(1, [1, 4, 10, 3, 6, 9, 11, 12, 13, 14]);
setVolunteerPreferences(2, [3, 7, 9, 1, 2, 8, 10, 11, 14, 15]);
setVolunteerPreferences(3, [6, 10, 12, 1, 2, 3, 4, 7, 9, 13, 14]);
setVolunteerPreferences(4, [4, 15, 16, 1, 2, 3, 6, 7, 8, 9, 13, 14]);
setVolunteerPreferences(5, [3, 2, 10, 1, 2, 4, 6, 12, 13]);
setVolunteerPreferences(6, [7, 8, 16, 1, 2, 3, 4, 6, 11, 14, 15]);
setVolunteerPreferences(7, [4, 15, 6, 3]);
setVolunteerPreferences(8, [3, 4, 15, 2]);
setVolunteerPreferences(9, [2, 3, 7, 1, 4, 6, 8, 9, 10, 11, 14, 15]);

// Capture console output
let consoleOutput: string[] = [];
const originalConsoleLog = console.log;
console.log = (message?: any, ...optionalParams: any[]) => {
  const output = [message, ...optionalParams].join(" ");
  consoleOutput.push(output);
};

// Run the assignment
const server = new AssignmentServer(tasksById, volunteersById);
server.assignTasks();
server.printAssignments();
server.calculateSatisfactionScore();

// Restore console log
console.log = originalConsoleLog;

// Expected output (copy from previous output)
const expectedOutput = [
  "Task #1: Get Supplies",
  "\tAssigned to Volunteer #1: Mike",
  "",
  "Task #2: Bring Snacks",
  "\tAssigned to Volunteer #9: Alice",
  "",
  "Task #3: Volunteer Check-in",
  "\tAssigned to Volunteer #2: Carol",
  "\tAssigned to Volunteer #5: Peter",
  "\tAssigned to Volunteer #8: Cindy",
  "",
  "Task #4: Separate Recyclables",
  "\tAssigned to Volunteer #4: Marcia",
  "",
  "Task #5: Haul Trash",
  "\tAssigned to Volunteer #7: Bobby",
  "",
  "Task #6: Haul Recyclables",
  "\tAssigned to Volunteer #3: Greg",
  "",
  "Task #7: First Aid",
  "\tAssigned to Volunteer #6: Jan",
  "\tAssigned to Volunteer #2: Carol",
  "",
  "Task #8: After Party Coordination",
  "\tAssigned to Volunteer #6: Jan",
  "",
  "Task #9: Transportation",
  "\tAssigned to Volunteer #8: Cindy",
  "\tAssigned to Volunteer #9: Alice",
  "",
  "Task #10: Playground Repair",
  "\tAssigned to Volunteer #1: Mike",
  "",
  "Task #11: Green Thumb",
  "\tAssigned to Volunteer #1: Mike",
  "",
  "Task #12: Mowing",
  "\tAssigned to Volunteer #3: Greg",
  "",
  "Task #13: Edging",
  "\tAssigned to Volunteer #5: Peter",
  "",
  "Task #14: Get Donated Plants",
  "\tAssigned to Volunteer #2: Carol",
  "\tAssigned to Volunteer #3: Greg",
  "",
  "Task #15: Paparazzi",
  "\tAssigned to Volunteer #7: Bobby",
  "\tAssigned to Volunteer #4: Marcia",
  "",
  "Task #16: Social Media Guru",
  "\tAssigned to Volunteer #4: Marcia",
  "\tAssigned to Volunteer #5: Peter",
  "",
  "Overall Satisfaction Score: 52",
];

// Now compare the consoleOutput to expectedOutput

function normalizeOutput(output: string[]): string[] {
  return output.map((line) => line.trim());
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}

const normalizedCapturedOutput = normalizeOutput(consoleOutput);
const normalizedExpectedOutput = normalizeOutput(expectedOutput);

if (arraysEqual(normalizedCapturedOutput, normalizedExpectedOutput)) {
  console.log("TEST PASSED: Output matches expected output.");
} else {
  console.log("TEST FAILED: Output does not match expected output.");
  console.log("Expected Output:");
  console.log(expectedOutput.join("\n"));
  console.log("Actual Output:");
  console.log(consoleOutput.join("\n"));
}
