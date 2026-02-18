
import api from "./api";

export const getMoviesByGenre = async (genreId, page = 1) => {
    const { data } = await api.get(`/tmdb/genre/${genreId}`, {
        params: { page }
    });
    return data;
};

export const getPopularMovies = async (page = 1) => {
    const { data } = await api.get("/tmdb/movie/popular", {
        params: { page }
    });
    return data;
};

export const getNowPlayingMovies = async (page = 1) => {
    const { data } = await api.get("/tmdb/movie/now-playing", {
        params: { page }
    });
    return data;
};

export const getMovieImages = async (id) => {
    const { data } = await api.get(`/tmdb/movie/${id}/images`);
    return data;
};

export const getPopularSeries = async (page = 1) => {
    const { data } = await api.get("/tmdb/tv/popular", {
        params: { page }
    });
    return data;
};

export const getMovieDetails = async (id) => {
    const { data } = await api.get(`/tmdb/movie/${id}`);
    return data;
};

export const getTvDetails = async (id) => {
    const { data } = await api.get(`/tmdb/tv/${id}`);
    return data;
};

export const getSeriesImages = async (id) => {
    const { data } = await api.get(`/tmdb/tv/${id}/images`);
    return data;
};