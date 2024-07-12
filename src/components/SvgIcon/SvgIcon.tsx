// all theme
// import storage from '../storage/mmkv';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import ViewMore from '../../assets/sgv-icon/map/view-more.svg';
import ViewMoreActive from '../../assets/sgv-icon/map/view-more-active.svg';
import HumbugerMenu from '../../assets/sgv-icon/header/bar-menu.svg';
import Edit from '../../assets/sgv-icon/header/edit.svg';
import Bell from '../../assets/sgv-icon/header/bell.svg';
import Back from '../../assets/sgv-icon/header/back.svg';
import RedDot from '../../assets/sgv-icon/header/redDot.svg';
import AccountSetting from '../../assets/sgv-icon/side-menu/account-setting.svg';
import Avatar from '../../assets/sgv-icon/side-menu/avatar-empty2.svg';
import Logout from '../../assets/sgv-icon/side-menu/logout.svg';
import Setting from '../../assets/sgv-icon/side-menu/setting.svg';
import Sovereign from '../../assets/sgv-icon/side-menu/sovereign.svg';
import UsersSetting from '../../assets/sgv-icon/side-menu/users-setting.svg';
import AvatarPicker from '../../assets/sgv-icon/user-info/avata-picker.svg';
import BlueLine from '../../assets/sgv-icon/user-info/blue-line.svg';
import DownArrow from '../../assets/sgv-icon/user-info/down-arrow.svg';
import TopArrow from '../../assets/sgv-icon/user-info/top-arrow.svg';
import Setting2 from '../../assets/sgv-icon/user-info/setting.svg';
import Art from '../../assets/sgv-icon/change-password/art.svg';
import ChangeCapcha from '../../assets/sgv-icon/change-password/change-capcha.svg';
import EyeHiddentResetPass from '../../assets/sgv-icon/change-password/eye-hiddent.svg';
import EyeShowResetPass from '../../assets/sgv-icon/change-password/eye-show.svg';
import Warning from '../../assets/sgv-icon/change-password/warning-pass.svg';
import Tick from '../../assets/sgv-icon/change-password/tick.svg';
import ArrowRight from '../../assets/sgv-icon/system-setting/arrow-right.svg';
import DownloadCloud from '../../assets/sgv-icon/system-setting/download-cloud.svg';
import Log from '../../assets/sgv-icon/system-setting/log.svg';
import Theme from '../../assets/sgv-icon/system-setting/theme.svg';
import Version from '../../assets/sgv-icon/system-setting/version.svg';
import Wifi from '../../assets/sgv-icon/system-setting/wifi.svg';
import DownArrowSmall from '../../assets/sgv-icon/system-setting/drop-down.svg';
import SwithOn from '../../assets/sgv-icon/system-setting/swithOn.svg';
import SwithOff from '../../assets/sgv-icon/system-setting/swithOff.svg';
import Close from '../../assets/sgv-icon/side-menu/close.svg';
import QrCode from '../../assets/sgv-icon/side-menu/qr-code.svg';
import UrlIcon from '../../assets/sgv-icon/side-menu/url-icon.svg';
import ArrowRightBack from '../../assets/sgv-icon/input-sever/arrow-right.svg';
import QrCodeWhite from '../../assets/sgv-icon/input-sever/qr-code.svg';
import QrCodeBlack from '../../assets/sgv-icon/input-sever/qr-code-black.svg';
import QrCodeNoBorder from '../../assets/sgv-icon/input-sever/qrCodenoborder.svg';
import UrlWhite from '../../assets/sgv-icon/input-sever/url.svg';
import BgLogin from '../../assets/sgv-icon/input-sever/bgr-login.svg';
import LogoApp from '../../assets/sgv-icon/input-sever/logo_app.svg';
import LogoAppLight from '../../assets/sgv-icon/input-sever/logo-app-light.svg';
import IntelomaticLogo from '../../assets/sgv-icon/input-sever/intelomatic-logo.svg';
import EyeHiddent from '../../assets/sgv-icon/login/eye-hiddent.svg';
import EyeShow from '../../assets/sgv-icon/login/eye-show.svg';
import EyeHiddentBlack from '../../assets/sgv-icon/login/eye-hiddentBlack.svg';
import EyeShowBlack from '../../assets/sgv-icon/login/eye-showBlack.svg';
import Pass from '../../assets/sgv-icon/login/pass.svg';
import PassBlue from '../../assets/sgv-icon/login/passBlue.svg';
import User from '../../assets/sgv-icon/login/user.svg';
import UserBlue from '../../assets/sgv-icon/login/userBlue.svg';
import MyLocation from '../../assets/sgv-icon/map/my-location.svg';
import Maplayer from '../../assets/sgv-icon/map/layers_24px.svg';
import MyLocationActive from '../../assets/sgv-icon/map/my-location-active.svg';
import Wifi2 from '../../assets/sgv-icon/system-setting/wifi2.svg';
import BellBlue from '../../assets/sgv-icon/notification/bell.svg';
import BlueCircle from '../../assets/sgv-icon/notification/blueCircle.svg';
import Clear from '../../assets/sgv-icon/notification/clear.svg';
import DotOva from '../../assets/sgv-icon/notification/dotOva.svg';
import WarningHeader from '../../assets/sgv-icon/header/warning.svg';
import ArrowLeftBack from '../../assets/sgv-icon/input-sever/arrow-left.svg';
import History from '../../assets/sgv-icon/worker-detail/history.svg';
import Directions from '../../assets/sgv-icon/worker-detail/directions.svg';
import Phone from '../../assets/sgv-icon/worker-detail/phone.svg';
import Status from '../../assets/sgv-icon/worker-detail/status.svg';
import Call from '../../assets/sgv-icon/list-worker/call.svg';
import Team from '../../assets/sgv-icon/list-worker/team.svg';
import Others from '../../assets/sgv-icon/worker-detail/others.svg';
import RightArrow from '../../assets/sgv-icon/worker-detail/right-arrow.svg';
import HistoryTrackingCancel from '../../assets/sgv-icon/history-traking/cancel.svg';
import Online from '../../assets/sgv-icon/list-worker/online.svg';
import Offline from '../../assets/sgv-icon/list-worker/offline.svg';
import DataCheckbox from '../../assets/sgv-icon/worker-detail/data-checkbox.svg';
import DataDecimal from '../../assets/sgv-icon/worker-detail/data-decimal.svg';
import DataNumber from '../../assets/sgv-icon/worker-detail/data-number.svg';
import DataRichText from '../../assets/sgv-icon/worker-detail/data-rich-text.svg';
import DataString from '../../assets/sgv-icon/worker-detail/data-string.svg';
import DataTextArea from '../../assets/sgv-icon/worker-detail/data-text-area.svg';
import Driver from '../../assets/sgv-icon/list-worker/driver.svg';
import ArrowBackLight from '../../assets/sgv-icon/filter/BackLigth.svg';
import ArrowBackDark from '../../assets/sgv-icon/filter/BackDark.svg';
import CheckBlue from '../../assets/sgv-icon/multipleSelect/checkBlue.svg';
import ArrowBackGray from '../../assets/sgv-icon/filter/BackGray.svg';
import Ruler from '../../assets/sgv-icon/map/ruler.svg';
import RulerActive from '../../assets/sgv-icon/map/ruler-active.svg';
import Keyboard from '../../assets/sgv-icon/login/keyboard.svg';
import LoginCode from '../../assets/sgv-icon/login/login-code.svg';
import CheckBoxLogin from '../../assets/sgv-icon/login/Checkbox.svg';
import Pencil from '../../assets/sgv-icon/job-detail/pencil.svg';
import Language from '../../assets/sgv-icon/login/language.svg';
import IsSync from '../../assets/sgv-icon/list-job/isSync.svg';
import NotSync from '../../assets/sgv-icon/list-job/notSync.svg';
import SettingHeader from '../../assets/sgv-icon/header/settingHeader.svg';
import OfflineScreen from '../../assets/sgv-icon/home/offline.svg';
import FlagPriority from '../../assets/sgv-icon/list-job/flag.svg';
import ClockPurple from '../../assets/sgv-icon/history-traking/clockPurple.svg';
import ClockGreen from '../../assets/sgv-icon/history-traking/clockGreen.svg';
import ClockBlue from '../../assets/sgv-icon/history-traking/clockBlue.svg';
import ClockRed from '../../assets/sgv-icon/history-traking/clockRed.svg';
import Bike from '../../assets/sgv-icon/list-worker/bike.svg';
import Bag from '../../assets/sgv-icon/list-worker/bag.svg';
import Filter from '../../assets/sgv-icon/filter/light/filter.svg';
import FilterDark from '../../assets/sgv-icon/filter/dark/filter.svg';
import FilterChecked from '../../assets/sgv-icon/filter/light/filterHaveData.svg';
import FilterCheckedDark from '../../assets/sgv-icon/filter/dark/filterHaveData.svg';
import DisableFilter from '../../assets/sgv-icon/filter/disableFilter.svg';
import MapIcon from '../../assets/sgv-icon/side-menu/mapIcon.svg';
import Dashboard from '../../assets/sgv-icon/home/dashboard.svg';


