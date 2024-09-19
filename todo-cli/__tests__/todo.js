const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

const formattedDate = (daysOffset = 0) => {
  return new Date(new Date().setDate(new Date().getDate() + daysOffset))
    .toISOString()
    .slice(0, 10);
};

describe("Todo List Test Suite", () => {
  // Clear tasks before each test to ensure a clean state
  beforeEach(() => {
    all.length = 0; // Resets the todo list
    add({
      title: "Initial test todo",
      dueDate: formattedDate(0), // today
      completed: false,
    });
  });

  // Testing the add function
  test("Should add a new task to the list", () => {
    const todoLength = all.length;
    const newTask = {
      title: "Adding a new todo item",
      dueDate: formattedDate(0), // today
      completed: false,
    };
    add(newTask);

    expect(all.length).toEqual(todoLength + 1);
    expect(all).toContainEqual(expect.objectContaining(newTask));
  });

  // Testing markAsComplete function
  test("Should mark a task as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // Testing overdue function
  test("Should return overdue tasks", () => {
    const initialOverdueCount = overdue().length;

    const overdueTask = {
      title: "Past due task",
      dueDate: formattedDate(-2), // 2 days ago
      completed: false,
    };
    add(overdueTask);

    expect(overdue().length).toEqual(initialOverdueCount + 1);
    expect(overdue()).toContainEqual(expect.objectContaining(overdueTask));
  });

  // Testing dueToday function
  test("Should return tasks due today", () => {
    const todayTasks = dueToday();
    expect(todayTasks.length).toBeGreaterThan(0);
    expect(todayTasks.every((task) => task.dueDate === formattedDate(0))).toBe(
      true
    );
  });

  // Testing dueLater function
  test("Should return tasks due later", () => {
    const initialDueLaterCount = dueLater().length;

    const futureTask = {
      title: "Task due in the future",
      dueDate: formattedDate(2), // 2 days from now
      completed: false,
    };
    add(futureTask);

    expect(dueLater().length).toEqual(initialDueLaterCount + 1);
    expect(dueLater()).toContainEqual(expect.objectContaining(futureTask));
  });
});
