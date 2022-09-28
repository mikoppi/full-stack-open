import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) throw new Error("malformatted parameters");
    const result = {
        weight,
        height,
        bmi: calculateBmi(Number(height), Number(weight)),
    };
    try {
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!daily_exercises.length || !target)
        throw new Error("parameters missing");
    if (
        isNaN(Number(target)) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        daily_exercises.some((value: unknown) => isNaN(Number(value)))
    )
        throw new Error("malformatted parameters");
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.json(calculateExercises(daily_exercises, target));
    } catch (error) {
        res.status(400).json(error);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
