import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';
import { Restaurant } from '../types/ApiTypes';

const DetailList = ({ route }: any) => 
{
    const { categoryId } = route.params;
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => 
    {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => 
    {
        try 
        {
            const response = await apiClient.post('/restoran/search', { kategoriId: categoryId });
            setRestaurants(response.data.data);
        } 
        catch (error) 
        {
            console.error('Restoran alınırken hata:', error);
        }
    };

    const renderRestaurant = ({ item }: { item: Restaurant }) => 
    {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.restoranAdi}</Text>
                <Text>{item.adres}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.restoranId.toString()}
                renderItem={renderRestaurant}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    item: 
    {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: 
    {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DetailList;