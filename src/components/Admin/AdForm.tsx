import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { adSchema } from '../../utils/validators';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Ad } from '../../types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export type FormValues = {
  title: string;
  from_date: string;
  to_date: string;
  image?: FileList;
  hide_date: '0' | '1';
  is_panorama: '0' | '1';
};


interface Props {
  initialData: Ad | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

const AdForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(adSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          from_date: initialData.from_date,
          to_date: initialData.to_date,
          hide_date: initialData.hide_date ? '1' : '0',
          is_panorama: initialData.is_panorama ? '1' : '0',
          image: undefined as any,
        }
      : {
          title: '',
          from_date: '',
          to_date: '',
          hide_date: '0',
          is_panorama: '0',
          image: undefined as any,
        },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        from_date: initialData.from_date,
        to_date: initialData.to_date,
        hide_date: initialData.hide_date ? '1' : '0',
        is_panorama: initialData.is_panorama ? '1' : '0',
        image: undefined as any,
      });
    }
  }, [initialData, reset]);

  const fromDate = watch('from_date');

  const onFormSubmit: SubmitHandler<FormValues> = async data => {
    if (!initialData && (!data.image || data.image.length === 0)) {
      toast.error(t('image_required'));
      return;
    }

    const form = new FormData();
    form.append('title', data.title);
    form.append('hide_date', data.hide_date);
    form.append('is_panorama', data.is_panorama);
    form.append('from_date', data.from_date.replace(/-/g, '/'));
    form.append('to_date', data.to_date.replace(/-/g, '/'));

    if (!initialData) {
      const file = data.image?.[0];
      if (file) {
        form.append('image', file);
      }
    }

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="
        max-w-3xl mx-auto bg-white/80 backdrop-blur
        rounded-2xl shadow-xl p-8 space-y-8
      "
    >
      <h3 className="text-2xl font-bold tracking-wide">
        {initialData ? t('edit_ad') : t('create_new_ad')}
      </h3>

      {/* الحقول النصية والتواريخ */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block font-medium">{t('title')}</label>
          <Input {...register('title')} />
          {errors.title && (
            <p className="mt-1 text-sm text-rose-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">{t('from_date')}</label>
          <Input type="date" min={today} {...register('from_date')} />
          {errors.from_date && (
            <p className="mt-1 text-sm text-rose-500">
              {errors.from_date.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">{t('to_date')}</label>
          <Input type="date" min={fromDate || today} {...register('to_date')} />
          {errors.to_date && (
            <p className="mt-1 text-sm text-rose-500">{errors.to_date.message}</p>
          )}
        </div>
      </div>

      {/* اختيار الصورة عند الإنشاء فقط */}
      {!initialData && (
        <div>
          <label className="mb-1 block font-medium">{t('image')}</label>
          <Input
            type="file"
            accept="image/*"
            {...register('image')}
            className="
            file:mr-4 file:rounded-lg file:border-0
            file:bg-blue-600 hover:file:bg-blue-700
            file:px-4 file:py-2 file:text-white
          "
          />
        </div>
      )}

      {/* القوائم المنسدلة */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block font-medium">{t('hide_date')}</label>
          <select
            {...register('hide_date')}
            className="
            w-full rounded-lg border border-gray-300 bg-white
            py-2.5 px-3 text-sm shadow-sm
            focus:border-transparent focus:ring-2 focus:ring-blue-500
          "
          >
            <option value="0">{t('no')}</option>
            <option value="1">{t('yes')}</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1 block font-medium">{t('panorama')}</label>
          <select
            {...register('is_panorama')}
            className="
              w-full rounded-lg border border-gray-300 bg-white
              py-2.5 px-3 text-sm shadow-sm
              focus:border-transparent focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="0">{t('no')}</option>
            <option value="1">{t('yes')}</option>
          </select>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? t('save_changes') : t('create')}
        </Button>
        <Button type="button" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </div>
    </form>
  );
};

export default AdForm;
