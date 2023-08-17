import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './Accordion.less';

const DefaultActiveColorClass = 'Transparent';

function getAccordionActiveColorClass(color) {
  switch (color) {
    case 'danger':
      return 'Danger';
    case 'success':
      return 'Success';
    default:
      return DefaultActiveColorClass;
  }
}

interface AccordionProps {
  open?: boolean;
  initiallyOpened?: boolean;
  disabled?: boolean;
  withBorder?: boolean;
  highlighted?: boolean;
  onToggle?: () => void;
  renderHeader?: (open: boolean) => React.ReactNode;
  label?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName: string;
  activeColor?: 'danger' | 'success';
  size?: 'medium' | 'small';
  children: React.ReactNode;
}

const Accordion = ({
  open = false,
  initiallyOpened = false,
  onToggle,
  label = '',
  size = 'medium',
  description = '',
  disabled = false,
  className = '',
  renderHeader,
  highlighted = false,
  withBorder = false,
  headerClassName = '',
  contentClassName = '',
  activeColor,
  children,
}: AccordionProps) => {
  const [localOpen, setLocalOpen] = useState(initiallyOpened);
  const [isOpen, setIsOpen] = useState(!!open);

  const isOpenDefined = open !== null && typeof open !== 'undefined';
  // let isOpen = localOpen;

  // if (isOpenDefined) {
  //   isOpen = open;
  // }

  useEffect(() => {
    setIsOpen(localOpen);
  }, [localOpen]);

  function handleToggleAccordion() {
    if (disabled) {
      return;
    }

    if (isOpenDefined && onToggle) {
      onToggle();
    } else {
      setLocalOpen(!localOpen);
    }
  }

  const activeColorClass = getAccordionActiveColorClass(activeColor);

  return (
    <div
      className={classNames(
        'Accordion',
        {
          'Accordion--WithBorder': withBorder,
        },
        className
      )}
    >
      <div
        className={classNames(
          'Accordion__Header',
          `Accordion__Header--Active--${
            isOpen ? activeColorClass : DefaultActiveColorClass
          }`,
          {
            'Accordion__Header--Highlighted': highlighted,
            'Accordion__Header--Open': isOpen,
            'Accordion__Header--Disabled': disabled,
            'Accordion__Header--Small': size === 'small',
          },
          headerClassName
        )}
        onClick={handleToggleAccordion}
      >
        {!!renderHeader && (
          <div className="flex items-center">{renderHeader(isOpen)}</div>
        )}
        {!!label && (
          <div className="Accordion__Header__Label flex items-center">
            <span>{label}</span>
          </div>
        )}
        {!!description && (
          <div className="Accordion__Header__Description">{description}</div>
        )}
      </div>
      {isOpen && (
        <div
          className={classNames(
            'Accordion__Content',
            `Accordion__Content--Active--${
              isOpen ? activeColorClass : DefaultActiveColorClass
            }`,
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
