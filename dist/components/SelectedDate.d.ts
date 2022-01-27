/// <reference types="react" />
import { InputDate } from '../types';
export interface SelectedDateProps {
    isFocused: boolean;
    date: InputDate;
}
export declare const SelectedDate: ({ isFocused, date }: SelectedDateProps) => JSX.Element;
