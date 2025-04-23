import React from 'react';
import { Table } from '../../types';
import Button from '../../components/UI/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  tables: Table[];
  onSelect: (table: Table) => void;
}

const TablesList: React.FC<Props> = ({ tables, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {tables.map(table => (
        <Button key={table.id} onClick={() => onSelect(table)}>
        {t('table')} {table.number_table}
      </Button>
      
      ))}
    </div>
  );
};

export default TablesList;
