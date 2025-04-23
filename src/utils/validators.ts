import * as yup from 'yup';
import type { ObjectSchema } from 'yup';
import type { FormValues } from '../components/Admin/AdForm';
import i18n from '../i18n';

export const adSchema: ObjectSchema<FormValues> = yup
  .object({
    title: yup
      .string()
      .required(i18n.t('validation.title_required')),

    from_date: yup
      .string()
      .required(i18n.t('validation.from_date_required'))
      .matches(/^\d{4}-\d{2}-\d{2}$/, i18n.t('validation.date_format')),

    to_date: yup
      .string()
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

    hide_date: yup
      .string()
      .oneOf(['0', '1'])
      .required(i18n.t('validation.hide_date_required')),

    is_panorama: yup
      .string()
      .oneOf(['0', '1'])
      .required(i18n.t('validation.panorama_required')),

    image: yup.mixed<FileList>().optional(),
  })
  .required();
