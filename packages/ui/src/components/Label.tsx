type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  name: string;
  className?: string;
} & React.PropsWithChildren;

export const Label = ({ name, children, className }: LabelProps) => (
  <label htmlFor={name} className={className}>
    {children}
  </label>
);
