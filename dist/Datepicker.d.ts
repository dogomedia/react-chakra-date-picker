import { UseDatepickerProps } from '@datepicker-react/hooks';
import React from 'react';
import { DatepickerFormatProps } from './context/DatepickerContext';
import { StylesProviderProps } from './context/StylesContext';
import { DatepickerPhrases } from './phrases';
export interface DatepickerElement {
    onDateSelect?(date: Date): void;
}
export interface DatepickerProps extends Partial<StylesProviderProps>, Partial<DatepickerFormatProps>, Partial<UseDatepickerProps> {
    displayFormat?: string;
    onClose?(): void;
    onDayRender?(date: Date): React.ReactNode;
    phrases?: DatepickerPhrases;
    showClose?: boolean;
    showResetDates?: boolean;
    showSelectedDates?: boolean;
    vertical?: boolean;
}
export declare const Datepicker: React.ForwardRefExoticComponent<DatepickerProps & React.RefAttributes<DatepickerElement>>;
