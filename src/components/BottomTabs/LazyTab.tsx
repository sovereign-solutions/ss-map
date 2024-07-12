// import React, { useEffect, useState } from 'react';

// interface Props
// {
//     shouldLoad: boolean;
// }

// const LazyTab: React.FC<Props> = ({
//     shouldLoad,
//     children,
// }) =>
// {
//     const [load, setLoad] = useState(false);
//     useEffect(() =>
//     {
//         if (!load && shouldLoad)
//         {
//             setLoad(true);
//         }
//     }, [shouldLoad]);

//     if (load)
//     {
//         return children;
//     }

//     return null;
// };

// export default LazyTab;
