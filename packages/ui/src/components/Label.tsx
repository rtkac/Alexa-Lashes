type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  name: string;
  className?: string;
} & React.PropsWithChildren;

export const Label = ({ name, htmlFor, children, className, ...props }: LabelProps) => (
  <label htmlFor={htmlFor ?? name} className={className} {...props}>
    {children}
  </label>
);
