interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((day) => day !== 0).length;
  const average: number =
    hours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success: boolean = average >= target;
  const rating: number =
    average < target / 2
      ? 1
      : average >= target / 2 && average < target
      ? 2
      : 3;
  const ratingDescription: string =
    average < target / 2
      ? "You need to exercise more."
      : average >= target / 2 && average < target
      ? "Okay, almost at your target"
      : "Good job";

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  return {
    target: Number(args[2]),
    hours: process.argv.slice(3).map((hour) => Number(hour)),
  };
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
