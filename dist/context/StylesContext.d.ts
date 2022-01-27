import React, { FC } from 'react';
import { DatepickerStyles } from '../types';
export interface StylesContextProps {
    overwriteDefaultStyles: boolean;
    styles: DatepickerStyles;
}
export interface StylesProviderProps {
    overwriteDefaultStyles?: boolean;
    styles?: Partial<DatepickerStyles>;
}
export declare const emptyStylesObject: DatepickerStyles;
export declare const StylesContext: React.Context<StylesContextProps>;
export declare const StylesProvider: FC<StylesProviderProps>;
export declare function useStyleProps<InitialStyles extends Partial<DatepickerStyles> = Partial<DatepickerStyles>>(inlineStyles: InitialStyles): (InitialStyles extends any ? (k: InitialStyles) => void : never) | ((k: Pick<DatepickerStyles, "actionButton" | "closeButton" | "datepickerContainer" | "monthsWrapper" | "buttonsWrapper" | "arrowIcon" | "datepickerFooter" | "day" | "dayContainer" | "inputComponentInputGroup" | "inputComponentInput" | "inputComponentIcon" | "inputComponentInputAddon" | "monthContainer" | "monthMonthLabel" | "monthWeekdayLabel" | "monthDayGrid" | "resetDatesButton" | "selectDateContainer" | "selectDateText" | "selectDateDateText" | "dateRangeInputContainer" | "dateRangeInputDivider">) => void) extends (k: infer I) => void ? I : never;
