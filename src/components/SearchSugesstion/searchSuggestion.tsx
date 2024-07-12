// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { StyleSheet, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';

// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import { Input } from '../Input/Input';

// export type Props = {
//     onClose?: () => void;
//     onRemoteFetch: (_searchText: string, _page: number, _take: number, _pushToLast: boolean) => Promise<any>;
//     take?: number;
//     placeHolder?: string;
//     multi?: boolean;
//     dataChecked: string[];
//     displayKey: string;
//     valueKey: string;
//     onChoose: (_value: string[]) => void;
// };

// const SearchSuggestion: React.FC<Props> = ({
//     onClose,
//     onRemoteFetch,
//     take,
//     dataChecked,
//     displayKey,
//     valueKey,
//     multi,
//     placeHolder,
//     onChoose,
// }) =>
// {
//     const { t } = useTranslation();
//     const [firstLoad, setFirstLoad] = useState(true);
//     const [data, setData] = useState<any[]>([]);
//     const [totalItem, setTotalItem] = useState(0);

//     const pageChange = async (page: number, pushToLast: boolean) =>
//     {
//         const tmpData: any = await onRemoteFetch(textSearch, page - 1, take !== undefined ? take : 10, pushToLast);

//         setTotalItem(tmpData.total);
//         setData(tmpData?.data);
//         setLoadMore(false);
//         setTimeout(() =>
//         {
//             setFirstLoad(false);
//         }, 0);
//     };

//     useEffect(() =>
//     {
//         firstLoad && pageChange(1, false);
//     }, []);

//     const displayValue: string[] = [];
//     const [displayValueState, setDisplayValueState] = useState<any>([]);

//     data.map((x: any) =>
//     {
//         displayValue.push(x[displayKey]);
//     });

//     const valueFromData: string[] = [];
//     const [valueFromDataState, setValueFromDataState] = useState<any>([]);
//     data.map((x: any) =>
//     {
//         valueFromData.push(x[valueKey]);
//     });

//     const [textSearch, setTextSearch] = useState('');
//     const [dataChoose, setDataChoose] = useState<string[]>([]);
//     const [check, setCheck] = useState<boolean[]>([]);

//     useEffect(() =>
//     {
//         setDataChoose(dataChecked);
//         const tmpCheckBool: boolean[] = [];

//         valueFromData.map((x: string, index: number) =>
//         {
//             let isChecked = false;
//             dataChecked.map((y: string) =>
//             {
//                 if (x === y)
//                 {
//                     isChecked = true;
//                     reSortData(index);
//                 }
//             });
//             tmpCheckBool.push(isChecked);
//         });

//         const checked = tmpCheckBool;
//         tmpCheckBool.map((x, index) =>
//         {
//             if (x)
//             {
//                 arraymove(checked, index, 0);
//             }
//         });
//         setCheck(checked);
//     }, [dataChecked]);

//     useEffect(() =>
//     {
//         const tmpCheckBool: boolean[] = [];

//         valueFromData.map((x: string, index: number) =>
//         {
//             let isChecked = false;
//             dataChoose?.map((y: string) =>
//             {
//                 if (x === y)
//                 {
//                     isChecked = true;
//                     reSortData(index);
//                 }
//             });
//             tmpCheckBool.push(isChecked);
//         });

//         const checked = tmpCheckBool;
//         tmpCheckBool.map((x, index) =>
//         {
//             if (x)
//             {
//                 arraymove(checked, index, 0);
//             }
//         });

//         setCheck(checked);
//         setDisplayValueState(displayValue);
//         setValueFromDataState(valueFromData);
//     }, [data]);

//     function arraymove (arr, fromIndex, toIndex)
//     {
//         const element = arr[fromIndex];
//         arr.splice(fromIndex, 1);
//         arr.splice(toIndex, 0, element);
//     }

//     const reSortData = (index) =>
//     {
//         arraymove(valueFromData, index, 0);
//         arraymove(displayValue, index, 0);
//         setDisplayValueState(displayValue);
//         setValueFromDataState(valueFromData);
//     };

//     const checkChoose = (valueChoose) =>
//     {
//         if (multi !== false || multi === undefined)
//         {
//             const tmpChoosed: string[] = [];
//             dataChoose?.map((x: string) =>
//             {
//                 tmpChoosed.push(x);
//             });

//             const tmpCheck: boolean[] = [];
//             check.map((x: boolean) =>
//             {
//                 tmpCheck.push(x);
//             });

//             let isUnCheck = false;
//             valueFromData.map((x: string, index: number) =>
//             {
//                 if (x === valueChoose)
//                 {
//                     tmpCheck[index] = !tmpCheck[index];
//                     dataChoose?.map((valueChecked: string) =>
//                     {
//                         if (valueChecked === valueChoose)
//                         {
//                             tmpChoosed.splice(tmpChoosed.indexOf(valueChoose), 1);
//                             isUnCheck = true;
//                         }
//                     });
//                 }
//             });

//             !isUnCheck && tmpChoosed.push(valueChoose);

//             setDataChoose(tmpChoosed);

//             const checked = tmpCheck;

