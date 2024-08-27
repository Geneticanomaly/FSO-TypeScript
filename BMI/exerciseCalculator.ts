import { parseExerciseArguments } from './utils';

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exercises: number[], targetAmount: number): ExerciseResult => {
    let exerciseTime: number = 0;
    let daysTrained: number = 0;

    exercises.forEach((exercise) => {
        exerciseTime += exercise;
        if (exercise !== 0) {
            daysTrained += 1;
        }
    });
    const average = exerciseTime / exercises.length;

    let rating: number = 0;
    let ratingDescription: string = '';
    if (average < targetAmount - 0.5) {
        rating = 1;
        ratingDescription = 'Not good, next time you need to be better';
    } else if (average > targetAmount) {
        rating = 3;
        ratingDescription = 'Very good, you have been very active';
    } else {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    }

    return {
        periodLength: exercises.length,
        trainingDays: daysTrained,
        success: targetAmount > average ? false : true,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetAmount,
        average: average,
    };
};

try {
    const { target, exercises } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
