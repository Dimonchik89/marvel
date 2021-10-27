import {Link, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Page404 from './404';

import './singleComicPage.scss'

const SinglePage = ({getFunc, ...props}) => {
    const {elemId} = useParams();
    const [elem, setElem] = useState(null);

    const {loading, error, clearError} = useMarvelService();

    useEffect(() => {
        updateElem();
    }, [elemId])

    const updateElem = () => {
        clearError();
        getFunc(elemId)
            .then(onElemLoaded)
    }

    const onElemLoaded = (elem) => {
        setElem(elem);
    }

    const errorMessage = error ? <Page404/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !elem) ? <View elem={elem} info={props}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({elem, info}) => {
    // const {title, description, pageCount, price, thumbnail} = elem;
    const {title, description, pageCount, price, thumbnail} = info;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${elem[title]} comics boot`}
                    />
                <title>{elem[title]}</title>
            </Helmet>
            <img src={elem.thumbnail} alt={elem[title]} className="single-comic__img"/>
            <div className="single-comic__info">
                {title ? <h2 className="single-comic__name">{elem[title]}</h2> : null}
                {description ? <p className="single-comic__descr">{elem.description}</p> : null}
                {pageCount ? <p className="single-comic__descr">{elem.pageCount}</p> : null}
                {price ? <div className="single-comic__price">{elem.price}</div> : null}

                {/* <p className="single-comic__descr">Language: </p> */}
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SinglePage;