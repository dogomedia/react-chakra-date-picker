import { IconButtonProps } from '@chakra-ui/react';
import React from 'react';
export interface ActionButtonProps extends Omit<IconButtonProps, 'aria-label'> {
    direction?: 'up' | 'right' | 'down' | 'left';
}
export declare const ActionButton: React.FC<ActionButtonProps>;
