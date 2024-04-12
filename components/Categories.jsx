import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   sanityClient.fetch(`
  //     *[_type == "category"]
  //   `).then(data => {
  //     setCategories(data)
  //   })
  // }, [])
  // console.log(categories)
  const hhh = 'data:image/webp;base64,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'


  return (
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={{paddingHorizontal: 15, paddingTop: 10}}
    >
        {/* categorycard */}

      {/* {categories?.map((category) => ( */}
        <CategoryCard 
        // key={category._id}
        imageUri={hhh} 
        title={"category.name"}
        />
      {/* ))} */}


    </ScrollView>
  )
}

export default Categories