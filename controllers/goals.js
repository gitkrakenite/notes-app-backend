const Goal = require("../models/goal");

// DESC       fetch all goals
// Method      GET /api/v1/goals

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// DESC       create a goals
// Method      POST /api/v1/goals

const createGoal = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).send("Please add a title");
    return;
  }

  try {
    const newGoal = await Goal.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// DESC       update a goal
// Method      PUT /api/v1/goals/:id
const updateGoal = async (req, res) => {
  // check if an id has been passed
  if (!req.params.id) {
    res.status(401).send("No id sent");
    console.log("No id sent");
    return 0;
  }

  // check if a goal with the passed id exists in the db
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).send("Goal not found in the db");
    return 0;
  }

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json(updatedGoal);
  } catch (error) {
    res.json(400).send("Something went wrong");
  }
};

// DESC       Delete a goal
// Method      DELETE /api/v1/goals/:id

const deleteGoal = async (req, res) => {
  // check if an id has been passed
  if (!req.params.id) {
    res.status(401).send("No id sent");
    console.log("No id sent");
    return 0;
  }

  // check if a goal with the passed id exists in the db
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).send("Goal not found in the db");
    return 0;
  }

  try {
    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deletion succesful" });
  } catch (error) {
    res.json(400).send("Could not delete succesfully");
  }
};

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };
