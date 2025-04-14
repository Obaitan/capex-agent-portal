'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';
import { SelectProps } from '@/types';

const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  className,
  buttonStyle,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const listboxId = `listbox-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const buttonId = `select-button-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const handleSelect = (value: string) => {
    if (!disabled && String(value) !== String(selectedValue)) {
      onChange(value);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (option) => String(option.value) === String(selectedValue)
  );

  return (
    <div
      className={`relative inline-block text-left w-full ${className}`}
      ref={selectRef}
    >
      {label && (
        <label
          htmlFor={buttonId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <button
        id={buttonId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${buttonId}-label ${buttonId}` : buttonId}
        aria-controls={listboxId}
        className={`w-full py-2.5 pl-3 pr-10 text-left text-sm relative 
          ${
            disabled
              ? 'cursor-not-allowed text-gray-200 border-b border-b-gray-100'
              : 'cursor-pointer text-gray-700'
          } 
          ${buttonStyle} 
          ${
            isOpen && !disabled
              ? 'border-b-2 border-b-blue-900'
              : 'border-b border-b-disabled'
          }`}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && !disabled && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white shadow-lg focus:outline-none text-sm"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={String(selectedValue) === String(option.value)}
              className={`cursor-pointer select-none py-2.5 pl-3 pr-4 hover:bg-gray-100 text-gray-400 hover:text-gray-800 ${
                String(selectedValue) === String(option.value)
                  ? 'bg-gray-50'
                  : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <span
                className={`block truncate ${
                  String(selectedValue) === String(option.value)
                    ? 'font-medium'
                    : 'font-normal'
                }`}
              >
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
