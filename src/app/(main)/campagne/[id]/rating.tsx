'use client'
import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
const RatingStars = ({defaultValue, setter,readonly,maxWidth}:{defaultValue:any,setter?:any,readonly?:boolean,maxWidth?:number}) => {
    const handleRatingChange = (value:number) => {
        setter(value);
    };

    return (
        <Rating
            readOnly={readonly}
            style={{maxWidth:maxWidth ?? 200}}
            value={defaultValue}
            isRequired
            onChange={handleRatingChange}
        />
    );
};

export default RatingStars;
