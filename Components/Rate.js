import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    const renderStars = () => {
        let stars = [];

        // Render filled stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(<Star key={i} filled />);
        }

        // Render remaining stars
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={filledStars + i} />);
        }

        return stars;
    };

    return <View style={styles.container}>{renderStars()}</View>;
};

const Star = ({ filled }) => {
    return (
        <FontAwesome
            name={filled ? 'star' : 'star-o'}
            style={filled ? styles.starFilled : styles.starEmpty}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    starFilled: {
        color: '#EDB016',
        fontSize: 14,
        marginLeft: 5,
        // You can customize the filled star style here
    },
    starEmpty: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 5,
        // You can customize the empty star style here


    },
});

export default StarRating;


