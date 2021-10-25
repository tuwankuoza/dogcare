import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from 'react-native-autocomplete-input';

import { fetchDataAsync } from '../stores/action';

export default function homePage({navigation}) {
  
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const isLoading = useSelector(state => state.isLoading)

  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [popUpSearch, setpopUpSearch] = useState(false)

  const filterSearch = (text) => {
    setQuery(text)
    let result = data.filter(item => {
      if(item.includes(text.toLowerCase())) {
        return item
      }
    })
    setFilteredData(result)
  }

  useEffect(() => {
    dispatch(fetchDataAsync())
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        style={styles.centeredView}
        animationType="slide"
        transparent={false}
        visible={popUpSearch}
        onRequestClose={() => {
          setpopUpSearch(false);
        }}
      >
        <SafeAreaView style={styles.autoComplete}>
          <Text style={styles.title}>Type in your dog breed</Text>
          <Pressable
          onPress={() => {
            setFilteredData([])
            setQuery('')
          }}
          >
            <Text style={styles.clearText}>clear</Text>
          </Pressable>

          <Autocomplete
          placeholder={'Dog Breed'}
          editable={!isLoading}
          data={filteredData}
          value={query}
          onChangeText={(text) => filterSearch(text)}
          flatListProps={{
            keyExtractor: (data) => data,
            renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => {
              setQuery(item)
              setFilteredData([])
            }}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
            ),
          }}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputForm}
          listContainerStyle={styles.listContainerStyle}
          listStyle={styles.listContainerStyle}
          />

          <Pressable
          style={styles.buttonSearchPopUp}
          onPress={() => {
            setpopUpSearch(false)
            navigation.navigate('Detail', {breed: query})
            setQuery('')
          }}
          >
          <Text style={styles.textStyle}>Search</Text>
          </Pressable>
          
          <Pressable
          style={styles.buttonBack}
          onPress={() => {
            setpopUpSearch(false)
            setQuery('')
          }}
          >
          <Text style={styles.textStyle}>Back</Text>
          </Pressable>

        </SafeAreaView>
      </Modal>

      <Text style={styles.title}>Hi, looking for some dog breed information?</Text>
      <Image source={{uri: 'https://ik.imagekit.io/xvfgr2ixls8/undraw_good_doggy_4wfq_Qn3e4WMNH.png?updatedAt=1635138159091'}}
      style={styles.img}
      ></Image>

      <Pressable
        style={styles.buttonSearchPopUp}
        onPress={() => setpopUpSearch(true)}
      >
        <Text style={styles.textStyle}>Search For Dog Breed</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 30
  },
  autoComplete: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center'
  },
  inputContainer: {
    height: 60,
    width: 320,
    borderRadius: 30,
    borderColor: '#FFC163',
    borderWidth: 3
  },
  inputForm: {
    height: 30,
    width: 240,
    borderRadius: 30,
    paddingLeft: 20,
    borderColor: 'transparent',
    top: '6%'
  },
  listContainerStyle: {
    borderColor: 'yellow'
  },
  title: {
    fontSize: 20,
    margin: 25,
    textAlign: 'center'
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFC163',
  },
  clearText: {
    color: '#FFC163',
    textAlign: 'right',
    marginBottom: 5,
    fontSize: 16,
    paddingLeft: '75%'
  },
  buttonSearchPopUp: {
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 200,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: '#FFC163',
  },
  buttonBack: {
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 200,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 3,
    borderColor: '#FFC163',
  },
  textStyle: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  // styling for pop up
  centeredView: {
    flex: 1,
    marginTop: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
})