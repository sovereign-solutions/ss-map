// import React, { Component } from 'react';
// import {
//     Text as TextRN,
//     View,
//     TextInput,
//     TouchableWithoutFeedback,
//     TouchableOpacity,
//     FlatList,
//     UIManager,
//     ViewPropTypes,
// } from 'react-native';
// // import { ViewPropTypes } from 'deprecated-react-native-prop-types';
// import PropTypes from 'prop-types';
// import reject from 'lodash/reject';
// import find from 'lodash/find';
// import get from 'lodash/get';

// import styles from './styles';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import Text from '../Text/Text';
// import { withTranslation } from 'react-i18next';
// import Colors from '../theme/colors';

// // set UIManager LayoutAnimationEnabledExperimental
// if (UIManager.setLayoutAnimationEnabledExperimental)
// {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// interface Props {
//       single?: boolean,
//       selectedItems: any[],
//       items: any[],
//       uniqueKey: string,
//       tagContainerStyle?: any,
//       onSelectedItemsChange: (_item)=>void,
//       selectedItemTextColor?: string,
//       itemTextColor?: string,
//       itemFontSize?: number,
//       searchInputPlaceholderText?: string,
//       searchInputStyle?: {},
//       selectText?: string,
//       styleDropdownMenu?: any,
//       styleDropdownMenuSubsection?: any,
//       styleInputGroup?: any,
//       styleItemsContainer?: any,
//       styleListContainer?: any,
//       styleMainWrapper?: any,
//       styleRowList?: any,
//       styleSelectorContainer?: any,
//       styleTextDropdown?: any,
//       styleTextDropdownSelected?: any,
//       styleTextTag?: any,
//       hideSubmitButton?: boolean,
//       submitButtonStyle?: any,
//       submitButtonText?: string,
//       submitButtonTextStyle?: any,
//       hideTags?: boolean,
//       onChangeInput?: (_value)=>void,
//       displayKey: string,
//       textInputProps?: {},
//       flatListProps?: {},
//       filterMethod?: string,
//       onToggleList?: ()=>void,
//       removeSelected?: boolean,
//       noItemsText?: string,
//       selector?: boolean,
//       searchTerm?: string,
//       t: any,
//       selectedText?: string,
// }

// interface myState {
//     selector: boolean,
//     searchTerm: string,
// }

// class MultiSelect extends Component<Props,myState>
// {
//   static propTypes = {
//       single: PropTypes.bool,
//       selectedItems: PropTypes.array.isRequired,
//       items: PropTypes.array.isRequired,
//       uniqueKey: PropTypes.string.isRequired,
//       tagContainerStyle: ViewPropTypes.style,
//       onSelectedItemsChange: PropTypes.func.isRequired,
//       selectedItemTextColor: PropTypes.string,
//       itemTextColor: PropTypes.string,
//       itemFontSize: PropTypes.number,
//       searchInputPlaceholderText: PropTypes.string,
//       searchInputStyle: PropTypes.object,
//       selectText: PropTypes.string,
//       styleDropdownMenu: ViewPropTypes.style,
//       styleDropdownMenuSubsection: ViewPropTypes.style,
//       styleInputGroup: ViewPropTypes.style,
//       styleItemsContainer: ViewPropTypes.style,
//       styleListContainer: ViewPropTypes.style,
//       styleMainWrapper: ViewPropTypes.style,
//       styleRowList: ViewPropTypes.style,
//       styleSelectorContainer: ViewPropTypes.style,
//       styleTextDropdown: PropTypes.object,
//       styleTextDropdownSelected: PropTypes.object,
//       styleTextTag: ViewPropTypes.style,
//       hideSubmitButton: PropTypes.bool,
//       submitButtonStyle: ViewPropTypes.style,
//       submitButtonText: PropTypes.string,
//       submitButtonTextStyle: PropTypes.object,
//       hideTags: PropTypes.bool,
//       onChangeInput: PropTypes.func,
//       displayKey: PropTypes.string.isRequired,
//       textInputProps: PropTypes.object,
//       flatListProps: PropTypes.object,
//       filterMethod: PropTypes.string,
//       onToggleList: PropTypes.func,
//       removeSelected: PropTypes.bool,
//       noItemsText: PropTypes.string,
//       selectedText: PropTypes.string,
//   };

//   static defaultProps = {
//       single: false,
//       selectedItems: [],
//       uniqueKey: '_id',
//       selectedItemTextColor: '#00A5FF',
//       itemTextColor: '#525966',
//       itemFontSize: 16,
//       searchInputPlaceholderText: 'Search',
//       searchInputStyle: { color: '#525966' },
//       selectText: 'Select',
//       hideSubmitButton: false,
//       submitButtonText: 'Submit',
//       hideTags: false,
//       displayKey: 'name',
//       removeSelected: false,
//       noItemsText: 'No items to display.',
//       selectedText: 'selected',
//   };

