import type { AnchorHTMLAttributes } from 'react';
import './ButtonLink.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'ghost' | 'accent';
}

const isExternal = (href?: string) => Boolean(href && /^https?:\/\//.test(href));

/** I link verso altri domini si aprono sempre in una nuova scheda. */
export function ButtonLink({ variant = 'primary', className, ...rest }: Props) {
  const classes = ['button-link', `button-link--${variant}`, className].filter(Boolean).join(' ');
  const external = isExternal(rest.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return <a className={classes} {...external} {...rest} />;
}
