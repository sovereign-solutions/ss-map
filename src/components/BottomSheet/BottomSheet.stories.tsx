// import React, { useCallback, useMemo, useState } from 'react';
// import { storiesOf } from '@storybook/react-native';

// import BottomSheet from './BottomSheet';
// import { Button, View, Text } from 'react-native';

// function useForceUpdate()
// {
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }

// const App = ()=>
// {
//     const [ref,setRef] = useState<any>();
//     const snapPoints = useMemo(() => [200,500,600], []);
//     const [index,setSheet] = useState(1);

//     const handleSheetChanges = useCallback((i: number) =>
//     {
//         // console.log(i);
        
//         // if (i === 0)
//         // {
//         //     console.log(i);
//         // }
//         // else if (i === 1)
//         // {
//         //     console.log(i);
//         // }
//         setSheet(i);
//         update();
//     }, []);

//     const update = useForceUpdate();


//     return (
//         <React.Fragment>
//             <View>
//                 <Button
//                     title="123"
//                     onPress={()=>ref.current.present()}
//                 />
                
           
//             </View>
//             <BottomSheet
//                 handleOpenBottomSheetModal={(r:any)=>
//                 {
//                     setRef(r);
//                 }}
//                 handleSheetChange={handleSheetChanges}
//                 handleSheetLevel={index}
//                 closeAble
//             />
//         </React.Fragment>
//     );
// };


// storiesOf('Layout', module).add('BottomSheet', () => (
//     <App />
// ));
