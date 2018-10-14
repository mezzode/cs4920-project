import * as express from 'express';

import {
    animeFetchSearch,
    gameFetchSearch,
    movietvSearch,
    MovieTvType,
} from './mediaapi';

const router = express.Router();

router.post('/movie', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await movietvSearch(searchString, MovieTvType.Movie, pageNumber));
});

router.post('/tv', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await movietvSearch(searchString, MovieTvType.TV, pageNumber));
});

router.post('/game', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await gameFetchSearch(searchString, pageNumber));
});

router.post('/anime', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await animeFetchSearch(searchString, pageNumber));
});

export { router };
