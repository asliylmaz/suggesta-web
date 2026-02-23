'use client';

import PageListing from '../../../components/PageListing';
import { useRouter } from 'next/router';

export default function SeriesCategoryPage() {
    const router = useRouter();
    const { category } = router.query;

    if (!category) return null;

    return <PageListing initialType="series" initialCategory={category} />;
}
