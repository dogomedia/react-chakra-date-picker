import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Stack,
  ThemeProvider,
  useBreakpointValue,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react'
import {
  END_DATE,
  MonthType,
  START_DATE,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { DatepickerFormatProps, DatepickerProvider } from '../context/DatepickerContext'
import { StylesProvider, StylesProviderProps, useStyleProps } from '../context/StylesContext'
import { DatepickerPhrases, datepickerPhrases } from '../phrases'
import {
  dayLabelFormatFn,
  defaultDisplayFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from '../utils/formatters'
import { ActionButton } from './ActionButton'
import { CloseButton } from './CloseButton'
import { Month } from './Month'
import { ResetDatesButton } from './ResetDatesButton'
import { SelectedDate } from './SelectedDate'

export interface DatepickerElement {
  onDateSelect?(date: Date): void
}

export interface DatepickerProps
  extends Partial<StylesProviderProps>,
    Partial<DatepickerFormatProps>,
    Partial<UseDatepickerProps> {
  displayFormat?: string
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  phrases?: DatepickerPhrases
  showClose?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  vertical?: boolean
}

export const Datepicker = React.forwardRef(
  (props: DatepickerProps, ref: Ref<DatepickerElement>) => {
    const {
      changeActiveMonthOnSelect,
      dayLabelFormat,
      displayFormat = defaultDisplayFormat,
      endDate = null,
      exactMinBookingDays = false,
      firstDayOfWeek,
      focusedInput = null,
      initialVisibleMonth,
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      minBookingDays = 1,
      monthLabelFormat,
      numberOfMonths = 2,
      onClose = () => {},
      onDatesChange = () => {},
      onDayRender,
      overwriteDefaultStyles,
      phrases = datepickerPhrases,
      showClose = true,
      showResetDates = true,
      showSelectedDates = true,
      startDate = null,
      styles: customStyles,
      unavailableDates = [],
      vertical = false,
      weekdayLabelFormat,
    } = props

    const dp = useDatepicker({
      changeActiveMonthOnSelect,
      endDate,
      exactMinBookingDays,
      firstDayOfWeek,
      focusedInput,
      initialVisibleMonth,
      isDateBlocked,
      maxBookingDate,
      minBookingDate,
      minBookingDays,
      numberOfMonths,
      onDatesChange,
      startDate,
      unavailableDates,
    })

    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        dp.onDateSelect(date)
      },
    }))

    const monthGridRef = useRef<HTMLDivElement>(null)

    function scrollTopToMonthGrid() {
      if (monthGridRef && monthGridRef.current && _vertical) {
        monthGridRef.current.scrollTop = 0
      }
    }

    function _goToNextMonths() {
      dp.goToNextMonths()
      scrollTopToMonthGrid()
    }

    function _goToPreviousMonths() {
      dp.goToPreviousMonths()
      scrollTopToMonthGrid()
    }

    const isMobile = useBreakpointValue({ base: true, md: false })

    const _vertical = vertical || isMobile

    const styleProps = useStyleProps({
      datepickerContainer: {
        background: useColorModeValue('white', 'gray.700'),
        borderRadius: 'md',
        position: 'relative',
        width: 'fit-content',
        shadow: 'md',
        px: [3, 5],
        py: [5, 7],
        zIndex: 1,
      },
      monthsWrapper: {
        spacing: [0, 8],
      },
      buttonsWrapper: {
        spacing: [1, 3],
      },
      arrowIcon: {
        my: [5, 15],
        color: 'gray.500',
      },
      datepickerFooter: {
        justifyContent: 'space-between',
        pt: [1, 3],
      },
    })

    const theme = useTheme()

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider styles={customStyles} overwriteDefaultStyles={overwriteDefaultStyles}>
          <DatepickerProvider
            activeMonths={dp.activeMonths}
            dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
            displayFormat={displayFormat}
            endDate={endDate}
            firstDayOfWeek={dp.firstDayOfWeek}
            focusedDate={dp.focusedDate}
            focusedInput={focusedInput}
            goToDate={dp.goToDate}
            goToNextMonths={_goToNextMonths}
            goToNextMonthsByOneMonth={dp.goToNextMonthsByOneMonth}
            goToNextYear={dp.goToNextYear}
            goToPreviousMonths={_goToPreviousMonths}
            goToPreviousMonthsByOneMonth={dp.goToPreviousMonthsByOneMonth}
            goToPreviousYear={dp.goToPreviousYear}
            hoveredDate={dp.hoveredDate}
            isDateBlocked={dp.isDateBlocked}
            isDateFocused={dp.isDateFocused}
            isDateHovered={dp.isDateHovered}
            isDateSelected={dp.isDateSelected}
            isEndDate={dp.isEndDate}
            isFirstOrLastSelectedDate={dp.isFirstOrLastSelectedDate}
            isStartDate={dp.isStartDate}
            monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
            numberOfMonths={dp.numberOfMonths}
            onDateFocus={dp.onDateFocus}
            onDateHover={dp.onDateHover}
            onDateSelect={dp.onDateSelect}
            onDayRender={onDayRender}
            onResetDates={dp.onResetDates}
            phrases={phrases}
            startDate={startDate}
            weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
          >
            <Box {...styleProps.datepickerContainer}>
              {showClose && <CloseButton onClick={onClose} />}

              {showSelectedDates && (
                <Box mb={6}>
                  <HStack data-testid="SelectedDatesGrid">
                    <SelectedDate date={startDate} isFocused={focusedInput === START_DATE} />
                    <Flex justifyContent="center" alignItems="center">
                      <ArrowForwardIcon {...styleProps.arrowIcon} />
                    </Flex>
                    <SelectedDate date={endDate} isFocused={focusedInput === END_DATE} />
                  </HStack>
                </Box>
              )}
              <Box position="relative">
                <Stack
                  overflow={_vertical ? 'auto' : undefined}
                  data-testid="MonthGrid"
                  isInline={!_vertical}
                  ref={monthGridRef}
                  padding={1}
                  {...styleProps.monthsWrapper}
                  onMouseLeave={() => {
                    if (dp.hoveredDate) {
                      dp.onDateHover(null)
                    }
                  }}
                >
                  {dp.activeMonths.map((month: MonthType) => (
                    <Month
                      key={`month-${month.year}-${month.month}`}
                      year={month.year}
                      month={month.month}
                    />
                  ))}
                </Stack>

                <Flex {...styleProps.datepickerFooter}>
                  <HStack {...styleProps.buttonsWrapper}>
                    <ActionButton
                      direction={_vertical ? 'up' : 'left'}
                      onClick={_goToPreviousMonths}
                      aria-label="Previous month"
                    />
                    <ActionButton
                      direction={_vertical ? 'down' : 'right'}
                      onClick={_goToNextMonths}
                      aria-label="Next month"
                    />
                  </HStack>
                  {showResetDates && (
                    <ResetDatesButton onResetDates={dp.onResetDates} text={phrases.resetDates} />
                  )}
                </Flex>
              </Box>
            </Box>
          </DatepickerProvider>
        </StylesProvider>
      </ThemeProvider>
    )
  },
)
