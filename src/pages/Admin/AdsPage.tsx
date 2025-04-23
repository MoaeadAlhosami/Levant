import React, { useEffect, useState } from 'react';
import api from '../../api';
import AdsList from '../../components/Admin/AdsList';
import AdForm from '../../components/Admin/AdForm';
import { Ad } from '../../types';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdsPage: React.FC = () => {
  const { t } = useTranslation();
  const [ads, setAds] = useState<Ad[]>([]);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAdsList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<{ data: Ad[] }>(
        '/admin_api/show_advertisements'
      );
      setAds(data.data);
    } catch {
      toast.error(t('fetch_ads_failed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsList();
  }, []);

  const handleAdd = () => {
    setEditingAd(null);
    setShowForm(true);
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('confirm_delete_ad'))) {
      setLoading(true);
      try {
        await api.delete(`/admin_api/delete_advertisement?id=${id}`);
        toast.success(t('ad_deleted_successfully'));
        fetchAdsList();
      } catch {
        toast.error(t('delete_ad_failed'));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (editingAd) {
        await api.post('/admin_api/update_advertisement', formData);
        toast.success(t('ad_updated_successfully'));
      } else {
        await api.post('/admin_api/add_advertisement', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success(t('ad_added_successfully'));
      }
      setShowForm(false);
      fetchAdsList();
    } catch {
      toast.error(t('ad_submit_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold tracking-wide text-gray-800">
        {t('ads_management')}
      </h1>

      {loading && <Spinner />}

      {!loading && !showForm && (
        <Button onClick={handleAdd} className="mb-6">
          {t('add_new_ad')}
        </Button>
      )}

      {showForm ? (
        <AdForm
          initialData={editingAd}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        !loading && (
          <AdsList ads={ads} onEdit={handleEdit} onDelete={handleDelete} />
        )
      )}
    </section>
  );
};

export default AdsPage;