// map veh
import Walk from '../../assets/sgv-icon/map/veh/icon_walk.svg';
import MotorBike from '../../assets/sgv-icon/map/veh/icon_2w.svg';
import Transit from '../../assets/sgv-icon/map/veh/icon_transit.svg';
import Car from '../../assets/sgv-icon/map/veh/icon_car.svg';

import WalkActive from '../../assets/sgv-icon/map/veh/icon_walk_active.svg';
import MotorBikeActive from '../../assets/sgv-icon/map/veh/icon_2w_active.svg';
import TransitActive from '../../assets/sgv-icon/map/veh/icon_transit_active.svg';
import CarActive from '../../assets/sgv-icon/map/veh/icon_car_active.svg';

import Search from '../../assets/sgv-icon/filter/search.svg';
import Search2 from '../../assets/sgv-icon/filter/search2.svg';
import DirectorWhite from '../../assets/sgv-icon/worker-detail/DirectorWhite.svg';
import Director2 from '../../assets/sgv-icon/worker-detail/Director2.svg';
import PhoneWhite from '../../assets/sgv-icon/worker-detail/PhoneWhite.svg';
import Phone2 from '../../assets/sgv-icon/worker-detail/Phone2.svg';
import HistoryWhite from '../../assets/sgv-icon/worker-detail/HistoryWhite.svg';
import MenuWhite from '../../assets/sgv-icon/worker-detail/MenuWhite.svg';
import MenuBlue from '../../assets/sgv-icon/worker-detail/MenuBlue.svg';
import Map from '../../assets/sgv-icon/map/map.svg';
import MapDark from '../../assets/sgv-icon/map/mapDark.svg';
import MapActive from '../../assets/sgv-icon/map/mapActive.svg';
import MarkerLocation from '../../assets/sgv-icon/map/Vector.svg';

