import React from 'react';

export default function Alert(props) {
    const handleClose = () => {
        props.flashMessage(null, null);
    }

    return (
        <div className={`alert alert-${ props.category } alert-dismissible fade show`} role="alert">
            { props.message }
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ handleClose }></button>
        </div>
    );
}