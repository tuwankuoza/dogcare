import React, { useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { fetchSubDataAsync, fetchImageAsync } from '../stores/action'

export default function detailPage({route, navigation}) {
  const { breed } = route.params

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.isLoading)
  const subData = useSelector(state => state.subData)
  const imageData = useSelector(state => state.imageData)

  const [page, setPage] = useState(1)
  const [slicedData, setSlicedData] = useState([])
  const [maxPage, setMaxpage] = useState(0)

  const pagedData = () => {
    if(imageData) {
      let result = imageData.slice(((page * 5) - 5), ((page * 5) - 1))
      setSlicedData(result)
    }
  }

  const maxPagePerData = () => {
    if(imageData) {
      let numPage = Math.ceil((imageData.length -1)/5)
      setMaxpage(numPage)
    }
  }
  console.log(slicedData[0])
  useEffect(() => {
    console.log(breed, '<<<<<<<<<<<<<<<<<<<<')
    dispatch(fetchImageAsync(breed))
    dispatch(fetchSubDataAsync(breed))
    pagedData()
    maxPagePerData()
  }, [])

  if(isLoading) {
    return <Text>{JSON.stringify(isLoading)}</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>"{breed}"</Text>
      {
        subData.length > 0 ?
        <Text style={styles.subBreed}>{subData?.join(', ')}</Text>
        : <></>
      }
      <ScrollView style={styles.scrView}>
        {
          slicedData?.map(img => {
            return (
              <Image source={{uri: img}} style={styles.listImage} key={img}>
              </Image>
            )
          })
        }
        <Text style={styles.pageNum}>Page {page}</Text>
        <View style={styles.buttonRow}>
          {
            page > 1 ?
            
            <Pressable
            style={styles.buttonPrev}
            onPress={async() => {
              pagedData()
              setPage(page - 1)
            }}
            >
            <Text style={styles.textStyle}>Previous</Text>
            </Pressable>

            : <></>
            
          }
          {
            page + 1 <= maxPage ?
            <Pressable
            style={styles.buttonNext}
            onPress={() => {
              pagedData()
              setPage(page + 1)
            }}
            >
            <Text style={styles.textStyle}>Next</Text>
            </Pressable>
            : <></>
          }

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFC163'
  },
  subBreed: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrView: {
    width: '100%',
    height: '100%',
  },
  listImage: {
    height: 200,
    width: 300,
    borderRadius: 30,
    margin: 10,
    borderWidth: 3,
    borderColor: '#FFC163',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonRow: {
    flexDirection: 'row'
  },
  buttonNext: {
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 120,
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 10,
    backgroundColor: '#FFC163',
  },
  buttonPrev: {
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    width: 120,
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 10,
    borderWidth: 3,
    borderColor: '#FFC163',
  },
  textStyle: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pageNum: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black',
    fontWeight: 'bold'
  }
})
