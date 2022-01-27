import { ChevronLeftIcon, ChevronUpIcon, ChevronRightIcon, ChevronDownIcon, CalendarIcon, RepeatIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton, CloseButton as CloseButton$1, useColorModeValue, Box, Button, InputGroup, InputLeftAddon, Icon, Input as Input$1, Flex, Text, SimpleGrid, Stack, useTheme, useBreakpointValue, HStack, StackDivider } from '@chakra-ui/react';
import { monthLabelFormat, weekdayLabelFormat, useDay, isStartDate, isEndDate, parseDate, useMonth, getInputValue, useDatepicker, START_DATE, END_DATE } from '@datepicker-react/hooks';
export { monthLabelFormat as monthLabelFormatFn, weekdayLabelFormat as weekdayLabelFormatFn } from '@datepicker-react/hooks';
import React, { useContext, createContext, useRef, useMemo, forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import dateFormat from 'date-fns/format';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// istanbul ignore next
var isObject = function isObject(obj) {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      var prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }

    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  return false;
};

var merge = function merge() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  return objects.reduce(function (result, current) {
    Object.keys(current).forEach(function (key) {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = Array.from(new Set(result[key].concat(current[key])));
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });
    return result;
  }, {});
};

function pick(obj, keys) {
  var ret = {};
  keys.forEach(function (key) {
    ret[key] = obj[key];
  });
  return ret;
}

var emptyStylesObject = {
  actionButton: {},
  arrowIcon: {},
  buttonsWrapper: {},
  closeButton: {},
  datepickerContainer: {},
  dateRangeInputContainer: {},
  dateRangeInputDivider: {},
  day: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {}
  },
  dayContainer: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {}
  },
  inputComponentIcon: {
    active: {},
    base: {}
  },
  inputComponentInput: {
    active: {},
    base: {}
  },
  inputComponentInputAddon: {
    active: {},
    base: {}
  },
  inputComponentInputGroup: {
    active: {},
    base: {}
  },
  monthContainer: {},
  monthDayGrid: {},
  monthMonthLabel: {},
  monthsWrapper: {},
  monthWeekdayLabel: {},
  resetDatesButton: {},
  selectDateContainer: {
    active: {},
    base: {}
  },
  selectDateDateText: {
    active: {},
    base: {}
  },
  selectDateText: {
    active: {},
    base: {}
  },
  datepickerFooter: {}
};
var StylesContext = /*#__PURE__*/createContext({
  styles: emptyStylesObject,
  overwriteDefaultStyles: false
});
var StylesProvider = function StylesProvider(_ref) {
  var children = _ref.children,
      _ref$overwriteDefault = _ref.overwriteDefaultStyles,
      overwriteDefaultStyles = _ref$overwriteDefault === void 0 ? false : _ref$overwriteDefault,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? emptyStylesObject : _ref$styles;
  return React.createElement(StylesContext.Provider, {
    value: {
      overwriteDefaultStyles: overwriteDefaultStyles,
      styles: merge(emptyStylesObject, styles)
    }
  }, children);
};
function useStyleProps(inlineStyles) {
  var _useContext = useContext(StylesContext),
      styles = _useContext.styles,
      overwriteDefaultStyles = _useContext.overwriteDefaultStyles;

  var keys = Object.keys(inlineStyles);
  var filteredStyles = pick(styles, keys);
  var result = merge(filteredStyles, !overwriteDefaultStyles ? inlineStyles : {});
  return result;
}

var _excluded = ["direction"];
var ActionButton = function ActionButton(_ref) {
  var direction = _ref.direction,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var IconComponent = ChevronLeftIcon;
  var styleProps = useStyleProps({
    actionButton: {
      position: 'relative'
    }
  });

  if (direction === 'up') {
    IconComponent = ChevronUpIcon;
  } else if (direction === 'right') {
    IconComponent = ChevronRightIcon;
  } else if (direction === 'down') {
    IconComponent = ChevronDownIcon;
  } else if (direction === 'left') {
    IconComponent = ChevronLeftIcon;
  }

  return React.createElement(IconButton, Object.assign({
    "aria-label": "Arrow " + direction,
    icon: React.createElement(IconComponent, null)
  }, props, styleProps.actionButton));
};

var CloseButton = function CloseButton(props) {
  var styleProps = useStyleProps({
    closeButton: {
      top: 1,
      right: 1,
      zIndex: 1,
      position: 'absolute'
    }
  });
  return React.createElement(CloseButton$1, Object.assign({}, styleProps.closeButton, props));
};

var datepickerPhrases = {
  datepickerStartDatePlaceholder: 'Select',
  datepickerStartDateLabel: 'Start date:',
  datepickerEndDatePlaceholder: 'Select',
  datepickerEndDateLabel: 'End date:',
  resetDates: 'Reset dates',
  close: 'Close'
};
var dateRangeInputPhrases = /*#__PURE__*/_extends({}, datepickerPhrases, {
  startDateAriaLabel: 'Start date',
  endDateAriaLabel: 'End date',
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date'
});
var dateSingleInputPhrases = /*#__PURE__*/_extends({}, datepickerPhrases, {
  dateAriaLabel: 'Select date',
  datePlaceholder: 'Select date'
});

var dayLabelFormatFn = function dayLabelFormatFn(date) {
  return dateFormat(date, 'd');
};
var defaultDisplayFormat = 'MM/dd/yyyy';

