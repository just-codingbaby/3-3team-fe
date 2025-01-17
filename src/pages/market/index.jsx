import { Fragment, useState } from 'react';

import { dehydrate, HydrationBoundary, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import PageHeader from '@/components/market/PageHeader';
import { ProductCard } from '@/components/market/ProductCard';
import { Button } from '@/components/ui/button';

const PAGE_LIMIT = 6;

async function fetchCards(pageParam) {
  const query = new URLSearchParams({ page: pageParam, limit: PAGE_LIMIT });
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/shop/cards?' + query.toString(),
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 1 }) => fetchCards(pageParam),
    initialPageParam: 1,
  });
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function MarketPage({ dehydratedState }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOptionKey, setSortOptionKey] = useState('LATEST');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 1 }) => fetchCards(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length === PAGE_LIMIT ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  if (status === 'pending') return <div>Loading...</div>;

  if (status === 'error') return <div>Error fetching posts</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="mx-auto px-[15px] pb-20 tb:container tb:px-5">
        <PageHeader {...{ sortOptionKey, setSortOptionKey }} />
        <section>
          {
            <div className="grid grid-cols-2 gap-[5px] tb:gap-5 lt:grid-cols-3 lt:gap-20">
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.map((card) => (
                    <Link
                      href={`/market/${card.id}`}
                      key={card.id}
                      className="block"
                      aria-label={`${card.name} 카드 상세보기`}
                    >
                      <ProductCard cardProps={card} />
                    </Link>
                  ))}
                </Fragment>
              ))}
              <Button
                variant="outline"
                className="col-span-2 my-6 lt:col-span-1 lt:col-start-2"
                onClick={() => fetchNextPage()}
                aria-busy={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <p>Loading more...</p>
                  </>
                ) : hasNextPage ? (
                  <p>Load More</p>
                ) : (
                  <p>Nothing more to load</p>
                )}
              </Button>
            </div>
          }
        </section>
      </article>
    </HydrationBoundary>
  );
}