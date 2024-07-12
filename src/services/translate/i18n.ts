import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { USER_LANGUAGE } from 'services/constants/key';
import en from './en.json';
import vi from './vi.json';
// import storage from '../../components/storage/mmkv';

// const lang = storage.getString(USER_LANGUAGE);
const lang = global.ss_lang ?? 'en';
const mi18n = i18next.createInstance();

mi18n.use(initReactI18next).init({
    lng: lang,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: en,
        },
        vi: {
            translation: vi,
        },
    },
    keySeparator: ':::',
    nsSeparator: '|||',

    interpolation: {
        escapeValue: false,
    },
    
});
export default mi18n;