import CheckFilter from '../../assets/sgv-icon/filter/checkFilter.svg';
import WorkerList from '../../assets/sgv-icon/bottomTabs/worker.svg';
import JobList from '../../assets/sgv-icon/bottomTabs/job.svg';
import ChartBar from '../../assets/sgv-icon/bottomTabs/chart.svg';
import JobListTheme2 from '../../assets/sgv-icon/bottomTabs/jobTheme2.svg';
import ChartBarTheme2 from '../../assets/sgv-icon/bottomTabs/chartTheme2.svg';
import JobListTheme2Active from '../../assets/sgv-icon/bottomTabs/jobTheme2Active.svg';
import ChartBarTheme2Active from '../../assets/sgv-icon/bottomTabs/chartTheme2Active.svg';
import EyeScan from '../../assets/sgv-icon/bottomTabs/eye-scan.svg';
import EyeScanActive from '../../assets/sgv-icon/bottomTabs/eye-scan-active.svg';
import ThreeDot from '../../assets/sgv-icon/map/threeDot.svg';

// light theme
import BellLight from '../../assets/sgv-icon/list-worker/light/bell-light.svg';
import BackLight from '../../assets/sgv-icon/list-worker/light/back-light.svg';
import EmailLight from '../../assets/sgv-icon/worker-detail/light/email-light.svg';
import UsernameLight from '../../assets/sgv-icon/worker-detail/light/username-light.svg';
import WorkertypeLight from '../../assets/sgv-icon/worker-detail/light/workertype-light.svg';
import TeamLight from '../../assets/sgv-icon/worker-detail/light/teamname-light.svg';
import OrganizationLight from '../../assets/sgv-icon/worker-detail/light/organization-light.svg';
import DatetimeLight from '../../assets/sgv-icon/worker-detail/light/datetime-light.svg';
import ComboboxLight from '../../assets/sgv-icon/worker-detail/light/combobox-light.svg';
import ReplayLight from '../../assets/sgv-icon/header/light/replay-light.svg';
import DoneallLight from '../../assets/sgv-icon/header/light/doneall-light.svg';
import CheckfilterLight from '../../assets/sgv-icon/list-worker/light/checkfilter-light.svg';
import CheckLight from '../../assets/sgv-icon/list-worker/light/check-light.svg';
import CheckBoxUnCheckLight from '../../assets/sgv-icon/login/light/checkbox-uncheck.svg';
import CheckBoxCheckLight from '../../assets/sgv-icon/login/light/checkbox-check.svg';
import CalendarLight from '../../assets/sgv-icon/common/light/calendar.svg';
import HistoryTrackingLocaion from '../../assets/sgv-icon/history-traking/light/location.svg';
import HistoryTrackingClock from '../../assets/sgv-icon/history-traking/light/clock.svg';
import BackBlack from '../../assets/sgv-icon/header/light/backBlack.svg';
import AddreshLight from '../../assets/sgv-icon/list-job/light/address.svg';
import AccountSettingLight from '../../assets/sgv-icon/side-menu/light/account-setting.svg';
import DisableFilterLight from '../../assets/sgv-icon/filter/light/filterDisableLight.svg';


// dark theme
import BellDark from '../../assets/sgv-icon/list-worker/dark/bell-dark.svg';
import BackDark from '../../assets/sgv-icon/list-worker/dark/back-dark.svg';
import EmailDark from '../../assets/sgv-icon/worker-detail/dark/email-dark.svg';
import UsernameDark from '../../assets/sgv-icon/worker-detail/dark/username-dark.svg';
import WorkertypeDark from '../../assets/sgv-icon/worker-detail/dark/workertype-dark.svg';
import TeamDark from '../../assets/sgv-icon/worker-detail/dark/teamname-dark.svg';
import OrganizationDark from '../../assets/sgv-icon/worker-detail/dark/organization-dark.svg';
import DatetimeDark from '../../assets/sgv-icon/worker-detail/dark/datetime-dark.svg';
import ComboboxDark from '../../assets/sgv-icon/worker-detail/dark/combobox-dark.svg';
import ReplayDark from '../../assets/sgv-icon/header/dark/replay-dark.svg';
import DoneallDark from '../../assets/sgv-icon/header/dark/doneall-dark.svg';
import CheckfilterDark from '../../assets/sgv-icon/list-worker/dark/checkfilter-dark.svg';
import CheckDark from '../../assets/sgv-icon/list-worker/dark/check-dark.svg';
import CheckBoxUnCheckDark from '../../assets/sgv-icon/login/dark/checkbox-uncheck.svg';
import CheckBoxCheckDark from '../../assets/sgv-icon/login/dark/checkbox-check.svg';
import CalendarDark from '../../assets/sgv-icon/common/dark/calendar.svg';
import SystemSettingSettingCpn from '../../assets/sgv-icon/setting/SystemSetting.svg';
import MapSettingCpn from '../../assets/sgv-icon/setting/Map.svg';
import CloudSettingCpn from '../../assets/sgv-icon/setting/Cloud.svg';
import UserSettingCpn from '../../assets/sgv-icon/setting/User.svg';
import CreateImagesAttachment from '../../assets/sgv-icon/job-report/icon-create-images-attachment.svg';
import CheckedGreenCircle from '../../assets/sgv-icon/permission/checked.svg';
import HistoryTrackingLocaionDark from '../../assets/sgv-icon/history-traking/dark/location.svg';
import HistoryTrackingClockDark from '../../assets/sgv-icon/history-traking/dark/clock.svg';
import BackWhite from '../../assets/sgv-icon/header/dark/backBlack.svg';
import AddreshDark from '../../assets/sgv-icon/list-job/dark/address.svg';
import AccountSettingDark from '../../assets/sgv-icon/side-menu/dark/account-setting.svg';
import DisableFilterDank from '../../assets/sgv-icon/filter/dark/filterDisableDank.svg';


