// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

// import { TreeItem } from './TreeItem';
// import useTree from './hooks/useTree';

// const TreeSelect: React.FC<any> = ({ height, onChecked, ...treeProps }) =>
// {
//     const callAfterIntiTree = (treeData) =>
//     {
//         expandAll !== undefined && expandAll(treeData, treeProps.expandAll);
//         expandParent !== undefined && expandParent(treeData, treeProps.expandParent);
//     };

//     // call useTree to build tree (get state, and function off Tree) from tree data
//     const [
//         { data, nodeSelected },
//         {
//             expand,
//             check,
//             expandAll,
//             expandParent,
//         },
//     ] = useTree({ ...treeProps, onAfterInit: callAfterIntiTree });

//     useEffect(() =>
//     {
//         onChecked(nodeSelected);
//     }, [nodeSelected]);

//     const renderTreeItem = (node, index) =>
//     {
//         return (
//             node.visible !== false && (
//                 <TreeItem
//                     key={node.Id}
//                     node={node}
//                     onChecked={check}
//                     onExpand={expand}
//                 >
//                     {node.expand && node.child && node.child.map((child) => renderTreeItem(child, index))}
//                 </TreeItem>
//             )
//         );
//     };

//     return (
//         <React.Fragment>
//             {data && data?.length > 0 && data.map((node, index) => renderTreeItem(node, index))}
//         </React.Fragment>
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
// };

// TreeSelect.defaultProps = {
//     data: [],
//     hasSearch: true,
//     onlySelectLeaves: true,
//     height: 'auto',
//     showTag: true,
//     expandAll: false,
// };

// export default TreeSelect;
