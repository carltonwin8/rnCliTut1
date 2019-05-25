/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";

import ListItem, { Seperator } from "./ListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const useSwapiPeople = () => {
  const [people, peopleSet] = useState([]);
  const [loading, loadingSet] = useState(true);
  const [page, pageSet] = useState(1);

  getPeople = async () => {
    loadingSet(true);
    const res = await fetch(`https://swapi.co/api/people?page=${page}`);
    const json = await res.json();
    peopleSet(prevPeople => [...prevPeople, ...json.results]);
    loadingSet(false);
  };

  useEffect(() => getPeople() && undefined, [page]);

  loadMore = () => pageSet(page => page + 1);

  return { people, loading, loadMore };
};

export default props => {
  const { people, loading, loadMore } = useSwapiPeople();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onSwipeFromLeft={() => alert("swipe from left")}
            onRightPress={() => alert("pressed right")}
          />
        )}
        ItemSeparatorComponent={() => <Seperator />}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator />
          ) : (
            <Button title="Load More" onPress={loadMore} />
          )
        }
      />
    </SafeAreaView>
  );
};
