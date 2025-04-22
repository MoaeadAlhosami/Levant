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
  image: FileList;
  hide_date: '0' | '1';
  is_panorama: '0' | '1';
};

interface AdFormProps {
  initialData: Ad | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

const AdForm: React.FC<AdFormProps> = ({ initialData, onSubmit, onCancel }) => {
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

  const onFormSubmit: SubmitHandler<FormValues> = async (data) => {
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

    if (initialData) {
      form.append('id', initialData.id.toString());
    } else {
      form.append('image', data.image[0]);
    }

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <h3 className="text-xl">
        {initialData ? t('edit_ad') : t('create_new_ad')}
      </h3>

      <div>
        <label className="block mb-1">{t('title')}</label>
        <Input {...register('title')} />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1">{t('from_date')}</label>
        <Input type="date" min={today} {...register('from_date')} />
        {errors.from_date && (
          <p className="text-red-600">{errors.from_date.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">{t('to_date')}</label>
        <Input
          type="date"
          min={fromDate || today}
          {...register('to_date')}
        />
        {errors.to_date && (
          <p className="text-red-600">{errors.to_date.message}</p>
        )}
      </div>

      {!initialData && (
        <div>
          <label className="block mb-1">{t('image')}</label>
          <Input type="file" accept="image/*" {...register('image')} />
        </div>
      )}

      <div className="flex space-x-4">
        <div>
          <label className="block mb-1">{t('hide_date')}</label>
          <select {...register('hide_date')} className="border rounded px-2 py-1">
            <option value="0">{t('no')}</option>
            <option value="1">{t('yes')}</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">{t('panorama')}</label>
          <select {...register('is_panorama')} className="border rounded px-2 py-1">
            <option value="0">{t('no')}</option>
            <option value="1">{t('yes')}</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-2">
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