//   constructor(props: Props)
//   {
//       super(props);
//       this.state = {
//           selector: false,
//           searchTerm: '',
//       };
//   }

//   shouldComponentUpdate(): boolean
//   {
//       return true;
//   }

//   _onChangeInput = (value: string): void =>
//   {
//       const { onChangeInput } = this.props;
//       if (onChangeInput)
//       {
//           onChangeInput(value);
//       }
//       this.setState({ searchTerm: value });
//   };

//   _getSelectLabel = () =>
//   {
//       const { selectText, single, selectedItems, displayKey, t, selectedText } = this.props;
//       if (!selectedItems || selectedItems.length === 0)
//       {
//           return `${t(selectText)}`;
//       }
//       if (single)
//       {
//           const item = selectedItems[0];
//           const foundItem = this._findItem(item);
//           return get(foundItem, displayKey) || selectText;
//       }
//       return `${t(selectText)} (${selectedItems.length} ${t(selectedText)})`;
//   };

//   _findItem = (itemKey: string): any =>
//   {
//       const { items, uniqueKey } = this.props;
//       return find(items, singleItem => singleItem[uniqueKey] === itemKey) || {};
//   };

//   _displaySelectedItems = (): any =>
//   {
//       const {
//           tagContainerStyle,
//           uniqueKey,
//           selectedItems,
//           displayKey,
//           styleTextTag,
//       } = this.props;
//       const actualSelectedItems = selectedItems;
//       return actualSelectedItems.map(singleSelectedItem =>
//       {
//           const item = this._findItem(singleSelectedItem);
//           if (!item[displayKey])
//           {
//               return null;
//           }
//           return (
//               <View
//                   key={item[uniqueKey]}
//                   style={[
//                       styles.selectedItem,
//                       { width: item[displayKey].length * 8 + 60 },
//                       tagContainerStyle || {},
//                   ]}
//               >
//                   <TextRN
//                       style={[
//                           styles.styleTextTag,
//                           styleTextTag && styleTextTag,
//                       ]}
//                       numberOfLines={1}

//                   >
//                       {item[displayKey]}
//                   </TextRN>
//                   <TouchableOpacity
//                       onPress={() =>
//                       {
//                           this._removeItem(item);
//                       }}
//                   >
//                       <SvgIcon
//                           name="clear"
//                           size={20}
//                       />
//                   </TouchableOpacity>
//               </View>
//           );
//       });
//   };

//   _removeItem = (item: string): void =>
//   {
//       const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props;
//       const newItems = reject(
//           selectedItems,
//           singleItem => item[uniqueKey] === singleItem,
//       );
//       // broadcast new selected items state to parent component
//       onSelectedItemsChange(newItems);
//   };

//   _removeAllItems = (): void =>
//   {
//       const { onSelectedItemsChange } = this.props;
//       // broadcast new selected items state to parent component
//       onSelectedItemsChange([]);
//   };

//   _toggleSelector = (): void =>
//   {
//       const { onToggleList } = this.props;
//       this.setState({
//           selector: !this.state.selector,
//       });
//       if (onToggleList)
//       {
//           onToggleList();
//       }
//   };

//   _clearSearchTerm = (): void =>
//   {
//       this.setState({
//           searchTerm: '',
//       });
//   };

//   _submitSelection = (): void =>
//   {
//       this._toggleSelector();
//       this._clearSearchTerm();
//   };

//   _itemSelected = (item: string): any =>
//   {
//       const { uniqueKey, selectedItems } = this.props;
//       return selectedItems.indexOf(item[uniqueKey]) !== -1;
//   };

//   _toggleItem = (item: string): void =>
//   {
//       const {
//           single,
//           uniqueKey,
//           selectedItems,
//           onSelectedItemsChange,
//       } = this.props;
//       if (single)
//       {
//           this._submitSelection();
//           onSelectedItemsChange([item[uniqueKey]]);
//       }
//       else
//       {
//           const status = this._itemSelected(item);
//           let newItems;
//           if (status)
//           {
//               newItems = reject(
//                   selectedItems,
//                   singleItem => item[uniqueKey] === singleItem,
//               );
//           }
//           else
//           {
//               newItems = [...selectedItems, item[uniqueKey]];
//           }
//           // broadcast new selected items state to parent component
//           onSelectedItemsChange(newItems);
//       }
//   };

//   _itemStyle = (item: string): any =>
//   {
//       const {
//           selectedItemTextColor,
//           itemTextColor,
//           itemFontSize,
//       } = this.props;
//       const isSelected = this._itemSelected(item);
//       const color = isSelected
//           ? { color: selectedItemTextColor }
//           : { color: itemTextColor };
//       return {
//           ...color,
//           fontSize: itemFontSize,
//       };
//   };

