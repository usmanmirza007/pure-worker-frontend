import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {useDispatch} from 'react-redux';
import SubCategoryItem from './SubCategoryItem2';
import TextWrapper from './TextWrapper';
import images from '../constants/images';
import {useGetSubCategoriesQuery} from '../store/slice/api';
import colors from '../constants/colors';
import {generalStyles} from '../constants/generalStyles';

type SubCategoryListPRops = {
  categoryName: string;
  catId: number;
};

const CategoryList = ({categoryName, catId}: SubCategoryListPRops) => {
  const [collapseState, setCollapseState] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {
    data: getSubCategoryData,
    isLoading,
    isError,
  } = useGetSubCategoriesQuery({categoryId: catId});
  const getSubCategory = getSubCategoryData ?? [];

  return (
    <View style={{}}>
      <Collapse
        onToggle={() => {
          if (!dataLoaded) {
            setDataLoaded(true);
          }
          setCollapseState(!collapseState);
        }}
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <CollapseHeader
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.lightBlack,
            marginVertical: 10,
            borderRadius: 5,
            height: 35,
            width: '95%',
            borderColor: colors.primary,
            borderWidth: 2,
            paddingHorizontal: 15,
          }}>
          <View style={{}}>
            <TextWrapper
              fontType={'semiBold'}
              style={{
                fontSize: 14,
                color: '#fff',
              }}>
              {categoryName}
            </TextWrapper>
          </View>
          {collapseState ? (
            <Image
              source={images.polygonDown}
              resizeMode={'contain'}
              style={{width: 15, height: 15}}
            />
          ) : (
            <Image
              source={images.polygonForward}
              resizeMode={'contain'}
              style={{width: 15, height: 15}}
            />
          )}
          <TextWrapper
            fontType={'semiBold'}
            style={{
              fontSize: 35,
              color: '#D20713',
              position: 'absolute',
              right: -25,
            }}>
            {/* {'*'} */}
          </TextWrapper>
        </CollapseHeader>
        <CollapseBody>
          {getSubCategory && (
            <View
              style={{
                borderColor: colors.primary,
                backgroundColor: colors.lightBlack,
                borderWidth: 2,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '95%',
              }}>
              {getSubCategory.map((item: any, index: number) => {
                var offerStyle;
                if (index > 0) {
                  offerStyle = {marginBottom: 25};
                }
                return (
                  <SubCategoryItem
                    style={{}}
                    key={index}
                    itemDetail={item}
                    catId={catId}
                    index={index}
                  />
                );
              })}
            </View>
          )}
        </CollapseBody>
      </Collapse>
    </View>
  );
};
export default CategoryList;
