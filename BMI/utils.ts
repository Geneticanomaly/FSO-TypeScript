interface bmiArguments {
    weight: number;
    height: number;
}

export const parseBmiArguments = (args: string[]): bmiArguments => {
    if (args.length > 4) throw new Error('Too many arguments');
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

interface exerciseArguments {
    target: number;
    exercises: number[];
}

export const parseExerciseArguments = (args: string[]): exerciseArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const allNumbers = args
        .slice(3)
        .map(Number)
        .every((number) => !isNaN(number));

    if (!isNaN(Number(args[2])) && allNumbers) {
        return {
            target: Number(args[2]),
            exercises: args.slice(3).map(Number),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};
