import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import images from '../../constants/images';
import TextInputs from '../../components/TextInput2';
import tw from 'twrnc';
import Textcomp from '../../components/Textcomp';
import {perHeight, perWidth} from '../../utils/position/sizes';
import colors from '../../constants/colors';
import ServiceCard from '../../components/cards/serviceCard';
import ClosetoYou from '../../components/cards/closeToYou';
import CategoryList2 from '../../components/CategoryList2';
import commonStyle from '../../constants/commonStyle';
import {useGetCategoryQuery} from '../../store/slice/api';

const Home = ({navigation}: any) => {
  //   const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 4'},
    {id: '5', title: 'Item 5'},
  ];
  const {data: getCategoryData, isLoading, isError} = useGetCategoryQuery();
  const getCategory = getCategoryData ?? [];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EBEBEB'}}>
      <View style={[{flex: 1, backgroundColor: '#EBEBEB'}]}>
        <ScrollView>
          <View
            style={[
              tw`items-center justify-center`,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              },
            ]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={images.profile}
                style={{height: 40, width: 40}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TextInputs
              style={{marginTop: 10, width: '70%'}}
              labelText={'Search'}
              state={search}
              setState={setSearch}
              icon={
                <Image
                  resizeMode="contain"
                  source={images.search}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: '#000413',
                    marginLeft: 5,
                  }}
                />
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                width: 40,
                height: 40,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.question}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              tw``,
              {marginLeft: perWidth(18), marginTop: perHeight(28)},
            ]}>
            <Textcomp
              text={'Welcome Vendor, '}
              size={17}
              lineHeight={17}
              color={'#000413'}
              fontFamily={'Inter-SemiBold'}
            />
          </View>
          {/* Popular Section */}
          <View
            style={[
              tw``,
              {marginLeft: perWidth(18), marginTop: perHeight(22)},
            ]}>
            <Textcomp
              text={'Popular services'}
              size={25}
              lineHeight={28}
              color={'#000413'}
              fontFamily={'Inter-Medium'}
            />
          </View>

          {/* <View
            style={[
              tw`ml-4 mt-4 border-[#FFC727]`,
              {
                height: perWidth(130),
                width: perWidth(150),
                borderWidth: 3,
                borderRadius: 20,
              },
            ]}>
            <Image
              resizeMode="cover"
              style={{
                width: perWidth(145),
                height: '65%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              source={images.welcome}
            />
            <View
              style={[
                tw`bg-[${colors.darkPurple}] flex-1`,
                {borderBottomLeftRadius: 20, borderBottomRightRadius: 20},
              ]}>
              <View style={[tw``, {marginLeft: 10, marginTop: perHeight(6)}]}>
                <Textcomp
                  text={'Plumbing'}
                  size={12}
                  lineHeight={14}
                  color={colors.white}
                  fontFamily={'Inter-SemiBold'}
                />
              </View>
            </View>
          </View> */}

          <View style={{flex: 1}}>
            <FlatList
              data={data}
              horizontal={true}
              renderItem={(item: any) => {
                return <ServiceCard item={item.item} index={item.index} />;
              }}
              keyExtractor={item => item.id}
            />
          </View>

          {/*Close to You Section */}
          <View
            style={[
              tw`flex flex-row items-center justify-between`,
              {marginLeft: perWidth(24), marginTop: perHeight(52)},
            ]}>
            <View style={[tw``]}>
              <Textcomp
                text={'Close to you'}
                size={25}
                lineHeight={28}
                color={'#000413'}
                fontFamily={'Inter-Medium'}
              />
            </View>

            <TouchableOpacity style={[tw`mr-4`]}>
              <Textcomp
                text={'See All'}
                size={14}
                lineHeight={16}
                color={'#000413'}
                fontFamily={'Inter-Medium'}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <FlatList
              data={data}
              horizontal={true}
              renderItem={(item: any) => {
                return <ClosetoYou item={item.item} index={item.index} />;
              }}
              keyExtractor={item => item.id}
            />
          </View>

          {/* Service Ctagories */}
          <View>
            <View
              style={[
                tw`flex flex-row items-center justify-between`,
                {marginLeft: perWidth(24), marginTop: perHeight(52)},
              ]}>
              <View style={[tw``]}>
                <Textcomp
                  text={'Service Category'}
                  size={25}
                  lineHeight={28}
                  color={'#000413'}
                  fontFamily={'Inter-Medium'}
                />
              </View>
            </View>

            <View style={tw`w-full mt-4`}>
              <ScrollView
                scrollEnabled={false}
                style={tw`w-full `}
                contentContainerStyle={tw`w-[92%] mx-auto`}
                horizontal>
                <FlatList
                  style={{flex: 1}}
                  data={getCategory}
                  scrollEnabled={false}
                  ListFooterComponent={() => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          marginTop: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {isLoading && (
                          <ActivityIndicator
                            size={'large'}
                            color={colors.parpal}
                          />
                        )}
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <CategoryList2 categoryName={item.name} catId={item?.id} />
                  )}
                  ListEmptyComponent={() => (
                    <Text
                      style={[
                        {
                          color: '#000',
                          alignSelf: 'center',
                          marginTop: 100,
                          fontFamily: commonStyle.fontFamily.regular,
                        },
                      ]}>
                      {!loading ? 'No service found' : ''}
                    </Text>
                  )}
                />
              </ScrollView>
            </View>
          </View>
          <View style={tw`h-20`} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
