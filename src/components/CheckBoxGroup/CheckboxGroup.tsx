// import React from 'react';
// import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
// import FlexContainer from '../Container/FlexContainer';
// import CheckBox from '../CheckBox/CheckBox';
// import Radiolabel from '../RadioLabel/RadioLabel';
// import PropTypes from 'prop-types';

// export type CheckBoxGroupProps = {
//     direction?: 'horizontal' | 'vertical',
//     group?: boolean,
//     value?: any | any[],
//     style?: StyleProp<ViewStyle>;
// };


// const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
//     value,
//     style,
//     group = false,
//     children,
//     direction = 'horizontal',
// }) =>
// {

//     return (
//         <FlexContainer
//             direction={direction === 'horizontal' ? 'row' : 'column'}
//             style={style}
//         >
//             {React.Children.map(children, (child, i) =>
//             {
//                 if (React.isValidElement(child))
//                 {
//                     const { value: childValue } = child.props;
//                     if (child.type === CheckBox)
//                     {
//                         let checked = value === childValue;
//                         if (group)
//                         {
//                             if (value?.includes(childValue))
//                             {
//                                 checked = true;
//                             }
//                         }
//                         return React.cloneElement(child, { checked });
//                     }
//                     if (child.type === Radiolabel)
//                     {
//                         let radioValue = value;
//                         if (group)
//                         {
//                             if (value?.includes(childValue))
//                             {
//                                 radioValue = childValue;
//                             }
//                         }
//                         return React.cloneElement(child, { item: radioValue });
//                     }
//                 }
//                 return undefined;
//             })}

//         </FlexContainer>
//     );
// };

// const styles = StyleSheet.create({});

// CheckBoxGroup.propTypes = {
//     direction: PropTypes.oneOf(['horizontal', 'vertical']),
//     group: PropTypes.bool,
//     value: PropTypes.any,
//     style: PropTypes.any,
// };

// export default CheckBoxGroup;