//   _getRow = item =>
//   {
//       const { displayKey, styleRowList } = this.props;
//       return (
//           <TouchableOpacity
//               disabled={item.disabled}
//               style={[
//                   styleRowList && styleRowList,
//                   styles.touchGetRow,
//               ]}
//               onPress={() => this._toggleItem(item)}
//           >
//               <View>
//                   <View style={styles.flexRow}>
//                       <TextRN
//                           style={[
//                               styles.styleItem,
//                               this._itemStyle(item),
//                               item.disabled ? styles.colorGray : {},
//                           ]}
//                       >
//                           {item[displayKey]}
//                       </TextRN>
//                       {this._itemSelected(item)
//                           ? (
//                                   <SvgIcon
//                                       name="check blue"
//                                       size={10}
//                                   />
//                               )
//                           : null}
//                   </View>
//               </View>
//           </TouchableOpacity>
//       );
//   };

//   _filterItems = (searchTerm: string): any =>
//   {
//       switch (this.props.filterMethod)
//       {
//           case 'full':
//               return this._filterItemsFull(searchTerm);
//           default:
//               return this._filterItemsPartial(searchTerm);
//       }
//   };

//   _filterItemsPartial = (searchTerm: string): any =>
//   {
//       const { items, displayKey } = this.props;
//       const filteredItems: any = [];
//       items.forEach(item =>
//       {
//           const parts = searchTerm.trim().split(/[ \-:]+/);
//           const regex = new RegExp(`(${parts.join('|')})`, 'ig');
//           if (regex.test(get(item, displayKey)))
//           {
//               filteredItems.push(item);
//           }
//       });
//       return filteredItems;
//   };

//   _filterItemsFull = (searchTerm: string): any =>
//   {
//       const { items, displayKey } = this.props;
//       const filteredItems: any = [];
//       items.forEach(item =>
//       {
//           if (
//               item[displayKey]
//                   .toLowerCase()
//                   .indexOf(searchTerm.trim().toLowerCase()) >= 0
//           )
//           {
//               filteredItems.push(item);
//           }
//       });
//       return filteredItems;
//   };

//   _renderItems = (): any =>
//   {
//       const {
//           items,
//           uniqueKey,
//           selectedItems,
//           flatListProps,
//           styleListContainer,
//           removeSelected,
//           noItemsText,
//       } = this.props;
//       const { searchTerm } = this.state;
//       let component,itemList;
//       let renderItems = searchTerm ? this._filterItems(searchTerm) : items;
//       // Filtering already selected items
//       if (removeSelected)
//       {
//           renderItems = renderItems.filter(
//               item => !selectedItems.includes(item[uniqueKey]),
//           );
//       }
//       if (renderItems.length)
//       {
//           itemList = (
//               <FlatList
//                   data={renderItems}
//                   extraData={selectedItems}
//                   keyExtractor={item => item[uniqueKey]}
//                   renderItem={rowData => this._getRow(rowData.item)}
//                   {...flatListProps}
//                   nestedScrollEnabled
//               />
//           );
//       }
//       else
//       {
//           itemList = (
//               <View style={styles.noItemsText}>
//                   <Text
//                       title={`${noItemsText}`}
//                       colorScheme={'#C62828'}
//                       paddingBottom={10}
//                       paddingTop={20}
//                   />
//               </View>
//           );
//       }
//       component = (
//           <View style={styleListContainer && styleListContainer}>
//               {itemList}
//           </View>
//       );
//       return component;
//   };

