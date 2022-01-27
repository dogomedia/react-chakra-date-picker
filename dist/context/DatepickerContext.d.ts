import { FocusedInput, FormatFunction, useDatepicker } from '@datepicker-react/hooks';
import React from 'react';
import { DatepickerPhrases } from '../phrases';
import { InputDate } from '../types';
import { dayLabelFormatFn, monthLabelFormatFn, weekdayLabelFormatFn } from '../utils/formatters';
export declare type UseDatepickerReturnType = ReturnType<typeof useDatepicker>;
export interface DatepickerFormatProps {
    dayLabelFormat: typeof dayLabelFormatFn;
    weekdayLabelFormat: typeof weekdayLabelFormatFn;
    monthLabelFormat: typeof monthLabelFormatFn;
}
export declare type OnDayRenderType = {
    isFirst: boolean;
    isLast: boolean;
    isSelected: boolean;
    isWithinHoverRange: boolean;
    isSelectedStartOrEnd: boolean;
    disabledDate: boolean;
};
export interface DatepickerContextBaseProps {
    displayFormat: FormatFunction | string;
    startDate: InputDate;
    endDate: InputDate;
    phrases: DatepickerPhrases;
    focusedInput: FocusedInput;
    onDayRender?(date: Date, state: OnDayRenderType): React.ReactNode;
}
export interface DatepickerContextProps extends DatepickerContextBaseProps, DatepickerFormatProps, UseDatepickerReturnType {
}
export interface DatepickerProviderProps extends Partial<DatepickerContextProps> {
}
export declare const datepickerContextDefaultValue: DatepickerContextProps;
export declare const DatepickerContext: React.Context<DatepickerContextProps>;
export declare const useDatepickerContext: () => DatepickerContextProps;
export declare const DatepickerProvider: React.FC<DatepickerProviderProps>;
