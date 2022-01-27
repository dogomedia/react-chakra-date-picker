import { CalendarIcon } from '@chakra-ui/icons';
import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import React from 'react';
import { InputDate } from '../types';
export interface InputProps {
    allowEditableInputs?: boolean;
    dateFormat?: string;
    disableAccessibility?: boolean;
    iconComponent?: typeof CalendarIcon;
    id?: string;
    isActive?: boolean;
    name?: string;
    onChange?(date: InputDate): void;
    onClick?(): void;
    placeholder?: string;
    showCalendarIcon?: boolean;
    value?: string;
}
interface BaseProps extends Omit<ChakraInputProps, 'onChange' | 'onClick' | 'value'>, InputProps {
}
export declare const Input: React.ForwardRefExoticComponent<BaseProps & React.RefAttributes<any>>;
export {};
