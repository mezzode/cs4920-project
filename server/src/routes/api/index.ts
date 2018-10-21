import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import { HandlerError } from '../../helpers/error';
import {
    animeFetchID,
    animeFetchSearch,
    gameFetchID,
    gameFetchSearch,
    movietvFetchID,
    movietvSearch,
    MovieTvType,
} from './mediaapi';

const router = express.Router();

// FIXME: Switch to GET
router.post('/search/movie', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await movietvSearch(searchString, MovieTvType.Movie, pageNumber));
});

router.post('/search/tv', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await movietvSearch(searchString, MovieTvType.TV, pageNumber));
});

router.post('/search/game', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await gameFetchSearch(searchString, pageNumber));
});

router.post('/search/anime', async (req, res) => {
    const { searchString, pageNumber } = req.body;
    res.json(await animeFetchSearch(searchString, pageNumber));
});

const getMedia = asyncHandler(async (req, res) => {
    const { mediaType, id } = req.params;

    let media: object | null = null;
    // TODO: use enum from web for mediaType
    switch (mediaType) {
        case 'games':
            media = await gameFetchID(id);
            break;
        case 'shows':
            media = await movietvFetchID(id, MovieTvType.TV);
            break;
        case 'movies':
            media = await movietvFetchID(id, MovieTvType.Movie);
            break;
        case 'anime':
            media = await animeFetchID(id);
            break;
        default:
            throw new HandlerError(`Media type '${mediaType}' not found`, 404);
    }

    res.json(media);
});

router.get('/media/:mediaType/:id', getMedia);

export { router };