var _excluded$1 = ["children"];
var defaultBase = {
  startDate: null,
  endDate: null,
  focusedInput: null,
  onDayRender: undefined,
  displayFormat: defaultDisplayFormat,
  phrases: datepickerPhrases
};
var defaultFormatters = {
  monthLabelFormat: monthLabelFormat,
  weekdayLabelFormat: weekdayLabelFormat,
  dayLabelFormat: dayLabelFormatFn
};
var defaultUseDatepicker = {
  numberOfMonths: 2,
  activeMonths: [],
  firstDayOfWeek: 0,
  focusedDate: null,
  hoveredDate: null,
  goToDate: function goToDate() {},
  goToNextMonths: function goToNextMonths() {},
  goToNextMonthsByOneMonth: function goToNextMonthsByOneMonth() {},
  goToNextYear: function goToNextYear() {},
  goToPreviousMonths: function goToPreviousMonths() {},
  goToPreviousMonthsByOneMonth: function goToPreviousMonthsByOneMonth() {},
  goToPreviousYear: function goToPreviousYear() {},
  isDateBlocked: function isDateBlocked() {
    return false;
  },
  isDateFocused: function isDateFocused() {
    return false;
  },
  isDateHovered: function isDateHovered() {
    return false;
  },
  isDateSelected: function isDateSelected() {
    return false;
  },
  isEndDate: function isEndDate() {
    return false;
  },
  isFirstOrLastSelectedDate: function isFirstOrLastSelectedDate() {
    return false;
  },
  isStartDate: function isStartDate() {
    return false;
  },
  onDateFocus: function onDateFocus() {},
  onDateHover: function onDateHover() {},
  onDateSelect: function onDateSelect() {},
  onResetDates: function onResetDates() {}
};
var datepickerContextDefaultValue = /*#__PURE__*/_extends({}, defaultBase, defaultFormatters, defaultUseDatepicker);
var DatepickerContext = /*#__PURE__*/React.createContext(datepickerContextDefaultValue);
var useDatepickerContext = function useDatepickerContext() {
  return useContext(DatepickerContext);
};
var DatepickerProvider = function DatepickerProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return React.createElement(DatepickerContext.Provider, {
    value: _extends({}, datepickerContextDefaultValue, props)
  }, children);
};

function getColor(_ref, _ref2) {
  var isSelected = _ref.isSelected,
      isWithinHoverRange = _ref.isWithinHoverRange,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast;
  var base = _ref2.base,
      normal = _ref2.normal,
      rangeHover = _ref2.rangeHover,
      selected = _ref2.selected,
      firstOrLast = _ref2.firstOrLast,
      first = _ref2.first,
      last = _ref2.last;
  var style = base;
  if (!isSelected && !isWithinHoverRange) style = _extends({}, style, normal);
  if (isSelected) style = _extends({}, style, selected);
  if (isWithinHoverRange) style = _extends({}, style, rangeHover);
  if (isFirst || isLast) style = _extends({}, style, firstOrLast);
  if (isFirst) style = _extends({}, style, first);
  if (isLast) style = _extends({}, style, last);
  return style;
}

