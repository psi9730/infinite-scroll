import React, { useRef, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import FeedStore from '../stores/feed';
import ScrapFilter from '../components/ScrapFilter';
import FeedCard from '../components/FeedCard';

interface FeedProps {
    feedStore: FeedStore;
}

const FeedView = ({
    feedStore: {
        fetchPage,
        feeds,
        scrappedFeeds,
        scrappedFeedIds,
        isScrap,
        scrapFeed,
        unScrapFeed,
        changeIsScrap
    }
}: FeedProps) => {
    const lastCardRef = useRef<HTMLInputElement | null>(null);
    const intersectionObserver = new IntersectionObserver(
        (entries, observer_) => {
            const lastCard = entries[0];

            if (lastCard.intersectionRatio > 0) {
                observer_.unobserve(lastCard.target);
                lastCardRef.current = null;

                setTimeout(() => {
                    fetchPage();
                }, 100);
            }
        }
    );

    useEffect(() => {
        if (lastCardRef.current) {
            intersectionObserver.observe(lastCardRef.current);
        }
        return () => intersectionObserver.disconnect();
    });

    const Feeds = feeds.length
        ? feeds.map((feed, idx) => {
              const isScrapped = scrappedFeedIds.indexOf(feed.id) > -1;

              return idx !== feeds.length - 1 ? (
                  <Grid item xs={3} container key={feed.id}>
                      <FeedCard
                          feed={feed}
                          isScrapped={isScrapped}
                          scrapFeed={scrapFeed}
                          unScrapFeed={unScrapFeed}
                      />
                  </Grid>
              ) : (
                  <Grid item xs={3} ref={lastCardRef} container key={feed.id}>
                      <FeedCard
                          feed={feed}
                          isScrapped={isScrapped}
                          scrapFeed={scrapFeed}
                          unScrapFeed={unScrapFeed}
                      />
                  </Grid>
              );
          })
        : null;

    const ScrappedFeeds = scrappedFeeds.length
        ? scrappedFeeds.map(feed => {
              return (
                  <Grid item xs={3} container key={feed.id}>
                      <FeedCard
                          feed={feed}
                          isScrapped
                          unScrapFeed={unScrapFeed}
                          scrapFeed={scrapFeed}
                      />
                  </Grid>
              );
          })
        : null;
    return (
        <Container className="feed_view_container">
            <Grid container>
                <Grid item xs={12} container>
                    <Grid item>
                        <ScrapFilter
                            title="스크랩한 것만 보기"
                            onClick={changeIsScrap}
                            isChecked={isScrap}
                        />
                    </Grid>
                </Grid>
                {isScrap ? ScrappedFeeds : Feeds}
            </Grid>
        </Container>
    );
};

export default inject('feedStore')(observer(FeedView));
