import React from 'react';
import Button from '../../components/UI/Button';
import { Ad } from '../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  ads: Ad[];
  onEdit: (ad: Ad) => void;
  onDelete: (id: number) => void;
}

const AdsList: React.FC<Props> = ({ ads, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {[
              'title',
              'from',
              'to',
              'hide_date',
              'panorama',
              'actions',
            ].map(key => (
              <th
                key={key}
                className="px-4 py-3 text-left text-sm font-semibold tracking-wide text-gray-700"
              >
                {t(key as any)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm">
          {ads.map(ad => (
            <tr key={ad.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{ad.title}</td>
              <td className="px-4 py-3">{ad.from_date}</td>
              <td className="px-4 py-3">{ad.to_date}</td>
              <td className="px-4 py-3">
                {ad.hide_date ? t('yes') : t('no')}
              </td>
              <td className="px-4 py-3">
                {ad.is_panorama ? t('yes') : t('no')}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => onEdit(ad)}>{t('edit')}</Button>
                  <Button onClick={() => onDelete(ad.id)}>{t('delete')}</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsList;
