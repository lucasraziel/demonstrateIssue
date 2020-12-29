import React, {useState, useCallback} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<Array<React.ReactElement>>([
    <View key="Old item">
      <Text>First Item</Text>
    </View>,
  ]);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const novoItem = (
        <View key={`new item ${items.length}`}>
          <Text>Another item {items.length}</Text>
        </View>
      );
      setItems((oldState) => [...oldState, novoItem]);
      setRefreshing(false);
    }, 1500);
  }, [items.length]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList<React.ReactElement>
        refreshing={refreshing}
        style={{flex: 1}}
        onRefresh={() => handleRefresh()}
        data={items}
        renderItem={({item}) => item}
      />
    </SafeAreaView>
  );
};

export default App;
