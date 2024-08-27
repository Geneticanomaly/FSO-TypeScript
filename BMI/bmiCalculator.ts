import { parseBmiArguments } from './utils';

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height * 0.01) ^ 2);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi <= 39.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

if (require.main === module) {
    try {
        const { weight, height } = parseBmiArguments(process.argv);
        console.log(calculateBmi(weight, height));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
