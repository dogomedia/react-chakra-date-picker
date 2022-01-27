import React from 'react';
import { InputProps } from './components';
import { DatepickerProps } from './Datepicker';
import { DateSingleInputPhrases } from './phrases';
import { InputDate } from './types';
export interface OnDateChangeProps {
    date: InputDate;
    showDatepicker: boolean;
}
export interface DateSingleInputProps extends Partial<InputProps>, Partial<DatepickerProps> {
    onFocusChange?(focusInput: boolean): void;
    phrases?: DateSingleInputPhrases;
    placement?: 'top' | 'bottom';
    showDatepicker?: boolean;
    date?: InputDate;
    showResetDate?: boolean;
}
export declare const DateSingleInput: React.ForwardRefExoticComponent<DateSingleInputProps & React.RefAttributes<HTMLInputElement>>;
