type Operation = 'multiply' | 'add' | 'divide';

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height * 0.01) ^ 2);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi <= 39.9) {
        return 'Overweight';
    } else if (bmi >= 40) {
        return 'Obese';
    }
};

console.log(calculateBmi(182, 70));
