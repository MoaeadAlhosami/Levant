import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/index';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { Ad } from '../../types';
import { useTranslation } from 'react-i18next';

const AdsCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const resp = await api.get<{ data: Ad[] }>(
          '/customer_api/show_advertisements?restaurant_id=54'
        );
        setAds(resp.data.data);
      } catch {
        toast.error(t('fetch_ads_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [t]);

  if (loading) return <Spinner />;
  if (ads.length === 0)
    return <p className="py-4 text-center">{t('no_ads_available')}</p>;

  return (
    <div className="overflow-x-auto flex space-x-4 py-4">
      {ads.map(ad => (
        <img
          key={ad.id}
          src={ad.image}
          alt={ad.title}
          className={`object-cover rounded cursor-pointer ${
            ad.is_panorama ? 'h-48 w-full' : 'h-48 w-64'
          }`}
          onClick={() => navigate('/restaurant/categories')}
        />
      ))}
    </div>
  );
};

export default AdsCarousel;