//             tmpCheck.map((x, index) =>
//             {
//                 if (x)
//                 {
//                     reSortData(index);

//                     arraymove(checked, index, 0);
//                 }
//             });

//             setCheck(checked);
//             onChoose(tmpChoosed);
//         }
//         else
//         {
//             const tmpCheck: boolean[] = [];
//             setDataChoose([valueChoose]);
//             valueFromData.map((x: string) =>
//             {
//                 if (x === valueChoose)
//                 {
//                     tmpCheck.push(true);
//                 }
//                 else
//                 {
//                     tmpCheck.push(false);
//                 }
//             });

//             const checked = tmpCheck;

//             tmpCheck.map((x, index) =>
//             {
//                 if (x)
//                 {

//                     reSortData(index);
//                     arraymove(checked, index, 0);
//                 }
//             });

//             setCheck(checked);
//         }
//     };

//     const RenderListJob = (item: any) =>
//     {
//         return (
//             <TouchableOpacity
//                 style={[styles.item3, check.length >= item.index + 1
//                     ? check[item.index]
//                         ? {
//                                 'backgroundColor': Colors.PrimaryVariantSecond,
//                                 borderColor: Colors.PrimaryLight,
//                                 borderWidth: 1,
//                             }
//                         : { 'backgroundColor': Colors.SurfaceVariants }
//                     : { 'backgroundColor': Colors.SurfaceVariants }]}
//                 onPress={() => checkChoose(valueFromDataState[item.index])}
//             >
//                 <Text
//                     title={item.item}
//                     paddingTop={3}
//                     paddingBottom={3}
//                     colorScheme={'OnSurface'}
//                     size={'md'}
//                     textAlign="center"
//                 />
//             </TouchableOpacity>
//         );
//     };

//     const [loadMore, setLoadMore] = useState(false);

//     const LoadMoreJob = () =>
//     {
//         return (
//             <View>
//                 {loadMore
//                     ? (
//                             <ActivityIndicator
//                                 size="small"
//                                 color="#939393"
//                             />
//                         )
//                     : null
//                 }
//             </View>
//         );
//     };
//     const [page, setPage] = useState(0);

//     const handleLoadMore = async () =>
//     {
//         const numTake = take !== undefined ? take : 10;
//         if (page * numTake < totalItem)
//         {
//             await setLoadMore(true);
//             setPage(page + 1);
//             pageChange(page + 2, true);
//         }
//     };

//     const handleSearch = async () =>
//     {
//         await setPage(0);
//         await setFirstLoad(true);
//         onRemoteFetch !== undefined && pageChange(1, false);
//     };

//     return (
//         <View style={styles.container}>
//             {onClose !== undefined && (
//                 <TouchableOpacity onPress={onClose}>
//                     <Text
//                         title={'CLOSE'}
//                         textAlign={'right'}
//                     />
//                 </TouchableOpacity>
//             )}

//             <View style={styles.SearchBox}>
//                 <Input
//                     placeholder={placeHolder !== undefined ? t(placeHolder) : t('Enter keyword to search')}
//                     value={textSearch}
//                     rightBtn={{
//                         icon: 'search',
//                         onPress: handleSearch,
//                         iconColor: 'gray',
//                     }}
//                     onChangeText={value => setTextSearch(value)}
//                 />
//             </View>

//             {firstLoad
//                 ? (
//                         <View>
//                             <ActivityIndicator
//                                 size="small"
//                                 color="#939393"
//                             />
//                         </View>
//                     )
//                 : (
//                         <>
//                             <FlatList
//                                 data={displayValueState}
//                                 renderItem={(item: any) => RenderListJob(item)}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 ListFooterComponent={LoadMoreJob()}
//                                 numColumns={3}
//                                 contentContainerStyle={styles.containerContent}
//                                 scrollEnabled
//                                 onEndReached={handleLoadMore}
//                                 onEndReachedThreshold={0.5}
//                             />
//                         </>
//                     )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     SearchBox: {
//         borderRadius: 10,
//         elevation: 8,
//         height: 40,
//         marginVertical: 12,
//         position: 'relative',
//         'shadowColor': '#000',
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         shadowOpacity: 0.30,
//         shadowRadius: 4.65,
//         width: '100%',
//     },
//     container: {
//         height: '100%',
//         paddingBottom: 20,
//         paddingHorizontal: 10,
//     },
//     containerContent: {
//         width: '100%',
//     },
//     item3: {
//         alignItems: 'center',
//         borderRadius: 8,
//         justifyContent: 'center',
//         marginBottom: 10,
//         marginHorizontal: '1.6%',
//         minHeight: 45,
//         paddingVertical: 4,
//         width: '30%',
//     },
// });

// SearchSuggestion.propTypes = {
//     onClose: PropTypes.func,
//     onRemoteFetch: PropTypes.func.isRequired,
//     take: PropTypes.number,
//     displayKey: PropTypes.string.isRequired,
//     valueKey: PropTypes.string.isRequired,
//     multi: PropTypes.bool,
//     placeHolder: PropTypes.string,
//     onChoose: PropTypes.func.isRequired,
//     dataChecked: PropTypes.any.isRequired,
// };

// export default SearchSuggestion;
