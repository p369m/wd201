const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test suite", () => {
  // Before starting all tests
  beforeAll(() => {
    add({
      title: "New test for todo",
      dueDate: new Date().toISOString().slice(0,10),
      completed: false,
    });
  });

  // checking if the add function is working
  test("Adding a new item", () => {
    const todoLength = all.length;
    add({
      title: "adding items (todo)",
      dueDate: new Date().toISOString().slice(0,10),
      completed: false,
    });
    expect(all.length).toEqual(todoLength + 1);
  });

  // checking if the markAsComplete function is working
  test("completed succesfully", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // checking if the overdue function is working
  test("Date passed", () => {
    const overDueTodoItemsCount =overdue().length
    add({
      title: "Work date is passed",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 2)
      ).toISOString().slice(0,10),
      completed: false,
    });
    expect(overdue().length).toEqual(overDueTodoItemsCount+1);
  });

  // checking if the dueToday function is working
  test("Last day today", () => {
    expect(dueToday().length).toBe(2);
  });

  // checking if the dueLater function is working
  test("later items", () => {
    const dueLaterTodoItemsCount = dueLater().length
    add({
      title: "Works for later",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 2)
      ).toISOString().slice(0,10),
      completed: false,
    });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount+1);
  });
});