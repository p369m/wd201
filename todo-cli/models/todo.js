"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await this.overdue();
      const overdueList = overdueItems.map((item) => item.displayableString());
      console.log(overdueList.join("\n"));
      console.log("\n");

      console.log("Due Today");
      const todayItems = await this.dueToday();
      const todayList = todayItems.map((item) => item.displayableString());
      console.log(todayList.join("\n"));
      console.log("\n");

      console.log("Due Later");
      const laterItems = await this.dueLater();
      const laterList = laterItems.map((item) => item.displayableString());
      console.log(laterList.join("\n"));
      console.log("\n");
    }

    static async overdue() {
      // Return overdue items (dueDate < today)
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(), // Less than today
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      // Return items due today (dueDate == today)
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(), // Equal to today
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      // Return items due later (dueDate > today)
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(), // Greater than today
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      // Mark an item as complete
      return await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";

      // Check if the due date is today
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

      if (this.dueDate === today) {
        // Do not show the due date if the todo is due today
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        // Show the due date for todos that are not due today
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
