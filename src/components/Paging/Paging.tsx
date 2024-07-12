// // basic
// import React from 'react';
// import PropTypes from 'prop-types';
// import { StyleSheet, TouchableOpacity } from 'react-native';
// import FAIcon from '../FAIcon/FAIcon';
// import FlexContainer from '../Container/FlexContainer';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';

// export type PagingProps = {
//     total: number;
//     currentPage: number;
//     pageSize: number;
//     showFirstLast?: boolean;
//     onChange?: (page: number) => void;
// };

// const Paging: React.FC<PagingProps> = ({
//     total,
//     currentPage,
//     pageSize,
//     showFirstLast,
//     onChange,
// }) =>
// {
//     const getPager = (totalItems: number, currentPage = 1, _pageSize = 10) =>
//     {
//         // calculate total pages
//         const totalPages = _pageSize <= 0 ? 1 : Math.ceil(totalItems / _pageSize);
//         let startPage: number, endPage: number;

//         if (totalPages <= 3)
//         {
//             startPage = 1;
//             endPage = totalPages;
//         }
//         else
//         {
//             if (currentPage <= 2)
//             {
//                 startPage = 1;
//                 endPage = 3;
//             }
//             else if (currentPage + 1 >= totalPages)
//             {
//                 startPage = totalPages - 2;
//                 endPage = totalPages;
//             }
//             else
//             {
//                 startPage = currentPage - 1;
//                 endPage = currentPage + 1;
//             }
//         }

//         // calculate start and end item indexes
//         const startIndex = (currentPage - 1) * _pageSize;
//         const endIndex = Math.min(startIndex + _pageSize - 1, totalItems - 1);

//         // create an array of pages to ng-repeat in the pager control
//         const pages: number[] = [];
//         for (let i = startPage; i < endPage + 1; i++)
//         {
//             pages.push(i);
//         }

//         return {
//             totalItems: totalItems,
//             currentPage: currentPage,
//             pageSize: _pageSize,
//             totalPages: totalPages,
//             startPage: startPage,
//             endPage: endPage,
//             startIndex: startIndex,
//             endIndex: endIndex,
//             pages: pages,
//         };
//     };

//     const changePage = (page: number, isChange: boolean) =>
//     {
//         if (isChange && typeof onChange === 'function')
//         {
//             onChange(page);
//         }
//     };

//     const pager = getPager(total, currentPage, pageSize);

//     return (
//         <>
//             {
//                 pager && pager.pages && pager.pages.length > 0 && (
//                     <FlexContainer
//                         direction="row"
//                         style={styles.container}
//                     >
//                         {
//                             showFirstLast && (
//                                 <TouchableOpacity
//                                     style={styles.buttonContainer}
//                                     disabled={pager.currentPage === 1}
//                                     onPress={() => changePage(1, pager.currentPage !== 1)}
//                                 >
//                                     <FAIcon
//                                         icon={'angle-double-left'}
//                                         size={'16'}
//                                     />
//                                 </TouchableOpacity>
//                             )
//                         }

//                         <TouchableOpacity
//                             style={styles.buttonContainer}
//                             disabled={pager.currentPage === 1}
//                             onPress={() => changePage(1, pager.currentPage !== 1)}
//                         >
//                             <FAIcon
//                                 icon={'angle-left'}
//                                 size={'16'}
//                             />
//                         </TouchableOpacity>

//                         {
//                             pager.pages.map((p, index) =>
//                             {
//                                 const style: any = { ...styles.buttonContainer };
//                                 if (pager.currentPage === p)
//                                 {
//                                     style.backgroundColor = Colors.Primary;
//                                 }
//                                 return (
//                                     <TouchableOpacity
//                                         key={index}
//                                         disabled={pager.currentPage === p}
//                                         style={style}
//                                         onPress={() => changePage(p, true)}
//                                     >
//                                         <Text
//                                             title={p.toString()}
//                                             colorScheme={pager.currentPage === p ? 'Surface' : undefined}
//                                         />
//                                     </TouchableOpacity>
//                                 );
//                             })
//                         }

//                         <TouchableOpacity
//                             style={styles.buttonContainer}
//                             disabled={pager.currentPage === pager.totalPages}
//                             onPress={() => changePage(pager.currentPage + 1, pager.currentPage !== pager.totalPages)}
//                         >
//                             <FAIcon
//                                 icon={'angle-right'}
//                                 size={'16'}
//                             />
//                         </TouchableOpacity>

//                         {
//                             showFirstLast && (
//                                 <TouchableOpacity
//                                     style={styles.buttonContainer}
//                                     disabled={pager.currentPage === pager.totalPages}
//                                     onPress={() => changePage(pager.totalPages, pager.currentPage !== pager.totalPages)}
//                                 >
//                                     <FAIcon
//                                         icon={'angle-double-right'}
//                                         size={'16'}
//                                     />
//                                 </TouchableOpacity>
//                             )
//                         }
//                     </FlexContainer>
//                 )
//             }
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     buttonContainer: {
//         alignItems: 'center',
//         borderColor: Colors.OnSurface,
//         borderRadius: 7,
//         borderStyle: 'solid',
//         borderWidth: 1,
//         display: 'flex',
//         height: 35,
//         justifyContent: 'center',
//         width: 35,
//     },
//     container: {
//         justifyContent: 'space-evenly',
//         padding: 5,
//     },
// });

// Paging.propTypes = {
//     total: PropTypes.number.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     showFirstLast: PropTypes.bool,
//     onChange: PropTypes.func,
// };

// export default Paging;
