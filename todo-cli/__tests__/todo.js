const todoList = require("../todo.js");
const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

describe("addTask function", () => {
  const todoLen = all.length;
  test("should add a valid task to the list", () => {
    add({
      title: "Submit assignment",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    expect(all.length).toEqual(todoLen + 1);
  });
});

describe("markAsComplete function", () => {
  test("should change completed property to true", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});

describe("overdue function", () => {
  const overDueTodoItemsCount = overdue().length;
  var dateToday = new Date();
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  );
  const today = formattedDate(dateToday);
  add({ title: "Submit assignment", dueDate: yesterday, completed: false });
  test("return task should have dueDate in past", () => {
    expect(overdue().length).toEqual(overDueTodoItemsCount + 1);
  });
});

describe("dueToday function", () => {
  var dateToday = new Date();
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  const today = formattedDate(dateToday);
  const dueTodayTodoItemsCount = dueToday().length;
  add({ title: "Submit assignment", dueDate: today, completed: false });
  test("return task should have dueDate today", () => {
    expect(dueToday().length).toEqual(dueTodayTodoItemsCount + 1);
  });
});

describe("dueLater function", () => {
  var dateToday = new Date();
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  );
  const dueLaterTodoItemsCount = dueLater().length;
  add({ title: "Submit assignment", dueDate: tomorrow, completed: false });
  test("return task should have dueDate today", () => {
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount + 1);
  });
});

describe("toDisplayableList function", () => {
  test("later items", () => {
    const dueLaterTodoItemsCount = dueLater().length;
    add({
      title: "Works for later",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .slice(0, 10),
      completed: false,
    });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount + 1);
  });
});