function Day(_ref3) {
  var day = _ref3.day,
      date = _ref3.date;
  var dayRef = useRef(null);

  var _useDatepickerContext = useDatepickerContext(),
      focusedDate = _useDatepickerContext.focusedDate,
      isDateFocused = _useDatepickerContext.isDateFocused,
      isDateSelected = _useDatepickerContext.isDateSelected,
      isDateHovered = _useDatepickerContext.isDateHovered,
      isDateBlocked = _useDatepickerContext.isDateBlocked,
      isFirstOrLastSelectedDate = _useDatepickerContext.isFirstOrLastSelectedDate,
      onDateSelect = _useDatepickerContext.onDateSelect,
      onDateFocus = _useDatepickerContext.onDateFocus,
      onDateHover = _useDatepickerContext.onDateHover,
      onDayRender = _useDatepickerContext.onDayRender,
      startDate = _useDatepickerContext.startDate,
      endDate = _useDatepickerContext.endDate;

  var dayProps = useDay({
    date: date,
    focusedDate: focusedDate,
    isDateFocused: isDateFocused,
    isDateSelected: isDateSelected,
    isDateHovered: isDateHovered,
    isDateBlocked: isDateBlocked,
    isFirstOrLastSelectedDate: isFirstOrLastSelectedDate,
    onDateFocus: onDateFocus,
    onDateSelect: onDateSelect,
    onDateHover: onDateHover,
    dayRef: dayRef
  });
  var onClick = dayProps.onClick,
      onKeyDown = dayProps.onKeyDown,
      onMouseEnter = dayProps.onMouseEnter,
      tabIndex = dayProps.tabIndex,
      isSelectedStartOrEnd = dayProps.isSelectedStartOrEnd,
      isSelected = dayProps.isSelected,
      isWithinHoverRange = dayProps.isWithinHoverRange,
      disabledDate = dayProps.disabledDate;
  var styleProps = useStyleProps({
    day: {
      base: {
        height: ['32px', '48px'],
        width: ['32px', '48px'],
        minWidth: 'unset',
        fontWeight: 'medium',
        fontSize: ['sm', 'md'],
        border: '2px solid',
        textColor: useColorModeValue('gray.900', 'white'),
        borderRadius: '100%',
        borderColor: 'transparent',
        background: 'transparent',
        overflow: 'hidden',
        _hover: {
          borderColor: 'transparent',
          background: 'transparent'
        }
      },
      normal: {
        _hover: {
          borderColor: useColorModeValue('black', 'white')
        }
      },
      rangeHover: {
        _hover: {
          borderColor: useColorModeValue('black', 'white')
        }
      },
      selected: {
        _hover: {
          borderColor: useColorModeValue('black', 'white')
        }
      },
      firstOrLast: {
        textColor: useColorModeValue('white', 'black'),
        background: useColorModeValue('black', 'white'),
        _hover: {
          textColor: useColorModeValue('white', 'black'),
          background: useColorModeValue('black', 'white')
        }
      },
      first: {},
      last: {}
    },
    dayContainer: {
      base: {
        height: ['32px', '48px'],
        width: ['32px', '48px'],
        _hover: {
          borderRightRadius: '100%'
        }
      },
      normal: {},
      rangeHover: {
        background: useColorModeValue('gray.100', 'gray.500'),
        _hover: {
          borderRightRadius: '100%'
        }
      },
      selected: {
        background: useColorModeValue('gray.100', 'gray.500'),
        _hover: {
          borderRightRadius: '0%'
        }
      },
      firstOrLast: {
        background: useColorModeValue('gray.100', 'gray.500')
      },
      first: {
        borderLeftRadius: '100%'
      },
      last: {
        borderRightRadius: '100%',
        _hover: {
          borderRightRadius: '100%'
        }
      }
    }
  });
  var isFirst = isStartDate(date, startDate);
  var isLast = isEndDate(date, endDate);
  var containerStyle = useMemo(function () {
    return getColor({
      isFirst: isFirst,
      isLast: isLast,
      isSelected: isSelected,
      isWithinHoverRange: isWithinHoverRange,
      isSelectedStartOrEnd: isSelectedStartOrEnd,
      disabledDate: disabledDate
    }, {
      base: styleProps.dayContainer.base,
      normal: styleProps.dayContainer.normal,
      rangeHover: styleProps.dayContainer.rangeHover,
      selected: styleProps.dayContainer.selected,
      first: styleProps.dayContainer.first,
      last: styleProps.dayContainer.last,
      firstOrLast: styleProps.dayContainer.firstOrLast
    });
  }, [isFirst, isLast, isSelected, isWithinHoverRange, isSelectedStartOrEnd, disabledDate, styleProps]);
  var buttonStyle = useMemo(function () {
    return getColor({
      isFirst: isFirst,
      isLast: isLast,
      isSelected: isSelected,
      isWithinHoverRange: isWithinHoverRange,
      isSelectedStartOrEnd: isSelectedStartOrEnd,
      disabledDate: disabledDate
    }, {
      base: styleProps.day.base,
      normal: styleProps.day.normal,
      rangeHover: styleProps.day.rangeHover,
      selected: styleProps.day.selected,
      first: styleProps.day.first,
      last: styleProps.day.last,
      firstOrLast: styleProps.day.firstOrLast
    });
  }, [isFirst, isLast, isSelected, isWithinHoverRange, isSelectedStartOrEnd, disabledDate, styleProps]);
  return React.createElement(Box, Object.assign({}, containerStyle), React.createElement(Button, Object.assign({}, buttonStyle, {
    variant: "unstyled",
    onClick: onClick,
    onKeyDown: onKeyDown,
    onMouseEnter: onMouseEnter,
    tabIndex: tabIndex,
    ref: dayRef,
    disabled: disabledDate,
    "data-testid": "Day",
    "aria-label": "Day-" + date.toDateString(),
    type: "button"
  }), typeof onDayRender === 'function' ? onDayRender(date, {
    isFirst: isFirst,
    isLast: isLast,
    isSelected: isSelected,
    isWithinHoverRange: isWithinHoverRange,
    isSelectedStartOrEnd: isSelectedStartOrEnd,
    disabledDate: disabledDate
  }) : day));
}

var getStateStyle = function getStateStyle(_ref, isActive) {
  var base = _ref.base,
      active = _ref.active;
  return isActive ? _extends({}, base, active) : base;
};

