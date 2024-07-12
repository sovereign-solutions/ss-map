// import React from 'react';
// import Text from '../Text/Text';
// import FlexContainer from '../Container/FlexContainer';
// import Radio from '../Radio/Radio';
// import PropTypes from 'prop-types';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// export type Props = {
//     value?: number | string | boolean,
//     onPress?: () => void,
//     item?: number | string | boolean,
//     bgColor?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | String;
//     bdColor?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | String;
//     txtSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl',
//     label: string,
// };

// const Radiolabel: React.FC<Props> = ({
//     value,
//     onPress,
//     item,
//     bgColor,
//     bdColor,
//     txtSize,
//     label,
// }) =>
// {
//     return (
//         <TouchableWithoutFeedback
//             style={{ padding: 4 }}
//             onPress={onPress}
//         >
//             <FlexContainer
//                 direction={'row'}
//                 style={{ position: 'relative', alignItems: 'center' }}
//             >
//                 <Radio
//                     value={value}
//                     item={item}
//                     bgColor={bgColor}
//                     bdColor={bdColor}
//                     onPress={onPress}
//                 />
//                 <Text
//                     paddingLeft={10}
//                     title={label}
//                     size={txtSize ?? 'xl'}
//                     // fontWeight={'bold'}
//                 />
//             </FlexContainer>
//         </TouchableWithoutFeedback>
//     );
// };


// Radiolabel.propTypes = {
//     value: PropTypes.string || PropTypes.number || PropTypes.bool,
//     onPress: PropTypes.func,
//     item: PropTypes.string,
//     bgColor: PropTypes.oneOfType([PropTypes.oneOf(['Background', 'Surface', 'Primary', 'OnSurface', 'OnPrimary', 'PrimaryVariants', 'OnSurfaceVariants', 'SurfaceVariants', 'PrimaryLight', 'PrimaryVariantsLight', 'PrimaryVariantSecond', 'PrimaryVariantsThird']), PropTypes.string]),
//     bdColor: PropTypes.oneOfType([PropTypes.oneOf(['Background', 'Surface', 'Primary', 'OnSurface', 'OnPrimary', 'PrimaryVariants', 'OnSurfaceVariants', 'SurfaceVariants', 'PrimaryLight', 'PrimaryVariantsLight', 'PrimaryVariantSecond', 'PrimaryVariantsThird']), PropTypes.string]),
// };

// export default Radiolabel;
