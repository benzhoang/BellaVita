import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import StudentTableActions from './student-table-action';

export default function StudentsTable({ users, pageCount }) {
  return (
    <>
      <StudentTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
