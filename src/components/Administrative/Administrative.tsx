// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Constants } from '../../utils/constants';
// import { AdministrativeMap } from './AdministrativeMap';
// import FlexContainer from '../Container/FlexContainer';
// import FormControlLabel from '../Forms/FormControlLabel';
// import { Input } from '../Input/Input';
// import MultipleSelect from '../MultipleSelect/MultipleSelect';

// export type AdministrativeProps = {
//     data: any;
//     onDataChange: (data: any) => void;
//     administrativeService: any;
//     valueField: string;
//     displayField: string;
//     postalCode?: string;
// };

// const adminType = [Constants.TYPE_PROVINCE, Constants.TYPE_DISTRICT, Constants.TYPE_WARD];

// const Administrative: React.FC<AdministrativeProps> = ({
//     data,
//     onDataChange,
//     administrativeService,
//     valueField,
//     displayField,
//     postalCode,
// }) =>
// {
//     const [adminData, setAdminData] = useState<any>({ ...data, location: data.location ? data.location : { coordinates: [106.66887141635867, 10.782883235202302] } });

//     const [options, setOptions] = useState<any>({
//         stateOptions: [],
//         districtOptions: [],
//         wardOptions: [],
//     });

//     useEffect(() =>
//     {
//         bindAdminOptions(Number(adminData?.province || ''), Number(adminData?.district || ''));
//     }, [adminData]);

//     const getChildByParentId = async (parentId: number, type: string) =>
//     {
//         return await administrativeService.getChildByParentId(parentId, type);
//     };
//     const bindAdminOptions = async (province?: number | null, district?: number | null) =>
//     {
//         let provinces: any,
//             districts: any,
//             wards: any;
//         if (!options.stateOptions.length)
//         {
//             provinces = await getChildByParentId(0, Constants.TYPE_PROVINCE);
//         }
//         if (province)
//         {
//             districts = await getChildByParentId(province, Constants.TYPE_DISTRICT);

//             if (district)
//             {
//                 wards = await getChildByParentId(district, Constants.TYPE_WARD);
//             }
//         }
//         setAdminOptionsV2(provinces, districts, wards);

//     };

//     const setAdminOptionsV2 = (provinces: any | undefined, district: any | undefined, wards: any | undefined) =>
//     {
//         const currentOptions = { ...options };
//         if (provinces)
//         {
//             currentOptions.stateOptions = mapAdminOptions(provinces);
//         }
//         if (district)
//         {
//             currentOptions.districtOptions = mapAdminOptions(district);
//         }
//         if (wards)
//         {
//             currentOptions.wardOptions = mapAdminOptions(wards);
//         }
//         setOptions(currentOptions);
//     };

//     const mapAdminOptions = (admins = []) =>
//     {
//         return admins.map((admin: any) =>
//         {
//             return {
//                 id: Number(admin[valueField]),
//                 label: admin[displayField],
//                 ...admin,
//             };
//         });
//     };

//     const buildLocationStr = () =>
//     {
//         if (Array.isArray(adminData.coordinates) && adminData.coordinates.length === 2)
//         {
//             return adminData.coordinates.join(',');
//         }
//         return '';
//     };

//     const handleSelectAdmin = async (level: number, adminId: any) =>
//     {
//         // get child regions of this selected value
//         const childLevel = level + 1;
//         const type = adminType[childLevel];

//         if (type)
//         {
//             const regions = await getChildByParentId(adminId, type);
//             setAdminOptionsV2(type === Constants.TYPE_PROVINCE
//                 ? regions
//                 : undefined, type === Constants.TYPE_DISTRICT ? regions : undefined, type === Constants.TYPE_WARD ? regions : undefined);
//         }
//     };

//     const handleDataChange = async (key: string, value: any) =>
//     {
//         if (key === 'province')
//         {
//             const record = options.stateOptions.find((d: any) => d.id === value);
//             let loc: any = null;
//             if (record)
//             {
//                 loc = [record.Longitude, record.Latitude];
//             }

//             const newData = {
//                 ...adminData,
//                 province: value,
//                 district: null,
//                 ward: null,
//                 location: { type: 'Point', coordinates: loc },
//                 street: null,
//                 address: null,
//                 shortAddress: null,
//             };
//             setAdminData(newData);
//             onDataChange(newData);

//             await handleSelectAdmin(0, value);
//         }
//         else if (key === 'district')
//         {
//             const record = options.districtOptions.find((d: any) => d.id === value);
//             let loc: any = null;
//             if (record)
//             {
//                 loc = [record.Longitude, record.Latitude];
//             }

