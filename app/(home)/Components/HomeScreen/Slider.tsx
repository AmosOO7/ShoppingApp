import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, Image } from "react-native";

export default function Slider(prop: any) {
  const flatListRef = useRef<FlatList>(null); // Reference for the FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide
  const { sliderList } = prop;

  useEffect(() => {
    // Timer to auto-scroll
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= sliderList.length) {
        nextIndex = 0; // Reset to the first slide
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * 344, // Adjust the offset based on image width
        animated: true,
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [currentIndex, sliderList.length]);

  return (
    <View className="mt-5 pl-1 pr-1  ">
      <FlatList
        ref={flatListRef} // Attach ref to FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.image }}
              className="h-[150px] w-[350px] mr-2 ml-2 object-contain rounded-lg"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