// map directions

import DUnTurn from '../../assets/sgv-icon/map-direction/direction_uturn.svg';
import DTurnStaight from '../../assets/sgv-icon/map-direction/direction_turn_straight.svg';
import DTurnSlightRight from '../../assets/sgv-icon/map-direction/direction_turn_slight_right.svg';
import DTurnSlightLeft from '../../assets/sgv-icon/map-direction/direction_turn_slight_left.svg';
import DTurnSharpRight from '../../assets/sgv-icon/map-direction/direction_turn_sharp_right.svg';
import DTurnSharpLeft from '../../assets/sgv-icon/map-direction/direction_turn_sharp_left.svg';
import DTurnRight from '../../assets/sgv-icon/map-direction/direction_turn_right.svg';
import DTurnLeft from '../../assets/sgv-icon/map-direction/direction_turn_left.svg';
import DRoundabout from '../../assets/sgv-icon/map-direction/direction_roundabout.svg';
import DRotary from '../../assets/sgv-icon/map-direction/direction_rotary.svg';
import DDepartStraight from '../../assets/sgv-icon/map-direction/direction_depart_straight.svg';
import DContinue from '../../assets/sgv-icon/map-direction/direction_continue.svg';
import DContinueStraight from '../../assets/sgv-icon/map-direction/direction_continue_straight.svg';
import DArive from '../../assets/sgv-icon/map-direction/direction_arrive.svg';
import DAriveStraight from '../../assets/sgv-icon/map-direction/direction_arrive_straight.svg';
import DataEmpty from '../../assets/sgv-icon/shared/dataEmpty.svg';
import NoConnect from '../../assets/sgv-icon/shared/no-connection.svg';
import NoJob from '../../assets/sgv-icon/shared/no-location.svg';

import NoNetWork from '../../assets/sgv-icon/map/noNetwork.svg';
import UpDown from '../../assets/sgv-icon/map-direction/up-down.svg';


import ICDefault from '../../assets/sgv-icon/common/ic-default.svg';
import AngleUp from '../../assets/sgv-icon/common/angle-up.svg';
import Colors from '../theme/colors';

import PinMarker from '../../assets/sgv-icon/bottomTabs/location.svg';
import CarBottomTab from '../../assets/sgv-icon/bottomTabs/car.svg';
import CarBottomTabActive from '../../assets/sgv-icon/bottomTabs/car-active.svg';
import NotificationBottomTab from '../../assets/sgv-icon/bottomTabs/notification.svg';
import NotificationBottomTabActive from '../../assets/sgv-icon/bottomTabs/notification-active.svg';
import BellOWhite from '../../assets/sgv-icon/bottomTabs/bell-o-white.svg';
import VectorChart from '../../assets/sgv-icon/bottomTabs/Vector.svg';
import Person from '../../assets/sgv-icon/job-detail/person.svg';

import SortAzLight from '../../assets/sgv-icon/list-job/light/sortAz.svg';
import SortAzDark from '../../assets/sgv-icon/list-job/dark/sortAz.svg';


import Option from '../../assets/sgv-icon/common/option.svg';
import SelectPoint from '../../assets/sgv-icon/map/select-point.svg';

import Camera from '../../assets/sgv-icon/filter/camera.svg';

import Draft from '../../assets/sgv-icon/colector/draft.svg';
import DatePicker from '../../assets/sgv-icon/job-detail/datePicker.svg';
// import Director2 from '../../assets/sgv-icon/worker-detail/Director2.svg';
import ShowMap from '../../assets/sgv-icon/worker-detail/Director2.svg';

export type Props = {
    name?: string;
    height?: string | number;
    width?: string | number;
    size?: number | string;
    color?: string;
};


