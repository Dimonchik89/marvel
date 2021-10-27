import ErrorMessage from '../errorMessage/errorMessage';
import {Link, useParams, useHistory, useLocation} from 'react-router-dom';

const Page404 = () => {
    const {comicId} = useParams();
    const history = useHistory();
    const location = useLocation();


    const back = () => {
        const newUrl = location.pathname.replace(comicId, '');
        history.goBack();
    }

    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to='/'
                onClick={back}>Back to main page</Link>
        </div>
    )
}

export default Page404;