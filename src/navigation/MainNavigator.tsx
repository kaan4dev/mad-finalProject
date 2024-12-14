import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryList from '../screens/CategoryList'; 
import DetailList from '../screens/DetailList';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CategoryList">
                <Stack.Screen 
                    name="CategoryList" 
                    component={CategoryList} 
                    options={{ title: 'Kategoriler' }} 
                />
                <Stack.Screen 
                    name="DetailList" 
                    component={DetailList} 
                    options={{ title: 'Detaylar' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;