import { Gender, newPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((g) => g.toString())
        .includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): newPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object) {
        const newEntry: newPatientEntry = {
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            dateOfBirth: parseDate(object.dateOfBirth),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;
