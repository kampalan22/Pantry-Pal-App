import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border rounded-lg shadow-sm 
            placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;