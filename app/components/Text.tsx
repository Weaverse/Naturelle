import { missingClass, formatText } from '~/lib/utils';
import clsx from 'clsx';

export function Section({
    as: Component = 'section',
    children,
    className,
    divider = 'none',
    display = 'grid',
    heading,
    padding = 'all',
    ...props
}: {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    divider?: 'none' | 'top' | 'bottom' | 'both';
    display?: 'grid' | 'flex';
    heading?: string;
    padding?: 'x' | 'y' | 'swimlane' | 'all';
    [key: string]: any;
}) {
    const paddings = {
        x: 'px-6 md:px-8 lg:px-12',
        y: 'py-6 md:py-8 lg:py-12',
        swimlane: 'pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8',
        all: 'p-6 md:p-8 lg:p-12',
    };

    const dividers = {
        none: 'border-none',
        top: 'border-t border-bar/05',
        bottom: 'border-b border-bar/05',
        both: 'border-y border-bar/05',
    };

    const displays = {
        flex: 'flex',
        grid: 'grid',
    };

    const styles = clsx(
        'w-full gap-4 md:gap-8',
        displays[display],
        missingClass(className, '\\mp[xy]?-') && paddings[padding],
        dividers[divider],
        className,
    );

    return (
        <Component {...props} className={styles}>
            {heading && (
                <Heading size="lead" className={padding === 'y' ? paddings['x'] : ''}>
                    {heading}
                </Heading>
            )}
            {children}
        </Component>
    );
}

export function Heading({
    as: Component = 'h2',
    children,
    className = '',
    format,
    size = 'heading',
    width = 'default',
    ...props
}: {
    as?: React.ElementType;
    children: React.ReactNode;
    format?: boolean;
    size?: 'display' | 'heading' | 'lead' | 'copy';
    width?: 'default' | 'narrow' | 'wide';
} & React.HTMLAttributes<HTMLHeadingElement>) {
    const sizes = {
        display: 'font-bold text-4xl',
        heading: 'font-bold text-2xl leading-tight',
        lead: 'font-bold text-lg leading-snug',
        copy: 'font-medium text-base leading-normal',
    };

    const widths = {
        default: 'max-w-prose',
        narrow: 'max-w-prose-narrow',
        wide: 'max-w-prose-wide',
    };

    const styles = clsx(
        missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
        missingClass(className, 'max-w-') && widths[width],
        missingClass(className, 'font-') && sizes[size],
        className,
    );

    return (
        <Component {...props} className={styles}>
            {format ? formatText(children) : children}
        </Component>
    );
}

export function PageHeader({
    children,
    className,
    heading,
    variant = 'default',
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    heading?: string;
    variant?: 'default' | 'blogPost' | 'allCollections';
    [key: string]: any;
}) {
    const variants: Record<string, string> = {
        default: 'grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start',
        blogPost:
            'grid md:text-center w-full gap-4 p-6 py-8 md:p-8 lg:p-12 md:justify-items-center',
        allCollections:
            'flex justify-between items-baseline gap-8 p-6 md:p-8 lg:p-12',
    };

    const styles = clsx(variants[variant], className);

    return (
        <header {...props} className={styles}>
            {heading && (
                <Heading as="h1" width="narrow" size="heading" className="inline-block">
                    {heading}
                </Heading>
            )}
            {children}
        </header>
    );
}