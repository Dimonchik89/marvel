import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset,  setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {

        // const {logger, secondLog} = await import ('./someFunc');
        // logger();
        // secondLog()

        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const cartArr = useRef([]);

    const selectCart = (i) => {
        cartArr.current.forEach(item => item.classList.remove('char__item_selected'));
        cartArr.current[i].classList.add('char__item_selected');
        cartArr.current[i].focus();
    }

    function renderItems(charList) {
        const charItem = charList.map((item, i) => {
            const {id, thumbnail, name} = item;
            return (
                <li
                    ref={el => cartArr.current[i] = el}
                    className="char__item"
                    key={id}
                    onClick={() => {
                        props.onCharSelected(id);
                        selectCart(i);
                    }
                    }
                    tabIndex='0'>
                    <img src={thumbnail} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return charItem
    }

    const items = renderItems(charList)

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    // if(loading) {
    //     import('./someFunc')
    //         .then(obj => obj.default())
    //         .catch()
    // }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {spinner}
                {errorMessage}
                {items}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )


}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;