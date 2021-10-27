import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.css';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [comicsOffset, setComicsOffset] = useState(200);
    const [disabled, setDisabled] = useState(false)

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        createComicsList(comicsOffset);
    }, [])

    const createComicsList = (comicsOffset) => {
        setDisabled(true)
        getAllComics(comicsOffset)
            .then(data => {
                setComics(comics => [...comics, ...data])
                setComicsOffset(comicsOffset => comicsOffset + 8)
                setDisabled(false)
            })
    }

    const spinner = loading ? <Spinner/> : null;
    const errMesage = error ? <ErrorMessage/> : null;
    const content = comics ? <CreateComicsCart comics={comics}/> : null;

    return (
        <>
            <ul className="comics__wrapper">
                {spinner}
                {content}
                {errMesage}
            </ul>
            <button
                className="button button__main button__long"
                onClick={createComicsList}
                disabled={disabled}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

const CreateComicsCart = (props) => {
    const {comics} = props;

    if(!comics.length === 0) {
        return null
    }
    const arrComics = comics.map(item => (
        <li className="comics__item" key={item.id}>
            <Link to={`/comics/${item.id}`}>
                <img className='comics__img' src={item.thumbnail} alt="" />
                <h3>{item.title}</h3>
                <span>{item.price}</span>
            </Link>
        </li>
    ))
    return arrComics
}

export default ComicsList;