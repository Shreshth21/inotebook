import React from 'react'

const Alert = (props) => {

    const capitalize = (word) =>{
        if (word === "danger") {
            return 'Error';
        }
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    return (
        <div style={{ height: '65px' }}>
            {
                props.alert &&
                <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show role="alert"`}>
                    <strong>{capitalize(props.alert.alertType) + ": " + props.alert.msg}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
        </div>
    )
}

export default Alert
