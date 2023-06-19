

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Profile = () => {

    const [arr, setArr] = useState([]);
    useEffect(() => {
        axios.get("https://dummyjson.com/products").then(res => {
            console.log(res.data)
            setArr([...res.data.products]);

        })
    }, [])
    console.log(arr)
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile