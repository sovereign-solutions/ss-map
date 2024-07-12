// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// import { TreeItem } from './TreeItem';
// import useTree from './hooks/useTree';
// import { Dimensions } from 'react-native';
// import { ScrollView } from 'react-native';
// import { View } from 'react-native';
// import { Input } from '../Input/Input';
// import Button from '../Button/Button';
// import { useTranslation } from 'react-i18next';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import Text from '../Text/Text';

// const TreeSelect: React.FC<any> = ({ height, onChecked, onTreeRendered, nodeSelected: hehe, isLoaded, hasSearch, ...treeProps }) =>
// {
//     const { t } = useTranslation();
//     const [keySearch, setKeySearch] = useState('');

//     const callAfterIntiTree = (treeData) =>
//     {
//         expandAll !== undefined && expandAll(treeData, treeProps.expandAll);
//         expandParent !== undefined && expandParent(treeData, treeProps.expandParent);
//     };

//     // call useTree to build tree (get state, and function off Tree) from tree data
//     const [{
//         data,
//         nodeSelected,
//     },
//         {
//             expand,
//             check,
//             expandAll,
//             expandParent,
//             filter,
//             resetTree,
//         }] = useTree({
//         ...treeProps, onAfterInit: callAfterIntiTree, nodeSelected: hehe, onCheckChange: (d: any[]) => onChecked(d),
//     });

//     const handleSearch = (key: string) =>
//     {
//         filter && filter(key.toLowerCase());
//         setKeySearch(key);
//     };

//     const renderTreeItem = (node, index) =>
//     {
//         return (
//             node.visible !== false &&
//                 (
//                     <TreeItem
//                         key={node.id}
//                         node={node}
//                         onChecked={check}
//                         onExpand={expand}
//                     >
//                         {node.children && node.children.map((child) => renderTreeItem(child, index))}
//                     </TreeItem>
//                 )
//         );
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {hasSearch && (
//                 <View style={{ padding: 10 }}>
//                     <View
//                         style={{
//                             shadowOffset: {
//                                 width: 0,
//                                 height: 2,
//                             },
//                             shadowOpacity: 0.25,
//                             shadowRadius: 3.84,

//                             borderRadius: 3.84,
//                             'shadowColor': '#000',
//                             elevation: 3,
//                         }}
//                     >
//                         <Input
//                             style={{ borderRadius: 3.84 }}
//                             placeholder={t('Search')}
//                             value={keySearch}
//                             rightBtn={{
//                                 icon: 'times',
//                                 iconColor: keySearch.length > 0 ? '#ccc' : '#fff',
//                                 onPress: () =>
//                                 {
//                                     setKeySearch('');
//                                     filter && filter('');
//                                 },
//                                 type: 'light',
//                             }}
//                             onChangeText={handleSearch}
//                         />
//                     </View>
//                 </View>
//             )}

//             <ScrollView
//                 contentContainerStyle={{
//                     padding: 10,
//                 }}
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//                 onLayout={onTreeRendered}
//             >
//                 {isLoaded &&
//                     data && data?.length > 0 &&
//                     data.map((node, index) => renderTreeItem(node, index))
//                 }

//                 {!isLoaded && (
//                     <View style={{
//                         alignItems: 'center',
//                         height: Dimensions.get('window').height / 1.5,
//                         marginTop: 20,
//                     }}
//                     >
//                         <SvgIcon
//                             name={'data empty'}
//                             size={160}
//                         />
//                         <Text
//                             title={'No data found'}
//                             size={'2xl'}
//                             fontFamily="Nunito-Bold"
//                             paddingBottom={5}
//                             paddingTop={5}
//                         />
//                     </View>
//                 )}
//             </ScrollView>

//             {nodeSelected && nodeSelected.length > 0 && (
//                 <View style={{ paddingBottom: 5, paddingHorizontal: 16 }}>
//                     <Button
//                         title={'Clear'}
//                         btnColor="variant2"
//                         onPress={resetTree}
//                     />
//                 </View>
//             )}
//         </View>

//     );
// };

// TreeSelect.propTypes = {
//     data: PropTypes.array,
//     nodeSelected: PropTypes.array,
//     onlySelectLeaves: PropTypes.bool,
//     showTag: PropTypes.bool,
//     height: PropTypes.string,
//     expandAll: PropTypes.bool,
//     onChecked: PropTypes.func,
//     onTreeRendered: PropTypes.func,
// };

// TreeSelect.defaultProps = {
//     data: [],
//     hasSearch: true,
//     onlySelectLeaves: true,
//     height: 'auto',
//     showTag: true,
//     expandAll: false,
//     isDisableParent: true,
// };


// export default TreeSelect;