const SvgIcon: React.FC<Props> = ({
    name,
    height,
    width,
    size,
    color,
}) =>
{
    // const themeMode = storage.getString('THEME_MODE');
    const themeMode = 'light';
    let icon;
    switch (name)
    {
        case 'humbuger menu':
            icon = <HumbugerMenu />;
            return icon;
        case 'filter':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <Filter
                                width={width ? width : 21}
                                height={height ? height : 21}
                            />
                        )
                    : (
                            <FilterDark
                                width={width ? width : 21}
                                height={height ? height : 21}
                            />
                        )
            );
            return icon;
        case 'sortAz':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <SortAzLight />
                        )
                    : (
                            <SortAzDark />
                        )
            );
            return icon;
        case 'filter checked':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <FilterChecked
                                width={width ? width : 26}
                                height={height ? height : 26}
                            />
                        )
                    : (
                            <FilterCheckedDark
                                width={width ? width : 26}
                                height={height ? height : 26}
                            />
                        )
            );
            return icon;
        case 'setting2':
            icon = <Setting2 />;
            return icon;
        case 'checked filter':
            icon = <CheckFilter />;
            return icon;
        case 'edit':
            icon = <Edit />;
            return icon;
        case 'bell':
            icon = <Bell />;
            return icon;
        case 'back':
            icon = <Back />;
            return icon;
        case 'red dot':
            icon = <RedDot />;
            return icon;
        case 'account setting':
            icon = (
                <AccountSetting
                    fill={color ?? 'white'}
                />
            );
            return icon;
        case 'avata':
            icon = (
                <Avatar
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'logout':
            icon = <Logout />;
            return icon;
        case 'setting':
            icon = (
                <Setting
                    width={size ?? 30}
                    height={size ?? 30}
                    fill={color ?? '#168FE7'}
                />
            );
            return icon;
        case 'sovereign':
            icon = <Sovereign />;
            return icon;
        case 'users setting':
            icon = (
                <UsersSetting
                    width={size ?? 30}
                    height={size ?? 30}
                    fill={color ?? '#168FE7'}
                />
            );
            return icon;
        case 'avatar picker':
            icon = <AvatarPicker />;
            return icon;
        case 'blue line':
            icon = <BlueLine />;
            return icon;
        case 'down arrow':
            icon = <DownArrow />;
            return icon;
        case 'top arrow':
            icon = <TopArrow />;
            return icon;
        case 'art':
            icon = (
                <Art
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'change capcha':
            icon = <ChangeCapcha />;
            return icon;
        case 'eye hiddent reset pass':
            icon = (
                <EyeHiddentResetPass
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'eye show reset pass':
            icon = (
                <EyeShowResetPass
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'warning':
            icon = <Warning />;
            return icon;
        case 'tick':
            icon = <Tick />;
            return icon;
        case 'arrow right':
            icon = <ArrowRight />;
            return icon;
        case 'download cloud':
            icon = <DownloadCloud />;
            return icon;
        case 'log':
            icon = <Log />;
            return icon;
        case 'theme':
            icon = <Theme />;
            return icon;
        case 'version':
            icon = <Version />;
            return icon;
        case 'wifi':
            icon = <Wifi />;
            return icon;
        case 'down arrow small':
            icon = <DownArrowSmall />;
            return icon;
        case 'swith on':
            icon = <SwithOn />;
            return icon;
        case 'swith off':
            icon = <SwithOff />;
            return icon;
        case 'close':
            icon = <Close fill={color ?? 'white'} />;
            return icon;
        case 'qr code':
            icon = <QrCode />;
            return icon;
        case 'url':
            icon = <UrlIcon />;
            return icon;
        case 'arrow right back':
            icon = <ArrowRightBack />;
            return icon;
        case 'qr code white':
            icon = <QrCodeWhite />;
            return icon;
        case 'qr code black':
            icon = <QrCodeBlack />;
            return icon;
        case 'url white':
            icon = <UrlWhite />;
            return icon;
        case 'bg login':
            icon = <BgLogin style={styles.bgImg} />;
            return icon;
        case 'logo-app':
            icon = <LogoApp />;
            return icon;
        case 'logo-app-light':
            icon = <LogoAppLight />;
            return icon;
        case 'intelomatic-logo':
            icon = (
                <IntelomaticLogo
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'eye hiddent':
            icon = (
                <EyeHiddent
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'eye show':
            icon = (
                <EyeShow
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'eye show black':
            icon = (
                <EyeShowBlack
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'eye hidden black':
            icon = (
                <EyeHiddentBlack
                    width={size}
                    height={size}
                    fill={color}
                    background="none"
                />
            );
            return icon;
        case 'pass':
            icon = (
                <Pass
                    width={size ?? 20}
                    height={size ?? 20}
                    fill={color ?? 'white'}
                />
            );
            return icon;
        case 'pass blue':
            icon = (
                <PassBlue
                    width={size ?? 20}
                    height={size ?? 20}
                />
            );
            return icon;
        case 'user':
            icon = (
                <User
                    width={size ?? 20}
                    height={size ?? 20}
                    fill={color ?? 'white'}
                />
            );
            return icon;
        case 'user blue':
            icon = <UserBlue />;
            return icon;
        case 'my location':
            icon = <MyLocation />;
            return icon;
        case 'map layer':
            icon = (
                <Maplayer
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                    fill={color ?? 'white'}
                />
            );
            return icon;
        case 'my location active':
            icon = <MyLocationActive />;
            return icon;
        case 'wifi2':
            icon = <Wifi2 />;
            return icon;
        case 'bell blue':
            icon = <BellBlue />;
            return icon;
        case 'blue circle':
            icon = <BlueCircle />;
            return icon;
        case 'clear':
            icon = <Clear />;
            return icon;
        case 'dot ova':
            icon = <DotOva />;
            return icon;
        case 'warning header':
            icon = <WarningHeader />;
            return icon;
        case 'arrow left back':
            icon = <ArrowLeftBack />;
            return icon;
        case 'history':
            icon = <History />;
            return icon;
        case 'directions':
            icon = <Directions />;
            return icon;
        case 'phone':
            icon = <Phone />;
            return icon;
        case 'status':
            icon = <Status />;
            return icon;
        case 'call':
            icon = (
                <Call
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'team':
            icon = (
                <Team
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'user name':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <UsernameLight />
                        )
                    : (
                            <UsernameDark />
                        )
            );
        case 'email':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <EmailLight />
                        )
                    : (
                            <EmailDark />
                        )
            );
        case 'worker type':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <WorkertypeLight
                                fill = {color ?? '#1C1C1C'}
                            />
                        )
                    : (
                            <WorkertypeDark
                                fill = {color ?? 'white'}
                            />
                        )
            );
        case 'team name':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <TeamLight />
                        )
                    : (
                            <TeamDark />
                        )
            );
        case 'organization':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <OrganizationLight />
                        )
                    : (
                            <OrganizationDark />
                        )
            );
        case 'others':
            icon = <Others />;
            return icon;
        case 'right arrow':
            icon = <RightArrow />;
            return icon;
        case 'history tracking location':
            icon = (themeMode === 'light' || themeMode === 'light2')
                ? (
                        <HistoryTrackingLocaion />
                    )
                : (
                        <HistoryTrackingLocaionDark />
                    );
            return icon;
        case 'history tracking clock':
            icon = (themeMode === 'light' || themeMode === 'light2')
                ? (
                        <HistoryTrackingClock />
                    )
                : (
                        <HistoryTrackingClockDark />
                    );
            return icon;
        case 'history tracking cancel':
            icon = <HistoryTrackingCancel />;
            return icon;
        case 'white direction':
            icon = <DirectorWhite />;
            return icon;
        case 'white phone':
            icon = <PhoneWhite />;
            return icon;
        case 'white history':
            icon = <HistoryWhite />;
            return icon;
        case 'white menu':
            icon = <MenuWhite />;
            return icon;
        case 'blue menu':
            icon = <MenuBlue />;
            return icon;
        case 'map':
            icon = (themeMode === 'light' || themeMode === 'light2')
                ? (
                        <Map />
                    )
                : (
                        <MapDark />
                    );
            return icon;
        case 'map active':
            icon = <MapActive />;
            return icon;
        case 'marker Location':
            icon = <MarkerLocation />;
            return icon;
        case 'online':
            icon = <Online />;
            return icon;
        case 'offline':
            icon = <Offline fill={color ?? '#939393'} />;
            return icon;
        case 'bell black':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <BellLight />
                        )
                    : (
                            <BellDark />
                        )
            );
            return icon;
        case 'back black':
            return (
                icon = (
                    (themeMode === 'light' || themeMode === 'light2')
                        ? (
                                <BackLight />
                            )
                        : (
                                <BackDark />
                            )
                )
            );
        case 'replay':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <ReplayLight />
                        )
                    : (
                            <ReplayDark />
                        )
            );
        case 'done all':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <DoneallLight />
                        )
                    : (
                            <DoneallDark />
                        )
            );
        case 'data checkbox':
            icon = <DataCheckbox />;
            return icon;
        case 'data combo box':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <ComboboxLight />
                        )
                    : (
                            <ComboboxDark />
                        )
            );
        case 'data date time':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <DatetimeLight />
                        )
                    : (
                            <DatetimeDark />
                        )
            );
        case 'data decimal':
            icon = <DataDecimal />;
            return icon;
        case 'data number':
            icon = <DataNumber />;
            return icon;
        case 'data rich text':
            icon = <DataRichText />;
            return icon;
        case 'data string':
            icon = <DataString />;
            return icon;
        case 'data text area':
            icon = <DataTextArea />;
            return icon;
        case 'driver':
            icon = (
                <Driver
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'ArrowBack':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <ArrowBackLight />
                        )
                    : (
                            <ArrowBackDark />
                        )
            );
            return icon;
        case 'ArrowBackDark':
            return <ArrowBackDark />;
        case 'ArrowBackGray':
            return <ArrowBackGray />;
        case 'Search':
            icon = (
                <Search
                    name="Search"
                />
            );
            return icon;
        case 'check filter':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <CheckfilterLight />
                        )
                    : (
                            <CheckfilterDark />
                        )
            );
        case 'check':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <CheckLight />
                        )
                    : (
                            <CheckDark />
                        )
            );
        case 'checkbox check':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <CheckBoxCheckLight
                                width={size}
                                height={size}
                            />
                        )
                    : (
                            <CheckBoxCheckDark
                                width={size}
                                height={size}
                            />
                        )
            );
        case 'checkbox uncheck':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <CheckBoxUnCheckLight
                                width={size}
                                height={size}
                            />
                        )
                    : (
                            <CheckBoxUnCheckDark
                                width={size}
                                height={size}
                            />
                        )
            );
        case 'calendar':
            return (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <CalendarLight />
                        )
                    : (
                            <CalendarDark />
                        )
            );
        case 'worker':
            icon = (
                <WorkerList
                    fill={color ?? 'white'}
                />
            );
            return icon;
        case 'job':
            icon = (
                <JobList
                    width={size}
                    height={size}
                    fill={color}

                />
            );
            return icon;
        case 'dashboard':
            icon = (
                <ChartBar
                    width={size}
                    height={size}
                    fill={color}

                />
            );
            return icon;
        case 'job theme2':
            icon = (
                <JobListTheme2 />
            );
            return icon;
        case 'dashboard theme2':
            icon = (
                <ChartBarTheme2 />
            );
            return icon;
        case 'job theme2 active':
            icon = (
                <JobListTheme2Active />
            );
            return icon;
        case 'dashboard theme2 active':
            icon = (
                <ChartBarTheme2Active />
            );
            return icon;
        case 'eye scan':
            icon = (
                <EyeScan
                    width={width ?? 24}
                    height={height ?? 24}
                />
            );
            return icon;
        case 'eye scan active':
            icon = (
                <EyeScanActive
                    width={width ?? 24}
                    height={height ?? 24}
                />
            );
            return icon;
        case 'check blue':
            icon = (
                <CheckBlue />);
            return icon;

        case 'SystemSettingSettingCpn':
            icon = (
                <SystemSettingSettingCpn />
            );
            return icon;
        case 'MapSettingCpn':
            icon = (
                <MapSettingCpn />
            );
            return icon;
        case 'CloudSettingCpn':
            icon = (
                <CloudSettingCpn />
            );
            return icon;
        case 'UserSettingCpn':
            icon = (
                <UserSettingCpn />
            );
            return icon;

        case 'createImgAttachment':
            icon = (
                <CreateImagesAttachment fill={color ? color : '#939393'} />
            );
            return icon;
        case 'checked green Circle':
            icon = (
                <CheckedGreenCircle fill={color} />);
            return icon;
        case 'map-veh-walk':
            icon = (
                <Walk />
            );
            return icon;
        case 'map-veh-car':
            icon = (
                <Car />
            );
            return icon;
        case 'map-veh-2w':
            icon = (
                <MotorBike />
            );
            return icon;
        case 'map-veh-transit':
            icon = (
                <Transit />
            );
            return icon;
        case 'map-veh-walk-active':
            icon = (
                <WalkActive />
            );
            return icon;
        case 'map-veh-car-active':
            icon = (
                <CarActive />
            );
            return icon;
        case 'map-veh-2w-active':
            icon = (
                <MotorBikeActive />
            );
            return icon;
        case 'map-veh-transit-active':
            icon = (
                <TransitActive />
            );
            return icon;
        case 'direction_continue':
            icon = (
                <DContinue
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_continue_straight':
            icon = (
                <DContinueStraight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_slight_right':
            icon = (
                <DTurnSlightRight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_right':
            icon = (
                <DTurnRight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_sharp_right':
            icon = (
                <DTurnSharpRight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_uturn':
            icon = (
                <DUnTurn
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_sharp_left':
            icon = (
                <DTurnSharpLeft
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_left':
            icon = (
                <DTurnLeft
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_slight_left':
            icon = (
                <DTurnSlightLeft
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_arrive_straight':
            icon = (
                <DAriveStraight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_roundabout':
            icon = (
                <DRoundabout
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_depart_straight':
            icon = (
                <DDepartStraight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_rotary':
            icon = (
                <DRotary
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_turn_straight':
            icon = (
                <DTurnStaight
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'direction_arrive':
            icon = (
                <DArive
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'data empty':
            icon = (
                <DataEmpty
                    height={size}
                    width={size}
                />
            );
            return icon;
        case 'no connect':
            icon = (
                <NoConnect
                    height={size}
                    width={size}
                />
            );
            return icon;
        case 'no job':
            icon = (
                <NoJob
                    height={size}
                    width={size}
                />
            );
            return icon;
        case 'no network':
            icon = <NoNetWork />;
            return icon;
        case 'ruler':
            icon = <Ruler />;
            return icon;
        case 'ruler-active':
            icon = <RulerActive />;
            return icon;
        case 'keyboard':
            icon = <Keyboard />;
            return icon;
        case 'login-code':
            icon = <LoginCode />;
            return icon;
        case 'checkbox':
            icon = <CheckBoxLogin />;
            return icon;
        case 'view-more-active':
            icon = <ViewMoreActive />;
            return icon;
        case 'view-more':
            icon = <ViewMore />;
            return icon;
        case 'pencil':
            icon = <Pencil />;
            return icon;
        case 'language':
            icon = <Language />;
            return icon;
        case 'ic_default':
            icon = (
                <ICDefault
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'angle-up':
            icon = (
                <AngleUp
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'pin':
            icon = (
                <PinMarker
                    width={size}
                    height={size}
                    fill={color}
                />
            );
            return icon;
        case 'vectorChart':
            icon = (
                <VectorChart
                    width={size}
                    height={size}
                    fill={color}
                />
            );
            return icon;
        case 'up-down':
            icon = (
                <UpDown
                    width={width}
                    height={height}
                    fill={Colors.OnSurfaceVariants}
                />
            );
            return icon;
        case 'up-down-active':
            icon = (
                <UpDown
                    width={width}
                    height={height}
                    fill={Colors.OnSurface}
                />
            );
            return icon;
        case 'qrCodeNoBorder':
            icon = (
                <QrCodeNoBorder
                    width={size}
                    height={size}
                    fill={color}
                />
            );
            return icon;
        case 'isSync':
            icon = (
                <IsSync
                    width={width}
                    height={height}
                />
            );
            return icon;

        case 'notSync':
            icon = (
                <NotSync
                    width={width}
                    height={height}
                />
            );
            return icon;
        case 'flag priority':
            icon = (
                <FlagPriority
                    fill={color}
                    width={size}
                    height={size}
                />
            );

            return icon;

        case 'option':
            icon = (
                <Option
                    width={size}
                    height={size}
                    fill={color}
                />
            );
            return icon;
        case 'settingHeader':
            icon = (
                <SettingHeader
                    width={size}
                    height={size}
                />
            );
            return icon;
        case 'Person':
            icon = (
                <Person
                    width={size}
                    height={size}
                    fill={color}
                />
            );
            return icon;
        case 'back black2':
            return (
                icon = (
                    (themeMode === 'light' || themeMode === 'light2')
                        ? (
                                <BackBlack />
                            )
                        : (
                                <BackWhite />
                            )
                )
            );
        case 'addresh':
            return (
                icon = (
                    (themeMode === 'light' || themeMode === 'light2')
                        ? (
                                <AddreshLight />
                            )
                        : (
                                <AddreshDark />
                            )
                )
            );
        case 'direction2':
            icon = <Director2 />;
            return icon;
        case 'phone2':
            icon = <Phone2 />;
            return icon;
        case 'offlineScreen':
            icon = (
                <OfflineScreen
                    width={size}
                    height={size}
                />
            );
            return icon;
        case 'AccountSettingTheme':
            icon = (themeMode === 'light' || themeMode === 'light2')
                ? (
                        <AccountSettingLight />
                    )
                : (
                        <AccountSettingDark />
                    );
            return icon;
        case 'clock purple':
            icon = <ClockPurple />;
            return icon;
        case 'clock green':
            icon = <ClockGreen />;
            return icon;
        case 'clock blue':
            icon = <ClockBlue />;
            return icon;
        case 'clock red':
            icon = <ClockRed />;
            return icon;
        case 'bike':
            icon = (
                <Bike
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'bag':
            icon = (
                <Bag
                    width={width ? width : '100%'}
                    height={height ? height : '100%'}
                />
            );
            return icon;
        case 'disable filter':
            icon = (
                (themeMode === 'light' || themeMode === 'light2')
                    ? (
                            <DisableFilterLight
                                width={width ? width : 26}
                                height={height ? height : 26}
                            />
                        )
                    : (
                            <DisableFilterDank
                                width={width ? width : 26}
                                height={height ? height : 26}
                            />
                        )
            );
            return icon;
        case 'disable filter 2':
            icon = <DisableFilter />;
            return icon;
        case 'dashboard-home':
            icon = (
                <Dashboard
                    fill={color}
                />
            );
            return icon;
        case 'select point':
            icon = <SelectPoint />;
            return icon;
        case 'map icon':
            icon = (
                <MapIcon
                    width={size ?? 30}
                    height={size ?? 30}
                />
            );
            return icon;
        case 'search icon 2':
            icon = (
                <Search2
                    width={size ?? 20}
                    height={size ?? 19}
                    fill={color ?? '#000000'}
                />
            );
            return icon;
        case 'camera':
            icon = (
                <Camera
                    width={size ?? 32}
                    height={size ?? 28}
                    fill={color ?? '#243B51'}
                />
            );
            return icon;
        case 'three dot':
            icon = (
                <ThreeDot
                    width={size ?? 21}
                    height={size ?? 5}
                    fill={color ?? Colors.OnSurface}
                />
            );
            return icon;
        case 'draft':
            icon = <Draft />;
            return icon;
        case 'date picker':
            icon = (
                <DatePicker
                    width={size ?? 24}
                    height={size ?? 24}
                />
            );
            return icon;
        case 'car-bottom-tab':
            icon = (
                <CarBottomTab
                    width={size ?? 22}
                    height={size ?? 22}
                />
            );
            return icon;
        case 'car-bottom-tab-active':
            icon = (
                <CarBottomTabActive
                    width={size ?? 22}
                    height={size ?? 22}
                />
            );
            return icon;
        case 'notification-bottom-tab':
            icon = (
                <NotificationBottomTab
                    width={size ?? 22}
                    height={size ?? 22}
                />
            );
            return icon;
        case 'notification-bottom-tab-active':
            icon = (
                <NotificationBottomTabActive
                    width={size ?? 22}
                    height={size ?? 22}
                />
            );
            return icon;
        case 'bell-o-white':
            icon = (
                <BellOWhite
                    width={size ?? 22}
                    height={size ?? 22}
                />
            );
            return icon;
        case 'show map':
            icon = (
                <ShowMap />
            );
            return icon;
        default:
            return <></>;
    }
};

const styles = StyleSheet.create({
    bgImg: {
        position: 'absolute',
    },
});

SvgIcon.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.number || PropTypes.string,
    height: PropTypes.number || PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

};

export default SvgIcon;
