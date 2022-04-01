import React from 'react'

const ChirpCard = ({id, username, userid, content, posttime, handleDeleteChirp, handlePutChirp}) => {
    return (
        <>
            <h3>{username}</h3>
            <p>{content}</p>
            <small>{posttime}</small>
            <button onClick={() => handleDeleteChirp(id)}>
                Delete
            </button>
            <button onClick={() => handlePutChirp(id, userid, location)}>
                Edit
            </button>
        </>
    )
}

export default ChirpCard;