import React from 'react';
import Button from '../../components/UI/Button';
import { Ad } from '../../types';
import { useTranslation } from 'react-i18next';

interface AdsListProps {
  ads: Ad[];
  onEdit: (ad: Ad) => void;
  onDelete: (id: number) => void;
}

const AdsList: React.FC<AdsListProps> = ({ ads, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">{t('title')}</th>
          <th className="px-4 py-2">{t('from')}</th>
          <th className="px-4 py-2">{t('to')}</th>
          <th className="px-4 py-2">{t('hide_date')}</th>
          <th className="px-4 py-2">{t('panorama')}</th>
          <th className="px-4 py-2">{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {ads.map(ad => (
          <tr key={ad.id} className="text-center border-t">
            <td className="px-4 py-2">{ad.title}</td>
            <td className="px-4 py-2">{ad.from_date}</td>
            <td className="px-4 py-2">{ad.to_date}</td>
            <td className="px-4 py-2">{ad.hide_date ? t('yes') : t('no')}</td>
            <td className="px-4 py-2">{ad.is_panorama ? t('yes') : t('no')}</td>
            <td className="px-4 py-2 space-x-2">
              <Button onClick={() => onEdit(ad)}>{t('edit')}</Button>
              <Button onClick={() => onDelete(ad.id)}>{t('delete')}</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdsList;
