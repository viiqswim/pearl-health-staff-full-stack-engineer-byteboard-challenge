# Changes

This document outlines the changes made to the Serve Together application. The primary goals were to evaluate the quality of task assignments, support tasks requiring multiple volunteers, and improve overall volunteer satisfaction with task assignments.

## Task 1: Implement Satisfaction Score Calculation

**Objective**: Evaluate the quality of task assignments by calculating an overall satisfaction score based on volunteer preferences.

### Changes Made

- **Added Satisfaction Score Calculation**:
  - Implemented a new method `calculateSatisfactionScore()` in the `AssignmentServer` class.
  - The method calculates a score for each task assignment as follows:
    - **4 points** if a volunteer is assigned to their **top-preferred task**.
    - **3 points** if assigned to their **second-choice task**.
    - **2 points** if assigned to their **third-choice task**.
    - **1 point** if assigned to any other task they are interested in.
    - **-1 point** if assigned to a task they are **not interested in**.
  - The overall satisfaction score is the sum of all individual task scores.
  - After calculating, the score is printed to provide immediate feedback on assignment quality.

- **Volunteer Preference Ranking**:
  - Extended the `Volunteer` class with the method `getPreferenceRank(task: Task): number`.
  - This method determines a volunteer's preference rank for a given task.

### Outcome

- **Insight into Assignment Quality**:
  - The application now outputs an "Overall Satisfaction Score" after task assignments are made.
  - This score helps evaluate how well the assignments align with volunteer preferences.

---

## Task 2: Support for Multi-Person Tasks

**Objective**: Enable the system to handle tasks that require multiple volunteers to complete.

### Changes Made

- **Task Model Enhancement**:
  - Updated the `Task` class to include a `requiredVolunteers` property.
    - This property specifies how many volunteers are needed for the task.
    - Default value is set to **1** for tasks that only need one volunteer.
  - Introduced an `assignedVolunteers` array within each `Task` to track assigned volunteers.

- **Data Import Adaptation**:
  - Modified the `loadTasks()` function in `util.ts` to read the `requiredVolunteers` from the tasks data file (`tasks.csv`).
    - The tasks data now includes a column for the number of volunteers needed per task.

- **Assignment Logic Adjustment**:
  - Revised the `assignTasks()` method in the `AssignmentServer` class to account for multi-person tasks.
    - The method continues to assign volunteers to a task until the required number is met.
    - A task is marked as fully assigned when it has the necessary number of volunteers.
  - Updated the `assignments` data structure to map each task to a list of assigned volunteers.

### Outcome

- **Accurate Volunteer Allocation**:
  - The system now correctly assigns the appropriate number of volunteers to tasks based on their requirements.
  - Tasks that need more help receive multiple volunteers, ensuring all tasks can be completed effectively.

---

## Task 3: Improved Task Assignment Algorithm

**Objective**: Enhance the task assignment algorithm to better satisfy volunteers and distribute tasks more evenly.

### Changes Made

- **Balanced Assignment Approach**:
  - Modified the `assignTasks()` method in the `AssignmentServer` class to implement a fairer distribution of tasks.
  - Introduced tracking of the number of assignments per volunteer to prevent overloading individuals.
  - The assignment process now follows these steps:
    1. **Iterative Assignment**: Volunteers are considered in order, and tasks are assigned in multiple passes.
    2. **Preference Prioritization**: During each pass, volunteers are assigned to their highest-ranked preferred tasks that are still available.
    3. **Even Distribution**: The algorithm checks volunteers' current number of assignments to distribute tasks more evenly.
    4. **Fallback Assignment**: If a volunteer has no preferred tasks remaining, they are assigned to any available task needing volunteers.
  - The algorithm continues until all tasks have the required number of volunteers assigned.

### Outcome

- **Increased Volunteer Satisfaction**:
  - Volunteers are more likely to be assigned to tasks they prefer.
  - By considering volunteers' preferences and current workloads, the assignments aim for higher satisfaction scores.
- **Fairer Task Distribution**:
  - The workload is spread more evenly among volunteers, preventing any one volunteer from being overburdened.
- **Higher Overall Satisfaction Score**:
  - The improved algorithm has led to an increase in the overall satisfaction score, indicating a better alignment with volunteer preferences.

---

## Summary

The Serve Together application now provides:

- A quantifiable measure of assignment quality through the overall satisfaction score.
- Support for tasks requiring multiple volunteers, ensuring all tasks receive adequate help.
- An improved assignment algorithm that balances volunteer preferences with fair task distribution.

These enhancements are expected to improve volunteer engagement and the efficiency of event organization.
