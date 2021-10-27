import {useState} from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import {withRouter, useHistory} from 'react-router-dom';

import './searchForm.scss';

const SearchForm = () => {

    const [searchChar, setSearchChar] = useState('');
    const [findMessage, setFindMessage] = useState('')
    const {getCharByName, loading, error} = useMarvelService();
    let classFoundRed = 'mar-top red';
    let classFoundGreen = 'mar-top green';

    const history = useHistory();

    const errorMesage = error ? <div><ErrorMessage/></div> : null;

    return (
        <>
            <Formik
                initialValues={{name: ''}}
                validationSchema={Yup.object({
                    name: Yup.string()
                            .min(3, 'Минимум 3 символа')
                            .required('Введите имя персонажа')
                })}
                onSubmit = {values => {
                    setSearchChar('')
                    let str = values.name.trim().replace(' ', '%20')
                    getCharByName(str.toUpperCase())
                        .then(char => {
                            if(char.data.count > 0) {
                                setSearchChar(() => char.data.results[0]);
                                setFindMessage(`There is! visit ${char.data.results[0].name} page`);

                                history.push(char.data.results[0].id)
                            } else {
                                setFindMessage('The character was not found');

                            }
                        })
                }}
                >
                <div className='search'>
                    <h3>Or find a character by name:</h3>
                    <Form className='search__form'>
                        <Field className='search__input' type="text" name='name'/>
                        <button className='search__button' type='submit'>
                            <div className='search__button-inner'>Find</div>
                        </button>
                    </Form>
                    <FormikErrorMessage className='search__error' name='name' component='div'/>
                    <div className='search__result'>
                    {findMessage ? <div className={searchChar ? classFoundGreen : classFoundRed}>{findMessage}</div> : null}

                    {searchChar ? <button className='search__button btn__gray' type='submit' onClick={() => {history.push(`char/${searchChar.id}`)}}>
                                    <div className='search__button-inner btn-inner__gray'>Page</div>
                                </button> : null}
                    </div>
                </div>
            </Formik>
        {errorMesage}
        </>
    )
}

export default withRouter(SearchForm);