import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
const RatingStars = ({defaultValue, setter}:{defaultValue:any,setter:any}) => {
    const handleRatingChange = (value:number) => {
        setter(value);
        console.log(value)
    };

    return (
        <Rating
            style={{maxWidth:200}}
            value={defaultValue}
            isRequired
            onChange={handleRatingChange}
        />
    );
};

export default RatingStars;
