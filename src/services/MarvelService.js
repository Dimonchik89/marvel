import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKye = 'apikey=37d6161b56119f69ed8af20b48dceabb';
    const _baseOffset = 210;
    const _comicsOffset = 200;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKye}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKye}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharByName = async(name) => {
        const char = await request(`${_apiBase}characters?name=${name}&${_apiKye}`);
        return await char;
    }

    const getAllComics = async (comicsOffset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${comicsOffset}&${_apiKye}`);
        return await res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKye}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Нет данных по этому персонажу',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (res) => {
        return {
            id: res.id,
            title: res.title,
            pageCount: res.pageCount ? `${res.pageCount}.pages` : 'No information about number of page',
            description: res.description || 'There is no description',
            price: res.prices[0].price ? res.prices[0].price : 'not avaliables',
            // language: res.textObject.language || 'en-us',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharByName};
}

export default useMarvelService;