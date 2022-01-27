import { CalendarIcon } from '@chakra-ui/icons';
import { FocusedInput } from '@datepicker-react/hooks';
import React, { Ref } from 'react';
import { InputProps } from './components';
import { StylesProviderProps } from './context/StylesContext';
import { DatepickerProps } from './Datepicker';
import { DateRangeInputPhrases } from './phrases';
export interface DateRangeInputProps extends Partial<StylesProviderProps>, Partial<DatepickerProps> {
    startDateInputProps?: Partial<InputProps>;
    endDateInputProps?: Partial<InputProps>;
    phrases?: DateRangeInputPhrases;
    showDivider?: boolean;
    placement?: 'top' | 'bottom';
    onFocusChange?(focusedInput: FocusedInput): void;
    endIcon?: typeof CalendarIcon;
    endId?: string;
    endName?: string;
    endPlaceholder?: string;
    endRef?: Ref<HTMLInputElement>;
    endShowCalendarIcon?: boolean;
    startIcon?: typeof CalendarIcon;
    startId?: string;
    startName?: string;
    startPlaceholder?: string;
    startRef?: Ref<HTMLInputElement>;
    startShowCalendarIcon?: boolean;
    allowEditableInputs?: boolean;
}
export declare const DateRangeInput: React.FC<DateRangeInputProps>;