var _excluded$2 = ["dateFormat", "disableAccessibility", "iconComponent", "id", "isActive", "name", "onChange", "onClick", "placeholder", "showCalendarIcon", "value", "allowEditableInputs"];
var Input = /*#__PURE__*/forwardRef(function (props, inputRef) {
  var _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === void 0 ? defaultDisplayFormat : _props$dateFormat,
      disableAccessibility = props.disableAccessibility,
      _props$iconComponent = props.iconComponent,
      iconComponent = _props$iconComponent === void 0 ? CalendarIcon : _props$iconComponent,
      id = props.id,
      _props$isActive = props.isActive,
      isActive = _props$isActive === void 0 ? false : _props$isActive,
      name = props.name,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange,
      _props$onClick = props.onClick,
      onClick = _props$onClick === void 0 ? function () {} : _props$onClick,
      placeholder = props.placeholder,
      _props$showCalendarIc = props.showCalendarIcon,
      showCalendarIcon = _props$showCalendarIc === void 0 ? true : _props$showCalendarIc,
      value = props.value,
      _props$allowEditableI = props.allowEditableInputs,
      allowEditableInputs = _props$allowEditableI === void 0 ? false : _props$allowEditableI,
      inputProps = _objectWithoutPropertiesLoose(props, _excluded$2);

  var ref = useRef(null);

  var _useState = useState(value),
      searchString = _useState[0],
      setSearchString = _useState[1];

  var styleProps = useStyleProps({
    inputComponentInputGroup: {
      base: {},
      active: {}
    },
    inputComponentInput: {
      base: {},
      active: {}
    },
    inputComponentIcon: {
      base: {},
      active: {}
    },
    inputComponentInputAddon: {
      base: {},
      active: {}
    }
  }); // Note: value was updated outside of InputComponent

  useEffect(function () {
    setSearchString(value);
  }, [value]);

  function handleOnChange(e) {
    var dateValue = e.target.value;
    setSearchString(dateValue);

    if (typeof ref.current === 'number') {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(function () {
      onClick();
      var parsedDate = parseDate(dateValue, dateFormat, new Date());
      var isValidDate = !isNaN(parsedDate.getDate());

      if (isValidDate) {
        onChange(parsedDate);
      } else {
        onChange(null);
      }
    }, 1000);
  }

  function handleOnFocus(_e) {
    onClick();
  }

  return React.createElement(InputGroup, Object.assign({}, getStateStyle(styleProps.inputComponentInputGroup, isActive), {
    htmlFor: id
  }), showCalendarIcon && React.createElement(InputLeftAddon, Object.assign({}, getStateStyle(styleProps.inputComponentInputAddon, isActive)), React.createElement(Icon, Object.assign({
    as: iconComponent
  }, getStateStyle(styleProps.inputComponentIcon, isActive)))), React.createElement(Input$1, Object.assign({}, inputProps, getStateStyle(styleProps.inputComponentInput, isActive), {
    ref: inputRef,
    id: id,
    name: name,
    isReadOnly: !allowEditableInputs,
    value: searchString,
    placeholder: placeholder,
    tabIndex: disableAccessibility ? -1 : 0,
    autoComplete: "off",
    "data-testid": "DatepickerInput",
    onFocus: handleOnFocus,
    onChange: handleOnChange
  })));
});

var Month = function Month(_ref) {
  var year = _ref.year,
      month = _ref.month;
  var styleProps = useStyleProps({
    monthContainer: {},
    monthMonthLabel: {
      justifyContent: 'center',
      fontWeight: 'bold',
      mb: 6,
      fontSize: ['md', 'lg']
    },
    monthWeekdayLabel: {
      justifyContent: 'center',
      color: 'gray.500',
      mb: 4,
      fontSize: ['sm', 'md']
    },
    monthDayGrid: {
      rowGap: 1
    }
  });

  var _useDatepickerContext = useDatepickerContext(),
      dayLabelFormat = _useDatepickerContext.dayLabelFormat,
      monthLabelFormat = _useDatepickerContext.monthLabelFormat,
      weekdayLabelFormat = _useDatepickerContext.weekdayLabelFormat,
      firstDayOfWeek = _useDatepickerContext.firstDayOfWeek;

  var _useMonth = useMonth({
    year: year,
    month: month,
    dayLabelFormat: dayLabelFormat,
    monthLabelFormat: monthLabelFormat,
    weekdayLabelFormat: weekdayLabelFormat,
    firstDayOfWeek: firstDayOfWeek
  }),
      days = _useMonth.days,
      weekdayLabels = _useMonth.weekdayLabels,
      monthLabel = _useMonth.monthLabel;

  return React.createElement(Box, Object.assign({}, styleProps.monthContainer), React.createElement(Flex, Object.assign({}, styleProps.monthMonthLabel), React.createElement(Text, null, monthLabel)), React.createElement(SimpleGrid, {
    columns: 7
  }, weekdayLabels.map(function (weekdayLabel) {
    return React.createElement(Flex, Object.assign({
      key: weekdayLabel
    }, styleProps.monthWeekdayLabel), React.createElement(Text, null, weekdayLabel));
  })), React.createElement(SimpleGrid, Object.assign({}, styleProps.monthDayGrid, {
    columns: 7
  }), days.map(function (day, index) {
    return typeof day === 'object' ? React.createElement(Day, {
      date: day.date,
      key: day.dayLabel + "-" + index,
      day: day.dayLabel
    }) : React.createElement("div", {
      key: index
    });
  })));
};

function ResetDatesButton(_ref) {
  var onResetDates = _ref.onResetDates,
      text = _ref.text;

  var _useDatepickerContext = useDatepickerContext(),
      phrases = _useDatepickerContext.phrases;

  var styleProps = useStyleProps({
    resetDatesButton: {}
  });

  function handleMouseUp(e) {
    e.currentTarget.blur();
  }

  return React.createElement(Button, Object.assign({
    icon: React.createElement(RepeatIcon, null),
    tabIndex: -1,
    "aria-label": phrases.resetDates
  }, styleProps.resetDatesButton, {
    onClick: onResetDates,
    onMouseUp: handleMouseUp
  }), text);
}

var SelectedDate = function SelectedDate(_ref) {
  var isFocused = _ref.isFocused,
      date = _ref.date;

  var _useDatepickerContext = useDatepickerContext(),
      phrases = _useDatepickerContext.phrases,
      displayFormat = _useDatepickerContext.displayFormat;

  var styleProps = useStyleProps({
    selectDateContainer: {
      base: {
        width: '100%',
        borderBottom: '2px solid',
        borderColor: 'gray.300',
        paddingBottom: [1, 3]
      },
      active: {
        borderColor: 'blue.400'
      }
    },
    selectDateText: {
      base: {
        fontSize: 'xs',
        color: 'gray.500'
      },
      active: {}
    },
    selectDateDateText: {
      base: {
        fontWeight: 'bold',
        fontSize: ['sm', 'md', 'lg']
      },
      active: {}
    }
  });
  return React.createElement(Stack, Object.assign({}, getStateStyle(styleProps.selectDateContainer, isFocused)), React.createElement(Text, Object.assign({}, getStateStyle(styleProps.selectDateText, isFocused)), phrases.datepickerStartDateLabel), React.createElement(Text, Object.assign({}, getStateStyle(styleProps.selectDateDateText, isFocused)), getInputValue(date, displayFormat, phrases.datepickerStartDatePlaceholder)));
};

var Datepicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var theme = useTheme();
  console.log('Datepicker:ChakraTheme', {
    theme: theme
  });
  var changeActiveMonthOnSelect = props.changeActiveMonthOnSelect,
      dayLabelFormat = props.dayLabelFormat,
      _props$displayFormat = props.displayFormat,
      displayFormat = _props$displayFormat === void 0 ? defaultDisplayFormat : _props$displayFormat,
      _props$endDate = props.endDate,
      endDate = _props$endDate === void 0 ? null : _props$endDate,
      _props$exactMinBookin = props.exactMinBookingDays,
      exactMinBookingDays = _props$exactMinBookin === void 0 ? false : _props$exactMinBookin,
      firstDayOfWeek = props.firstDayOfWeek,
      _props$focusedInput = props.focusedInput,
      focusedInput = _props$focusedInput === void 0 ? null : _props$focusedInput,
      initialVisibleMonth = props.initialVisibleMonth,
      _props$isDateBlocked = props.isDateBlocked,
      isDateBlocked = _props$isDateBlocked === void 0 ? function () {
    return false;
  } : _props$isDateBlocked,
      maxBookingDate = props.maxBookingDate,
      minBookingDate = props.minBookingDate,
      _props$minBookingDays = props.minBookingDays,
      minBookingDays = _props$minBookingDays === void 0 ? 1 : _props$minBookingDays,
      monthLabelFormat$1 = props.monthLabelFormat,
      _props$numberOfMonths = props.numberOfMonths,
      numberOfMonths = _props$numberOfMonths === void 0 ? 2 : _props$numberOfMonths,
      _props$onClose = props.onClose,
      onClose = _props$onClose === void 0 ? function () {} : _props$onClose,
      _props$onDatesChange = props.onDatesChange,
      onDatesChange = _props$onDatesChange === void 0 ? function () {} : _props$onDatesChange,
      onDayRender = props.onDayRender,
      overwriteDefaultStyles = props.overwriteDefaultStyles,
      _props$phrases = props.phrases,
      phrases = _props$phrases === void 0 ? datepickerPhrases : _props$phrases,
      _props$showClose = props.showClose,
      showClose = _props$showClose === void 0 ? true : _props$showClose,
      _props$showResetDates = props.showResetDates,
      showResetDates = _props$showResetDates === void 0 ? true : _props$showResetDates,
      _props$showSelectedDa = props.showSelectedDates,
      showSelectedDates = _props$showSelectedDa === void 0 ? true : _props$showSelectedDa,
      _props$startDate = props.startDate,
      startDate = _props$startDate === void 0 ? null : _props$startDate,
      customStyles = props.styles,
      _props$unavailableDat = props.unavailableDates,
      unavailableDates = _props$unavailableDat === void 0 ? [] : _props$unavailableDat,
      weekdayLabelFormat$1 = props.weekdayLabelFormat;
  var dp = useDatepicker({
    changeActiveMonthOnSelect: changeActiveMonthOnSelect,
    endDate: endDate,
    exactMinBookingDays: exactMinBookingDays,
    firstDayOfWeek: firstDayOfWeek,
    focusedInput: focusedInput,
    initialVisibleMonth: initialVisibleMonth,
    isDateBlocked: isDateBlocked,
    maxBookingDate: maxBookingDate,
    minBookingDate: minBookingDate,
    minBookingDays: minBookingDays,
    numberOfMonths: numberOfMonths,
    onDatesChange: onDatesChange,
    startDate: startDate,
    unavailableDates: unavailableDates
  });
  useImperativeHandle(ref, function () {
    return {
      onDateSelect: function onDateSelect(date) {
        dp.onDateSelect(date);
      }
    };
  });
  var monthGridRef = useRef(null);

  function scrollTopToMonthGrid() {
    if (monthGridRef && monthGridRef.current && vertical) {
      monthGridRef.current.scrollTop = 0;
    }
  }

  function _goToNextMonths() {
    dp.goToNextMonths();
    scrollTopToMonthGrid();
  }

  function _goToPreviousMonths() {
    dp.goToPreviousMonths();
    scrollTopToMonthGrid();
  }

  var isMobile = useBreakpointValue({
    base: true,
    md: false
  });
  var vertical = props.vertical || isMobile;
  var styleProps = useStyleProps({
    datepickerContainer: {
      background: useColorModeValue('white', 'gray.700'),
      borderRadius: 'md',
      position: 'relative',
      width: 'fit-content',
      shadow: 'md',
      px: [3, 5],
      py: [5, 7],
      zIndex: 1
    },
    monthsWrapper: {
      spacing: [0, 8]
    },
    buttonsWrapper: {
      spacing: [1, 3]
    },
    arrowIcon: {
      my: [5, 15],
      color: 'gray.500'
    },
    datepickerFooter: {
      justifyContent: 'space-between',
      pt: [1, 3]
    }
  });
  return React.createElement(StylesProvider, {
    styles: customStyles,
    overwriteDefaultStyles: overwriteDefaultStyles
  }, React.createElement(DatepickerProvider, {
    activeMonths: dp.activeMonths,
    dayLabelFormat: dayLabelFormat || dayLabelFormatFn,
    displayFormat: displayFormat,
    endDate: endDate,
    firstDayOfWeek: dp.firstDayOfWeek,
    focusedDate: dp.focusedDate,
    focusedInput: focusedInput,
    goToDate: dp.goToDate,
    goToNextMonths: _goToNextMonths,
    goToNextMonthsByOneMonth: dp.goToNextMonthsByOneMonth,
    goToNextYear: dp.goToNextYear,
    goToPreviousMonths: _goToPreviousMonths,
    goToPreviousMonthsByOneMonth: dp.goToPreviousMonthsByOneMonth,
    goToPreviousYear: dp.goToPreviousYear,
    hoveredDate: dp.hoveredDate,
    isDateBlocked: dp.isDateBlocked,
    isDateFocused: dp.isDateFocused,
    isDateHovered: dp.isDateHovered,
    isDateSelected: dp.isDateSelected,
    isEndDate: dp.isEndDate,
    isFirstOrLastSelectedDate: dp.isFirstOrLastSelectedDate,
    isStartDate: dp.isStartDate,
    monthLabelFormat: monthLabelFormat$1 || monthLabelFormat,
    numberOfMonths: dp.numberOfMonths,
    onDateFocus: dp.onDateFocus,
    onDateHover: dp.onDateHover,
    onDateSelect: dp.onDateSelect,
    onDayRender: onDayRender,
    onResetDates: dp.onResetDates,
    phrases: phrases,
    startDate: startDate,
    weekdayLabelFormat: weekdayLabelFormat$1 || weekdayLabelFormat
  }, React.createElement(Box, Object.assign({}, styleProps.datepickerContainer), showClose && React.createElement(CloseButton, {
    onClick: onClose
  }), showSelectedDates && React.createElement(Box, {
    mb: 6
  }, React.createElement(HStack, {
    "data-testid": "SelectedDatesGrid"
  }, React.createElement(SelectedDate, {
    date: startDate,
    isFocused: focusedInput === START_DATE
  }), React.createElement(Flex, {
    justifyContent: "center",
    alignItems: "center"
  }, React.createElement(ArrowForwardIcon, Object.assign({}, styleProps.arrowIcon))), React.createElement(SelectedDate, {
    date: endDate,
    isFocused: focusedInput === END_DATE
  }))), React.createElement(Box, {
    position: "relative"
  }, React.createElement(Stack, Object.assign({
    overflow: vertical ? 'auto' : undefined,
    "data-testid": "MonthGrid",
    isInline: !vertical,
    ref: monthGridRef,
    padding: 1
  }, styleProps.monthsWrapper, {
    onMouseLeave: function onMouseLeave() {
      if (dp.hoveredDate) {
        dp.onDateHover(null);
      }
    }
  }), dp.activeMonths.map(function (month) {
    return React.createElement(Month, {
      key: "month-" + month.year + "-" + month.month,
      year: month.year,
      month: month.month
    });
  })), React.createElement(Flex, Object.assign({}, styleProps.datepickerFooter), React.createElement(HStack, Object.assign({}, styleProps.buttonsWrapper), React.createElement(ActionButton, {
    direction: vertical ? 'up' : 'left',
    onClick: _goToPreviousMonths,
    "aria-label": "Previous month"
  }), React.createElement(ActionButton, {
    direction: vertical ? 'down' : 'right',
    onClick: _goToNextMonths,
    "aria-label": "Next month"
  })), showResetDates && React.createElement(ResetDatesButton, {
    onResetDates: dp.onResetDates,
    text: phrases.resetDates
  }))))));
});

