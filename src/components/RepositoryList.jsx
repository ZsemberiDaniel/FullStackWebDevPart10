import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TextInput from './TextInput';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce/lib';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RenderItem = ({ item }) => {
    return <RepositoryItem repository={item} />;
};

const ItemHeader = ({ selectedSorting, setSelectedSorting, filter, setFilter }) => {
    return (
        <View>
            <TextInput onChangeText={(txt) => setFilter(txt)} defaultValue={filter} />
            <Picker
                selectedValue={selectedSorting}
                onValueChange={(itemValue) => {
                    setSelectedSorting(itemValue);
                }}>
                <Picker.Item label="No sorting" value="none" />
                <Picker.Item label="Latest repos" value="latest" />
                <Picker.Item label="Highest rated repos" value="highest" />
                <Picker.Item label="Lowest rated repos" value="lowest" />
            </Picker>
        </View>
    );
};

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const props = this.props;

        return (
            <ItemHeader
                selectedSorting={props.selectedSorting}
                setSelectedSorting={props.setSelectedSorting}
                filter={props.filter}
                setFilter={props.setFilter}
            />
        );
    };

    render() {
        const repositoryNodes = this.props.repositories
            ? this.props.repositories.edges.map((edge) => edge.node)
            : [];

        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={RenderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}
                onEndReached={this.props.onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {
    const [filter, setFilter] = useState('');
    const [debounceFilter] = useDebounce(filter, 500);
    const [selectedSorting, setSelectedSorting] = useState();
    const { repositories, fetchMore } = useRepositories(selectedSorting, debounceFilter);

    const selectedValueChanged = (newVal) => {
        setSelectedSorting(newVal);
    };
    
    const onEndReach = () => {
        console.log('asdasddas');
        fetchMore();
    };

    return <RepositoryListContainer
        repositories={repositories}
        selectedSorting={selectedSorting}
        filter={filter}
        setFilter={setFilter}
        onEndReach={onEndReach}
        setSelectedSorting={selectedValueChanged} />;
};

export default RepositoryList;