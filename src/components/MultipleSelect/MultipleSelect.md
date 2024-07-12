| Props                       | require | type    | Purpose                                                      |
| --------------------------- | ------- | ------- | ------------------------------------------------------------ |
| single                      | no      | Boolean | để select sang mode  single select                           |
| selectedItems               | yes     | array   | lấy state item đã  chọn để hiện thị khi click vào item       |
| items                       | yes     | array   | để truyền data                                               |
| uniqueKey                   | yes     | String  | key của data để làm  id                                      |
| tagContainerStyle           | no      | object  | style của tag                                                |
| onSelectedItemsChange       | yes     | func    | func select item                                             |
| selectedItemTextColor       | no      | String  | màu text khi chọn  item                                      |
| itemTextColor               | no      | String  | màu text của item khi  chưa chọn                             |
| itemFontSize                | no      | number  | size text của item                                           |
| searchInputPlaceholderText  | no      | String  | Placeholder của input  search                                |
| searchInputStyle            | no      | object  | style của TextInput                                          |
| selectText                  | no      | String  | text ở dropdown khi  chưa click select                       |
| styleDropdownMenu           | no      | object  | style view container  dropdown                               |
| styleDropdownMenuSubsection | no      | object  | style của dropdown                                           |
| styleInputGroup             | no      | object  | style của cả view  input search                              |
| styleItemsContainer         | no      | object  | style của view  container flatlist                           |
| styleListContainer          | no      | object  | style của flatlist                                           |
| styleMainWrapper            | no      | object  | style của component  Multiple select                         |
| styleRowList                | no      | object  | style của item                                               |
| styleSelectorContainer      | no      | object  | style view container  của cả input search,flatlist,button submit |
| styleTextDropdown           | no      | object  | style của text  dropdown lúc chưa chọn, style bằng Text mui  |
| styleTextDropdownSelected   | no      | object  | style của text  dropdown lúc đã chọn, style bằng Text mui    |
| styleTextTag                | no      | object  | style text của các  tag                                      |
| hideSubmitButton            | no      | Boolean | ẩn đi button submit                                          |
| submitButtonStyle           | no      | object  | style của button  submit                                     |
| submitButtonText            | no      | String  | text của button  submit                                      |
| submitButtonTextStyle       | no      | object  | style của text ở  button submit, thêm bằng các prop của Text mui |
| hideTags                    | no      | Boolean | ẩn đi các tag đã chọn  các item ở mode multiple              |
| onChangeInput               | no      | func    | func onChangeText()  của TextInput                           |
| displayKey                  | yes     | String  | key của data để hiển  thị ở list item                        |
| textInputProps              | no      | object  | thêm props của  TextInput search                             |
| flatListProps               | no      | object  | thêm props của  flatlist                                     |
| filterMethod                | no      | String  | Defaults  to "partial". options: ["partial", "full"] ,       |
|                             |         |         | để chọn logic search. "partial" search ra kết quả ít nhất    |
|                             |         |         | một từ khớp. "full" search đầy đủ từ                         |
| onToggleList                | no      | func    | func khi click để  open hay close select                     |
| removeSelected              | no      | Boolean | chọn item thì item ẩn  khỏi danh sách                        |
| noItemsText                 | no      | String  | text khi search không  có từ đúng                            |
| selectedText                | no      | String  | text sau số lượng đã  chọn xong hiển thị ở dropdown mode multiple |