var DateRangeInput = function DateRangeInput(props) {
  var _props$endDate = props.endDate,
      endDateProp = _props$endDate === void 0 ? null : _props$endDate,
      _props$startDate = props.startDate,
      startDateProp = _props$startDate === void 0 ? null : _props$startDate,
      _props$focusedInput = props.focusedInput,
      focusedInputProp = _props$focusedInput === void 0 ? null : _props$focusedInput,
      _props$displayFormat = props.displayFormat,
      displayFormat = _props$displayFormat === void 0 ? defaultDisplayFormat : _props$displayFormat,
      _props$endShowCalenda = props.endShowCalendarIcon,
      endShowCalendarIcon = _props$endShowCalenda === void 0 ? true : _props$endShowCalenda,
      _props$isDateBlocked = props.isDateBlocked,
      isDateBlocked = _props$isDateBlocked === void 0 ? function () {
    return false;
  } : _props$isDateBlocked,
      _props$minBookingDays = props.minBookingDays,
      minBookingDays = _props$minBookingDays === void 0 ? 1 : _props$minBookingDays,
      _props$phrases = props.phrases,
      phrases = _props$phrases === void 0 ? dateRangeInputPhrases : _props$phrases,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$showClose = props.showClose,
      showClose = _props$showClose === void 0 ? true : _props$showClose,
      _props$showDivider = props.showDivider,
      showDivider = _props$showDivider === void 0 ? false : _props$showDivider,
      _props$showResetDates = props.showResetDates,
      showResetDates = _props$showResetDates === void 0 ? true : _props$showResetDates,
      _props$showSelectedDa = props.showSelectedDates,
      showSelectedDates = _props$showSelectedDa === void 0 ? true : _props$showSelectedDa,
      _props$startShowCalen = props.startShowCalendarIcon,
      startShowCalendarIcon = _props$startShowCalen === void 0 ? true : _props$startShowCalen,
      _props$onClose = props.onClose,
      onClose = _props$onClose === void 0 ? function () {} : _props$onClose,
      _props$onDatesChange = props.onDatesChange,
      onDatesChange = _props$onDatesChange === void 0 ? function () {} : _props$onDatesChange,
      _props$onFocusChange = props.onFocusChange,
      onFocusChange = _props$onFocusChange === void 0 ? function () {} : _props$onFocusChange,
      customStyles = props.styles,
      overwriteDefaultStyles = props.overwriteDefaultStyles,
      startIcon = props.startIcon,
      startId = props.startId,
      startName = props.startName,
      startPlaceholder = props.startPlaceholder,
      startRef = props.startRef,
      endId = props.endId,
      endName = props.endName,
      endRef = props.endRef,
      endIcon = props.endIcon,
      endPlaceholder = props.endPlaceholder,
      changeActiveMonthOnSelect = props.changeActiveMonthOnSelect,
      dayLabelFormat = props.dayLabelFormat,
      exactMinBookingDays = props.exactMinBookingDays,
      firstDayOfWeek = props.firstDayOfWeek,
      initialVisibleMonth = props.initialVisibleMonth,
      maxBookingDate = props.maxBookingDate,
      minBookingDate = props.minBookingDate,
      monthLabelFormat = props.monthLabelFormat,
      numberOfMonths = props.numberOfMonths,
      onDayRender = props.onDayRender,
      unavailableDates = props.unavailableDates,
      weekdayLabelFormat = props.weekdayLabelFormat,
      allowEditableInputs = props.allowEditableInputs;
  var datepickerRef = useRef(null);
  var datepickerWrapperRef = useRef(null);

  var _useState = useState(startDateProp),
      startDate = _useState[0],
      setStartDate = _useState[1];

  var _useState2 = useState(endDateProp),
      endDate = _useState2[0],
      setEndDate = _useState2[1];

  var _useState3 = useState(focusedInputProp),
      focusedInput = _useState3[0],
      setFocusedInput = _useState3[1];

  useEffect(function () {
    setStartDate(startDateProp);
    setEndDate(endDateProp);
  }, [startDateProp, endDateProp]);
  var styleProps = useStyleProps({
    dateRangeInputContainer: {
      spacing: 5
    },
    dateRangeInputDivider: {}
  });
  useEffect(function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler);
    }

    return function () {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });

  function handleOnFocusChange(_focusedInput) {
    setFocusedInput(_focusedInput);
    onFocusChange(_focusedInput);
  }

  function handleOnDatesChange(data) {
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setFocusedInput(data.focusedInput);
    onDatesChange(data);
  }

  function onClickOutsideHandler(event) {
    if (focusedInput !== null && datepickerWrapperRef && datepickerWrapperRef.current && // @ts-ignore
    !datepickerWrapperRef.current.contains(event.target)) {
      handleOnFocusChange(null);
    }
  }

  function handleOnClose() {
    handleOnFocusChange(null);
    onClose();
  }

  function handleInputChange(date) {
    if (datepickerRef && datepickerRef.current && datepickerRef.current.onDateSelect) {
      datepickerRef.current.onDateSelect(date);
    }
  }

  var isMobile = useBreakpointValue({
    base: true,
    md: false
  });
  var vertical = props.vertical || isMobile;
  return React.createElement(StylesProvider, {
    styles: customStyles,
    overwriteDefaultStyles: overwriteDefaultStyles
  }, React.createElement(Box, {
    position: "relative",
    ref: datepickerWrapperRef
  }, React.createElement(Stack, Object.assign({
    isInline: !isMobile
  }, styleProps.dateRangeInputContainer, {
    "data-testid": "DateRangeInputGrid",
    divider: showDivider ? React.createElement(StackDivider, Object.assign({}, styleProps.dateRangeInputDivider)) : undefined
  }), React.createElement(Input, {
    iconComponent: startIcon,
    id: startId || 'startDate',
    name: startName || 'startDate',
    placeholder: startPlaceholder || phrases.startDatePlaceholder,
    ref: startRef,
    showCalendarIcon: startShowCalendarIcon,
    "aria-label": phrases.startDateAriaLabel,
    dateFormat: displayFormat,
    isActive: focusedInput === START_DATE,
    onChange: handleInputChange,
    onClick: function onClick() {
      return handleOnFocusChange(START_DATE);
    },
    value: getInputValue(startDate, displayFormat, ''),
    allowEditableInputs: allowEditableInputs
  }), React.createElement(Input, {
    id: endId || 'endDate',
    name: endName || 'endDate',
    ref: endRef,
    iconComponent: endIcon,
    placeholder: endPlaceholder || phrases.endDatePlaceholder,
    showCalendarIcon: endShowCalendarIcon,
    "aria-label": phrases.endDateAriaLabel,
    dateFormat: displayFormat,
    disableAccessibility: focusedInput === START_DATE,
    isActive: focusedInput === END_DATE,
    onChange: handleInputChange,
    onClick: function onClick() {
      return handleOnFocusChange(!startDate ? START_DATE : END_DATE);
    },
    value: getInputValue(endDate, displayFormat, ''),
    allowEditableInputs: allowEditableInputs
  })), React.createElement(Box, {
    position: "absolute",
    top: placement === 'top' ? undefined : vertical ? '100px' : '45px',
    bottom: placement === 'bottom' ? undefined : vertical ? '100px' : '45px'
  }, focusedInput !== null && React.createElement(Datepicker, {
    ref: datepickerRef,
    startDate: startDate,
    endDate: endDate,
    focusedInput: focusedInput,
    onClose: handleOnClose,
    onDatesChange: handleOnDatesChange,
    changeActiveMonthOnSelect: changeActiveMonthOnSelect,
    dayLabelFormat: dayLabelFormat,
    exactMinBookingDays: exactMinBookingDays,
    firstDayOfWeek: firstDayOfWeek,
    initialVisibleMonth: initialVisibleMonth,
    isDateBlocked: isDateBlocked,
    maxBookingDate: maxBookingDate,
    minBookingDate: minBookingDate,
    minBookingDays: minBookingDays,
    monthLabelFormat: monthLabelFormat,
    numberOfMonths: vertical ? 1 : numberOfMonths,
    onDayRender: onDayRender,
    phrases: phrases,
    unavailableDates: unavailableDates,
    displayFormat: displayFormat,
    showClose: showClose,
    showResetDates: showResetDates,
    showSelectedDates: showSelectedDates,
    vertical: vertical,
    weekdayLabelFormat: weekdayLabelFormat
  }))));
};

