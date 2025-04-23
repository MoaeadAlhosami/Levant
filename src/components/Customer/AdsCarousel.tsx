import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Spinner from '../UI/Spinner';
import { toast } from 'react-toastify';
import { Ad } from '../../types';
import { useTranslation } from 'react-i18next';

const SLIDE_INTERVAL = 6000; // 6 ثوانٍ

const AdsCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  // جلب الإعلانات
  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<{ data: Ad[] }>(
          '/customer_api/show_advertisements?restaurant_id=54'
        );
        setAds(data.data);
      } catch {
        toast.error(t('fetch_ads_failed'));
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [t]);

  // مؤقّت التبديل
  useEffect(() => {
    if (!ads.length) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(
      () => setIndex(prev => (prev + 1) % ads.length),
      SLIDE_INTERVAL
    );
    return () => timer.current && clearInterval(timer.current);
  }, [ads]);

  if (loading) return <Spinner />;
  if (!ads.length)
    return <p className="py-6 text-center text-gray-600">{t('no_ads_available')}</p>;

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-md">
      {/* الشرائح */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {ads.map(ad => (
          <img
            key={ad.id}
            src={ad.image}
            alt={ad.title}
            onClick={() => navigate('/restaurant/categories')}
            className="h-56 w-full flex-shrink-0 cursor-pointer object-cover"
          />
        ))}
      </div>

      {/* مؤشّرات أسفل السلايدر */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdsCarousel;
