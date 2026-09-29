import type { AnchorHTMLAttributes } from 'react';
import './ButtonLink.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'ghost' | 'accent';
}

export function ButtonLink({ variant = 'primary', className, ...rest }: Props) {
  const classes = ['button-link', `button-link--${variant}`, className].filter(Boolean).join(' ');
  return <a className={classes} {...rest} />;
}
