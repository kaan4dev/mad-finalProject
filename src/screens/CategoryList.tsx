import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';
import { Category } from '../types/ApiTypes';

const CategoryList = ({ navigation }: any) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await apiClient.post('/kategori/search', {});
            console.log('API Response:', response.data);
            setCategories(response.data.resultObject);
        } catch (error) {
            console.error('Kategori alınırken hata:', error);

            // Eğer bir network hatası varsa:
            if (error.response) {
                console.error('Hata durumu:', error.response.status);
                console.error('Hata mesajı:', error.response.data.message);
            } else if (error.request) {
                console.error('API yanıt vermedi:', error.request);
            } else {
                console.error('Hata:', error.message);
            }
        }
    };

    const renderCategory = ({ item }: { item: Category }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('DetailList', { categoryId: item.id })}
            >
                <Text style={styles.title}>{item.adi}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategory}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategoryList;