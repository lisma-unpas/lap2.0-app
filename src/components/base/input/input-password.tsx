'use client';

import { useState } from 'react';
import { TextField, InputBase, Label, HintText } from '@/components/base/input/input';
import { Eye, EyeOff } from '@untitledui/icons';

interface PasswordInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    isInvalid?: boolean;
    isRequired?: boolean;
    hideRequiredIndicator?: boolean;
    size?: 'sm' | 'md';
    minLength?: number;
    pattern?: string;
    name?: string;
    hint?: string;
    autoComplete?: string;
}

export const PasswordInput = ({
    label = 'Password',
    placeholder = '••••••••',
    value,
    onChange,
    onBlur,
    isInvalid,
    isRequired,
    hideRequiredIndicator,
    size = 'md',
    minLength,
    pattern,
    name,
    hint,
    autoComplete = 'current-password',
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            {...{ label, isInvalid, isRequired, size, hint, name }}
            autoComplete={autoComplete}
        >
            {({ isRequired, isInvalid }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>
                            {label}
                        </Label>
                    )}

                    <div className="relative w-full">
                        <InputBase
                            type={showPassword ? 'text' : 'password'}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={isInvalid}
                            size={size}
                            minLength={minLength}
                            pattern={pattern}
                            name={name}
                            autoComplete={autoComplete}
                            inputClassName="pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                    </div>

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};
