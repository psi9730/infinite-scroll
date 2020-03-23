/* eslint-disable prettier/prettier */
import { observable, action, computed, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import { REST_API_URL } from '../config/constant';

interface Feed {
    id: number;
    image_url: string;
    nickname: string;
    profile_image_url: string;
};

export default class FeedStore {
    @persist @observable isScrap: boolean;

    @observable isFetching: boolean;

    @observable feeds: Array<Feed>;

    @persist('list') @observable scrappedFeeds: Array<Feed>;

    page: number;

    constructor() {
        this.isScrap = false;
        this.isFetching = true;
        this.feeds = [];
        this.scrappedFeeds = [];
        this.page = 1;
        this.fetchPage();
    }

    fetchFeeds = async (page: number) => {
        const url = `${REST_API_URL}page_${page}.json`;
        try {
            const response = await fetch(url);
            if (response.status >= 400) {
                return [];
            }
            return response.json();
        } catch (err) {
            return [];
        }
    };

    @computed get scrappedFeedIds() {
        return this.scrappedFeeds.map((feed: Feed) => feed.id);
    }

    @action('fetch Page')
    fetchPage = async () => {
        this.isFetching = true;
        if (this.isFetching) {
            const feeds = await this.fetchFeeds(this.page);
            runInAction("Update State after fetching Github's Data", () => {
                    this.feeds = this.feeds.concat(feeds);
                    this.page += 1;
                    this.isFetching = false;
            });
        }
    };

    @action('scrap Feed')
    scrapFeed = (feed: Feed) => {
        this.scrappedFeeds.push(feed);
    };

    @action('scrap unScrapFeed')
    unScrapFeed = (feed: Feed) => {
        const idx = this.scrappedFeeds.findIndex(item => {
            return item.id === feed.id;
        });

        this.scrappedFeeds.splice(idx, 1);
    };

    @action('change scrap filter')
    changeIsScrap = (): void => {
        this.isScrap = !this.isScrap;
    };
}