//   render(): JSX.Element
//   {
//       const {
//           selectedItems,
//           single,
//           searchInputPlaceholderText,
//           searchInputStyle,
//           styleDropdownMenu,
//           styleDropdownMenuSubsection,
//           hideSubmitButton,
//           submitButtonStyle,
//           submitButtonText,
//           submitButtonTextStyle,
//           hideTags,
//           textInputProps,
//           styleMainWrapper,
//           styleInputGroup,
//           styleItemsContainer,
//           styleSelectorContainer,
//           styleTextDropdown,
//           styleTextDropdownSelected,
//           t,
//       } = this.props;
//       const { searchTerm, selector } = this.state;
//       return (
//           <View style={styles.flexCol && styleMainWrapper && styleMainWrapper}>
//               {selector
//                   ? (
//                           <View style={[styles.selectorView,styleSelectorContainer && styleSelectorContainer]}>
//                               <View style={[styles.inputGroup, styleInputGroup && styleInputGroup]}>
//                                   <TextInput
//                                       placeholder={t(searchInputPlaceholderText)}
//                                       placeholderTextColor={'#939393'}
//                                       underlineColorAndroid="transparent"
//                                       style={[searchInputStyle, styles.flex, styles.inputSearch,
//                                           {
//                                               backgroundColor: Colors.SurfaceVariants,
//                                               color: Colors.OnSurface,
//                                               borderTopLeftRadius: 5,
//                                               borderTopRightRadius: 5,
//                                               paddingVertical: 5,
//                                               borderWidth: 1,
//                                               'borderColor': '#ccc',
//                                               //   borderBottomWidth: 0,
//                                           }]}
//                                       value={searchTerm}
//                                       autoFocus
//                                       onChangeText={this._onChangeInput}
//                                       {...textInputProps}
//                                   />
//                                   <TouchableOpacity
//                                       style={[styles.paddingRight10,
//                                           {
//                                               position: 'absolute',
//                                               top: 0,
//                                               right: 0,
//                                               width: 40,
//                                               height: 40,
//                                               justifyContent: 'center',
//                                               alignItems: 'flex-end',
//                                           }]}
//                                       onPress={this._submitSelection}
//                                   >
//                                       <SvgIcon
//                                           name="clear"
//                                           size={20}
//                                       />
//                                   </TouchableOpacity>
//                               </View>
//                               <View
//                                   style={[styles.viewContainerItems, { backgroundColor: Colors.SurfaceVariantsSecond }]}
//                               >
//                                   <View style={styleItemsContainer && styleItemsContainer}>
//                                       {this._renderItems()}
//                                   </View>
//                                   {!single && !hideSubmitButton && (
//                                       <TouchableOpacity
//                                           style={submitButtonStyle ? submitButtonStyle : styles.button}
//                                           onPress={() => this._submitSelection()}
//                                       >
//                                           <Text
//                                               title={`${submitButtonText}`}
//                                               colorScheme="OnPrimary"
//                                               fontFamily={'Nunito-Bold'}
//                                               size={'xl'}
//                                               {...submitButtonTextStyle}
//                                           />
//                                       </TouchableOpacity>
//                                   )}
//                               </View>
//                           </View>
//                       )
//                   : (
//                           <View>
//                               <View
//                                   style={[styles.dropdownView,styleDropdownMenu && styleDropdownMenu]}
//                               >
//                                   <View
//                                       style={[
//                                           styles.subSection,styleDropdownMenuSubsection && styleDropdownMenuSubsection,
//                                           { backgroundColor: Colors.SurfaceVariants },
//                                       ]}
//                                   >
//                                       <TouchableWithoutFeedback onPress={this._toggleSelector}>
//                                           <View style={styles.viewPickItem}>
//                                               <Text
//                                                   title={t(this._getSelectLabel())}
//                                                   size="xl"
//                                                   colorScheme={!selectedItems || !selectedItems.length ? '#A9A9A9' : Colors.OnSurface}
//                                                   paddingLeft={10}
//                                                   numberOfLines={1}
//                                                   {...!selectedItems || !selectedItems.length ? styleTextDropdown : styleTextDropdownSelected}
//                                               />
//                                               {single === true
//                                                   ? (
//                                                           <TouchableOpacity onPress={()=>this._removeAllItems()}>
//                                                               {selectedItems.length
//                                                                   ? (
//                                                                           <SvgIcon
//                                                                               name="clear"
//                                                                               size={20}
//                                                                           />
//                                                                       )
//                                                                   : (
//                                                                           <TouchableOpacity
//                                                                               onPress={this._toggleSelector}
//                                                                           >
//                                                                               <SvgIcon
//                                                                                   name="down arrow small"
//                                                                                   size={20}
//                                                                               />
//                                                                           </TouchableOpacity>
//                                                                       )}
//                                                           </TouchableOpacity>
//                                                       )
//                                                   : (
//                                                           <TouchableOpacity onPress={this._toggleSelector}>
//                                                               <SvgIcon
//                                                                   name="down arrow small"
//                                                                   size={20}
//                                                               />
//                                                           </TouchableOpacity>
//                                                       )
//                                               }
//                                           </View>
//                                       </TouchableWithoutFeedback>
//                                   </View>
//                               </View>
//                               {!single && !hideTags && selectedItems.length
//                                   ? (
//                                           <View>
//                                               <View style={styles.viewDeleteAll}>
//                                                   <TouchableOpacity onPress={()=>this._removeAllItems()}>
//                                                       <Text title="Delete all" />
//                                                   </TouchableOpacity>
//                                               </View>
//                                               <View style={styles.flexWrap}>
//                                                   {this._displaySelectedItems()}
//                                               </View>
//                                           </View>
//                                       )
//                                   : null}
//                           </View>
//                       )}
//           </View>
//       );
//   }
// }

// export default withTranslation()(MultiSelect);
