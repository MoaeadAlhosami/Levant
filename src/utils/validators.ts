import { object, string, mixed, SchemaOf } from 'yup';
import type { FormValues } from '../components/Admin/AdForm';
import i18n from '../i18n'; // تأكد أن i18n مستورد

export const adSchema: SchemaOf<FormValues> = object({
  title: string().required(i18n.t('validation.title_required')),
  from_date: string()
    .required(i18n.t('validation.from_date_required'))
    .matches(/^\d{4}-\d{2}-\d{2}$/, i18n.t('validation.date_format')),
  to_date: string()
    .required(i18n.t('validation.to_date_required'))
    .matches(/^\d{4}-\d{2}-\d{2}$/, i18n.t('validation.date_format'))
    .test(
      'is-after',
      i18n.t('validation.to_date_after'),
      function (value) {
        const { from_date } = this.parent;
        return !from_date || !value || new Date(value) >= new Date(from_date);
      }
    ),
  hide_date: string()
    .oneOf(['0', '1'])
    .required(i18n.t('validation.hide_date_required')),
  is_panorama: string()
    .oneOf(['0', '1'])
    .required(i18n.t('validation.panorama_required')),
  image: mixed<FileList>().optional(),
});