var DateSingleInput = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$date = _ref.date,
      dateProp = _ref$date === void 0 ? null : _ref$date,
      _ref$showDatepicker = _ref.showDatepicker,
      showDatepickerProp = _ref$showDatepicker === void 0 ? false : _ref$showDatepicker,
      changeActiveMonthOnSelect = _ref.changeActiveMonthOnSelect,
      dayLabelFormat = _ref.dayLabelFormat,
      _ref$displayFormat = _ref.displayFormat,
      displayFormat = _ref$displayFormat === void 0 ? defaultDisplayFormat : _ref$displayFormat,
      firstDayOfWeek = _ref.firstDayOfWeek,
      iconComponent = _ref.iconComponent,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'startDate' : _ref$id,
      initialVisibleMonth = _ref.initialVisibleMonth,
      _ref$isDateBlocked = _ref.isDateBlocked,
      isDateBlocked = _ref$isDateBlocked === void 0 ? function () {
    return false;
  } : _ref$isDateBlocked,
      maxBookingDate = _ref.maxBookingDate,
      minBookingDate = _ref.minBookingDate,
      monthLabelFormat = _ref.monthLabelFormat,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'startDate' : _ref$name,
      _ref$numberOfMonths = _ref.numberOfMonths,
      numberOfMonths = _ref$numberOfMonths === void 0 ? 1 : _ref$numberOfMonths,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
      onDayRender = _ref.onDayRender,
      _ref$onFocusChange = _ref.onFocusChange,
      onFocusChange = _ref$onFocusChange === void 0 ? function () {} : _ref$onFocusChange,
      overwriteDefaultStyles = _ref.overwriteDefaultStyles,
      _ref$phrases = _ref.phrases,
      phrases = _ref$phrases === void 0 ? dateSingleInputPhrases : _ref$phrases,
      placeholder = _ref.placeholder,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      _ref$showCalendarIcon = _ref.showCalendarIcon,
      showCalendarIcon = _ref$showCalendarIcon === void 0 ? true : _ref$showCalendarIcon,
      _ref$showClose = _ref.showClose,
      showClose = _ref$showClose === void 0 ? true : _ref$showClose,
      _ref$showResetDate = _ref.showResetDate,
      showResetDate = _ref$showResetDate === void 0 ? true : _ref$showResetDate,
      styles = _ref.styles,
      _ref$unavailableDates = _ref.unavailableDates,
      unavailableDates = _ref$unavailableDates === void 0 ? [] : _ref$unavailableDates,
      value = _ref.value,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? false : _ref$vertical,
      weekdayLabelFormat = _ref.weekdayLabelFormat,
      _ref$allowEditableInp = _ref.allowEditableInputs,
      allowEditableInputs = _ref$allowEditableInp === void 0 ? false : _ref$allowEditableInp;

  var datepickerRef = useRef(null);
  var datepickerWrapperRef = useRef(null);

  var _useState = useState(value ? new Date(value) : dateProp),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = useState(showDatepickerProp),
      showDatepicker = _useState2[0],
      setShowDatepicker = _useState2[1];

  useEffect(function () {
    onChange(date);
  }, [date, onChange]);
  useEffect(function () {
    onFocusChange(showDatepicker);
  }, [onFocusChange, showDatepicker]);
  useEffect(function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler);
    }

    return function () {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });

  function handleOnFocusChange(show) {
    setShowDatepicker(show);
  }

  function onClickOutsideHandler(event) {
    if (showDatepicker && datepickerWrapperRef && datepickerWrapperRef.current && // @ts-ignore
    !datepickerWrapperRef.current.contains(event.target)) {
      handleOnFocusChange(false);
    }
  }

  function handleDatepickerClose() {
    handleOnFocusChange(false);
    onClose();
  }

  function handleOnDatesChange(data) {
    handleOnFocusChange(data.focusedInput !== null);
    setDate(data.startDate);
  }

  function handleInputChange(date) {
    if (datepickerRef && datepickerRef.current && datepickerRef.current.onDateSelect) {
      datepickerRef.current.onDateSelect(date);
    }
  }

  return React.createElement(StylesProvider, {
    styles: styles,
    overwriteDefaultStyles: overwriteDefaultStyles
  }, React.createElement(Box, {
    position: "relative",
    ref: datepickerWrapperRef
  }, React.createElement(Input, {
    ref: ref,
    id: id,
    name: name,
    "aria-label": phrases.dateAriaLabel,
    value: getInputValue(date, displayFormat, ''),
    placeholder: placeholder || phrases.datePlaceholder,
    dateFormat: displayFormat,
    showCalendarIcon: showCalendarIcon,
    isActive: showDatepicker,
    onChange: handleInputChange,
    onClick: function onClick() {
      handleOnFocusChange(true);

      _onClick();
    },
    disableAccessibility: false,
    iconComponent: iconComponent,
    allowEditableInputs: allowEditableInputs
  }), React.createElement(Box, {
    position: "absolute",
    top: placement === 'bottom' ? '45px' : undefined,
    bottom: placement === 'top' ? '45px' : undefined
  }, showDatepicker && React.createElement(Datepicker, {
    changeActiveMonthOnSelect: changeActiveMonthOnSelect,
    dayLabelFormat: dayLabelFormat,
    displayFormat: displayFormat,
    endDate: date,
    exactMinBookingDays: true,
    firstDayOfWeek: firstDayOfWeek,
    focusedInput: showDatepicker ? START_DATE : null,
    initialVisibleMonth: initialVisibleMonth,
    isDateBlocked: isDateBlocked,
    maxBookingDate: maxBookingDate,
    minBookingDate: minBookingDate,
    minBookingDays: 1,
    monthLabelFormat: monthLabelFormat,
    numberOfMonths: numberOfMonths,
    onClose: handleDatepickerClose,
    onDatesChange: handleOnDatesChange,
    onDayRender: onDayRender,
    phrases: phrases,
    ref: datepickerRef,
    showClose: showClose,
    showResetDates: showResetDate,
    showSelectedDates: false,
    startDate: date,
    unavailableDates: unavailableDates,
    vertical: vertical,
    weekdayLabelFormat: weekdayLabelFormat
  }))));
});

export { DateRangeInput, DateSingleInput, Datepicker, dateRangeInputPhrases, dateSingleInputPhrases, datepickerPhrases, dayLabelFormatFn, defaultDisplayFormat };
//# sourceMappingURL=react-chakra-ui-datepicker.esm.js.map
