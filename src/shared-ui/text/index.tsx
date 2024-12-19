import React from 'react';

// Define the types for the variants and the props
type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'small'
  | 'medium'
  | 'extra-small';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType; // Allows any valid HTML element or component
  variant?: TextVariant; // Specify the variant type
  children: React.ReactNode; // Children must be valid React nodes
}

const Text: React.FC<TextProps> = ({
  as: Component = 'span', // Default to 'span'
  variant = 'medium', // Default variant
  children,
  className,
  ...props
}) => {
  const variants: Record<TextVariant, string> = {
    h1: 'lg:text-[68px] xs:text-[24px] font-[500]',
    h2: 'text-[32px] font-[500]',
    h3: 'text-5xl font-semibold mb-2',
    h4: 'text-4xl font-semibold mb-2',
    h5: 'text-3xl font-semibold mb-2',
    h6: 'text-2xl font-[500] mb-1 ',
    body: 'text-[24px] mb-2 font-[500]',
    medium: 'text-[20px] font-[500]  mb-2',
    small: 'text-[16px] text-dark-2',
    'extra-small': 'text-[14px] text-dark-2',
  };

  // Combine variant classes with any additional classes passed via className
  const variantClass = variants[variant] || variants.body;

  return (
    <Component
      className={`text-primary-text  ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
