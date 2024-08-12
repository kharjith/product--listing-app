import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [previousFavoriteState, setPreviousFavoriteState] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${
          (page - 1) * 10
        }&limit=10`
      );
      const data = await response.json();

      const formattedData = data.map((item) => {
        return {
          ...item,
          images: item.images.map((img) => img.replace(/["\[\]]/g, '')),
          isFavorite: false,
        };
      });

      if (formattedData.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...formattedData]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      );
      return updatedProducts;
    });
  };

  const handleFavoritePress = (id) => {
    const product = products.find((product) => product.id === id);
    setPreviousFavoriteState(product.isFavorite);

    toggleFavorite(id);

    Showalert(id);
  };

  const Showalert = (id) => {
    Alert.alert('Added to Favourites', '', [
      {
        text: 'Cancel',
        onPress: () => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === id
                ? { ...product, isFavorite: previousFavoriteState }
                : product
            )
          );
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`$${item.price}`}</Text>
        <TouchableOpacity onPress={() => handleFavoritePress(item.id)}>
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? 'red' : 'grey'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#acaaa7" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('EnterScreen')}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
        Featured Products
      </Text>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        )}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#acaaa7',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#acaaa7',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
