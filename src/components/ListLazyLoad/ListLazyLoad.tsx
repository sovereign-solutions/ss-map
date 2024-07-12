// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, FlatList } from 'react-native';
// import PropTypes from 'prop-types';

// export type ListLazyLoadProps = {
//     data?: Array<any>,
//     itemTemplate: (item: any, index?: number) => JSX.Element,
//     currentPage: number,
//     isLastPage: boolean,
//     width?: number | string;
//     onNext?: (nextPage: number) => void;
//     onRefresh?: () => void;
// };

// const defaultWidth = 'auto';
// const defaultPaddingBottomToRaise = 0.5;

// const ListLazyLoad: React.FC<ListLazyLoadProps> = (({
//     data,
//     itemTemplate,
//     currentPage,
//     isLastPage,
//     width,
//     onNext,
//     onRefresh
// }) =>
// {
//     const [refreshing, setRefreshing] = useState(false);
//     const [isNextLoading, setNextLoading] = useState(false);
//     const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);

//     useEffect(() => {
//         if (internalCurrentPage !== currentPage)
//         {
//             setNextLoading(false);
//         }

//         if (internalCurrentPage === 0 && currentPage === 1)
//         {
//             setRefreshing(false);
//         }
//     });

//     const handleLoadMore = () => {
//         if (typeof onNext === 'function' && !refreshing && !isNextLoading && !isLastPage)
//         {
//             setInternalCurrentPage(currentPage);
//             setNextLoading(true);
//             onNext(currentPage + 1); 
//         }
//     };

//     const handleRefresh = () => {
//         if (typeof onRefresh === 'function' && !refreshing)
//         {
//             setRefreshing(true);
//             setInternalCurrentPage(0);
//             onRefresh(); 
//         }

//     };

//     return (
//         <View style={{
//             ...styles.container,
//             width: width || defaultWidth
//         }}>
//             <FlatList
//                 data={data || []}
//                 renderItem={({ item, index }) => itemTemplate(item, index)}
//                 keyExtractor={(item, index) => index.toString()}
//                 refreshing={refreshing || isNextLoading}
//                 onEndReached={handleLoadMore}
//                 onEndReachedThreshold={defaultPaddingBottomToRaise}
//                 onRefresh={handleRefresh}
//             />
//         </View>
//     );
// });
// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         height: 'auto'
//     },
//     loadingContainer: {
//         paddingTop: 5,
//         paddingBottom: 5
//     }
// });

// ListLazyLoad.propTypes = {
//     data: PropTypes.array,
//     itemTemplate: PropTypes.func.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     isLastPage: PropTypes.bool.isRequired,
//     width: PropTypes.number || PropTypes.string,
//     onNext: PropTypes.func,
//     onRefresh: PropTypes.func
// }

// export default ListLazyLoad;
