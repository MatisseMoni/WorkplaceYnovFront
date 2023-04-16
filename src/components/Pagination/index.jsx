import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pagination ({totalPostes, postsPerPage = 20 }) {

    const nbPages = Math.ceil(totalPostes / postsPerPage);
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search)
    const actualPage = parseInt(queryParams.get("page")) || 1;

    console.log('nbPages', nbPages, 'actualPage', actualPage, 'totalPostes', totalPostes, 'postsPerPage', postsPerPage);

    if (nbPages === 1) return null;
    
    function handlePreviousPage() {
        navigate(`/?page=${actualPage - 1}`)
    }

    function handleNextPage() {
        navigate(`/?page=${actualPage + 1}`)
    }
    
    return (
        <div>
            {actualPage > 1 ? (<button onClick={() => handlePreviousPage()}>Avant</button>) : null}
            {actualPage < nbPages ? (<button onClick={() => handleNextPage()}>Après</button>) : null}
        </div>
    );
}

export default Pagination;