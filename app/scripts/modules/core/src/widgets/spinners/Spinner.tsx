import classnames from 'classnames';
import React from 'react';

import { ReactComponent as LoadingIndicator } from './loadingIndicator.svg';

export interface ISpinnerProps {
  color?: string;
  message?: string;
  mode?: 'circular' | 'horizontal';
  fullWidth?: boolean;
  size?: 'nano' | 'small' | 'medium' | 'large';
}

export const Spinner = ({
  color = '#ffffff',
  fullWidth,
  message,
  mode = 'horizontal',
  size = 'small',
}: ISpinnerProps) => {
  if (mode === 'circular') {
    const sizeToHeight = {
      nano: 12,
      small: 16,
      medium: 24,
      large: 32,
    };

    return <LoadingIndicator style={{ height: sizeToHeight[size], fill: color }} />;
  }

  const getBarRows = (): React.ReactNode[] => {
    let count = 3;

    if (size) {
      if (size === 'nano') {
        count = 1;
      } else if (size === 'large') {
        count = 5;
      }
    }

    const rows = [];
    let i: number;
    for (i = 0; i < count; i++) {
      rows.push(<div key={i} className="bar" />);
    }
    return rows;
  };

  const messageClassNames = `message color-text-accent ${size === 'medium' ? 'heading-4' : 'heading-2'}`;
  const messageNode = ['medium', 'large'].includes(size) && (
    <div className={messageClassNames}>{message || 'Loading ...'}</div>
  );

  const bars = ['medium', 'large'].includes(size) ? <div className="bars">{getBarRows()}</div> : getBarRows();

  return (
    <div className={classnames('load', size || 'small', { 'full-width': fullWidth })}>
      {messageNode}
      {bars}
    </div>
  );
};

/**
 * Note: This is a temporary component for backwards compatibility in NgReact.
 * Once core is bumped, the `ButtonBusyIndicator` and `LegacySpinner` from NgReact can be replaced with `Spinner` in the other modules and removed.
 */
export const ButtonBusyIndicator = () => <Spinner mode="circular" />;