//             const newData = {
//                 ...adminData,
//                 district: value,
//                 ward: null,
//                 location: { type: 'Point', coordinates: loc },
//             };
//             setAdminData(newData);
//             onDataChange(newData);

//             await handleSelectAdmin(1, value);
//         }
//         else if (key === 'ward')
//         {
//             const record = options.wardOptions.find((d: any) => d.id === value);
//             let loc: any = null;
//             if (record)
//             {
//                 loc = [record.Longitude, record.Latitude];
//             }

//             const newData = {
//                 ...adminData,
//                 ward: value,
//                 location: { type: 'Point', coordinates: loc },
//             };
//             setAdminData(newData);
//             onDataChange(newData);
//         }
//         else
//         {
//             onDataChange({ ...adminData, [key]: value });
//         }
//     };

//     const handleLocationChange = async (coordinates: any) =>
//     {
//         const locationInfo = await administrativeService.reverseGeocode(coordinates[0], coordinates[1]);

//         if (!locationInfo)
//         {
//             const newData = {
//                 ...adminData,
//                 location: { type: 'Point', coordinates },
//             };
//             setAdminData(newData);

//             onDataChange(newData);

//             return;
//         }

//         const rs = await administrativeService.getAdminIdByName(locationInfo.province, locationInfo.district, locationInfo.ward);

//         await bindAdminOptions(rs.province, rs.district);

//         setTimeout(() =>
//         {
//             const newData = {
//                 ...adminData,
//                 location: { type: 'Point', coordinates },
//                 province: rs.province,
//                 district: rs.district,
//                 ward: rs.ward,
//                 street: locationInfo?.street,
//                 address: locationInfo?.shortAddress,
//                 postalCode,
//             };
//             setAdminData(newData);

//             onDataChange(newData);
//         }, 100);
//     };

//     return (
//         <FlexContainer direction={'column'}>
//             {/* <FormControlLabel
//                 label="Tìm kiếm"
//                 direction='column'
//                 control={() =>
//                 {
//                     return (
//                         <Input
//                             value={buildLocationStr()}
//                             placeholder="Nhập tọa độ tìm kiếm"
//                         />
//                     );
//                 }}
//             /> */}
//             <AdministrativeMap
//                 center={adminData.location.coordinates}
//                 onLocationChange={handleLocationChange}
//             />
//             <FormControlLabel
//                 label="Tỉnh/thành"
//                 direction='column'
//                 control={() =>
//                 {
//                     return (
//                         <MultipleSelect
//                             uniqueKey={'id'}
//                             selectText={'Chọn tỉnh/thành'}
//                             displayKey={'label'}
//                             selectedItems={[data.province]}
//                             items={options.stateOptions}
//                             single
//                             onSelectedItemsChange={(value: any) => handleDataChange('province', value[0])}
//                         />
//                     );
//                 }}
//                 required
//             />
//             <FormControlLabel
//                 label="Quận/huyện"
//                 direction='column'
//                 control={() =>
//                 {
//                     return (
//                         <MultipleSelect
//                             uniqueKey={'id'}
//                             selectText={'Chọn quận/huyện'}
//                             displayKey={'label'}
//                             selectedItems={[data.district]}
//                             items={options.districtOptions}
//                             single
//                             onSelectedItemsChange={(value: any) => handleDataChange('district', value[0])}
//                         />
//                     );
//                 }}
//                 required
//             />
//             <FormControlLabel
//                 label="Phường/xã"
//                 direction='column'
//                 control={() =>
//                 {
//                     return (
//                         <MultipleSelect
//                             uniqueKey={'id'}
//                             selectText={'Chọn phường/xã'}
//                             displayKey={'label'}
//                             selectedItems={[data.ward]}
//                             items={options.wardOptions}
//                             single
//                             onSelectedItemsChange={(value: any) => handleDataChange('ward', value[0])}
//                         />
//                     );
//                 }}
//                 required
//             />
//             <FormControlLabel
//                 label="Địa chỉ"
//                 direction='column'
//                 control={() =>
//                 {
//                     return (
//                         <Input
//                             value={data.address}
//                             placeholder="Nhập địa chỉ"
//                             onChangeText={(value: any) => handleDataChange('address', value)}
//                         />
//                     );
//                 }}
//             />
//         </FlexContainer>
//     );
// };

// Administrative.propTypes = {
//     data: PropTypes.any.isRequired,
//     onDataChange: PropTypes.func.isRequired,
//     administrativeService: PropTypes.any.isRequired,
//     valueField: PropTypes.string.isRequired,
//     displayField: PropTypes.string.isRequired,

// };

// export default Administrative;
