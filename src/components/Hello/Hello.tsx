// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import Colors from '../theme/colors';

// export type Props = {
//   name: string;
//   baseEnthusiasmLevel?: number;
// };


// const Hello: React.FC<Props> = ({ name, baseEnthusiasmLevel = 0 }) =>
// {
//     const [enthusiasmLevel, setEnthusiasmLevel] =
//     React.useState(baseEnthusiasmLevel);

//     const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
//     const onDecrement = () =>
//         setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);

//     const getExclamationMarks = (numChars: number) =>
//         numChars > 0 ? Array(numChars + 1).join('!') : '';

//     return (
//         <View style={styles.container}>
//             <Text style={{ color: Colors.OnSurface }}>
//         Hello {name}
//                 {getExclamationMarks(enthusiasmLevel)}
//             </Text>
//             <View>
//                 <Button
//                     title={('Increase enthusiasm')}
//                     accessibilityLabel="increment"
//                     color="blue"
//                     onPress={onIncrement}
//                 />
//                 <Button
//                     title="Decrease enthusiasm"
//                     accessibilityLabel="decrement"
//                     color="red"
//                     onPress={onDecrement}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         flex: 1,
//         justifyContent: 'center',
//     },
// });
// Hello.propTypes = {
//     name: PropTypes.string.isRequired,
//     baseEnthusiasmLevel: PropTypes.number,
// };
// export default Hello;
