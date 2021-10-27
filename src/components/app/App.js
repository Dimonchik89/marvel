import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

// import {MainPage, ComicsPage, SingleComicPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));


const App = () => {

    const {getCharacter, getComic} = useMarvelService();

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path='/'>
                                <MainPage/>
                            </Route>
                            <Route exact path='/comics'>
                                <ComicsPage/>
                            </Route>
                            <Route exact path='/comics/:elemId'>
                                {/* <SingleComicPage/> */}
                                <SinglePage getFunc={getComic} title='title' description='description' thumbnail='thumbnail' pageCount='pageCount' price='price'/>
                            </Route>
                            <Route exact path='/char/:elemId'>
                                <SinglePage getFunc={getCharacter} title='name' description='description' thumbnail='thumbnail'/>
                            </Route>
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )


}

export default App;