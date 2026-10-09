import type { Meta } from '@storybook/react';
import  { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/Stuck UnSelect All',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  role: string;
};

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];

const data = [...Array(100)].map<Person>(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: ['User', 'Moderator', 'Admin', 'Banned'][faker.number.int({ min: 0, max: 3 })],
}));

export const StuckUnSelectAll = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableRowSelection: row => row.original.role !== 'Banned', // We can't select banned users
  });
  return <MaterialReactTable table={table} />;
};
