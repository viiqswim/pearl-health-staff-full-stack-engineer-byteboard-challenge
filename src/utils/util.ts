import * as fs from "fs";
import * as readline from "readline";
import { Task } from "../models/task";
import { Volunteer } from "../models/volunteer";

/**
 * Loads tasks from a CSV file.
 *
 * The expected CSV format is:
 * taskId,name,volunteersNeeded,description
 *
 * @param filename - The path to the tasks CSV file.
 * @returns A promise that resolves to a record of Task objects keyed by task ID.
 */
const loadTasks = async (filename: string): Promise<Record<number, Task>> => {
  const tasks: Record<number, Task> = {};

  // Create a readline interface to read the file line by line
  const reader = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  // Read each line from the CSV file
  for await (const line of reader) {
    const parsedLine = line.split(",");

    const taskId = parseInt(parsedLine[0]);
    const name = parsedLine[1];
    const volunteersNeeded = parseInt(parsedLine[2]);
    // Join the rest of the line in case the description contains commas
    const description = parsedLine.slice(3).join(",");

    // Skip lines with invalid task IDs or missing data
    if (isNaN(taskId) || !name || isNaN(volunteersNeeded)) continue;

    // Create a new Task object and add it to the tasks record
    tasks[taskId] = new Task(taskId, name, description, volunteersNeeded);
  }

  return tasks;
};

/**
 * Loads volunteers from a CSV file.
 *
 * The expected CSV format is:
 * volunteerId,name,taskIds
 * where taskIds is a space-separated list of task IDs the volunteer is interested in.
 *
 * @param filename - The path to the volunteers CSV file.
 * @param tasks - A record of Task objects to link with volunteers' preferences.
 * @returns A promise that resolves to a record of Volunteer objects keyed by volunteer ID.
 */
const loadVolunteers = async (
  filename: string,
  tasks: Record<number, Task>
): Promise<Record<number, Volunteer>> => {
  const volunteers: Record<number, Volunteer> = {};

  // Create a readline interface to read the file line by line
  const reader = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  // Read each line from the CSV file
  for await (const line of reader) {
    const parsedLine = line.split(",");

    const volunteerId = parseInt(parsedLine[0]);
    const name = parsedLine[1];

    // The list of task IDs the volunteer is interested in
    const taskIds = parsedLine[2]
      .split(" ")
      .map((id: string) => parseInt(id))
      .filter((id: number) => !isNaN(id));

    // Skip lines with invalid volunteer IDs or missing data
    if (isNaN(volunteerId) || !name) continue;

    // Create a new Volunteer object
    const volunteer = new Volunteer(volunteerId, name);

    // Add each interested task to the volunteer
    taskIds.forEach((taskId: number) => {
      const task = tasks[taskId];
      if (task) {
        volunteer.addInterestedTask(task);
      }
    });

    // Add the volunteer to the volunteers record
    volunteers[volunteerId] = volunteer;
  }

  return volunteers;
};

export { loadTasks, loadVolunteers };
