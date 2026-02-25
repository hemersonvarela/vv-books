import { Link } from '@inertiajs/react';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-1">
            {links.map((link, key) => (
                <Link
                    key={key}
                    href={link.url ?? '#'}
                    className={`rounded border px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                        link.active ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white text-gray-700'
                    } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
