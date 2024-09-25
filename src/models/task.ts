// src/models/task.ts
class Task {
  id: number;
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  toString() {
    return `Task #${this.id}: ${this.name}`;
  }
}

export { Task };
