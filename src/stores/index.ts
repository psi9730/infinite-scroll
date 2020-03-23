/* eslint-disable no-underscore-dangle */
import { create } from 'mobx-persist';
import FeedStore from './feed';

class RootStore {
    feedStore: object;

    constructor() {
        this.feedStore = new FeedStore();
        const hydrate = create({
            jsonify: true // if you use AsyncStorage, here shoud be true
        });
        const initialState = {
            obj: { a: 2, b: 1 }
        };
        hydrate('feed', this.feedStore, initialState).then(() => {});
    }
}

export default RootStore;
