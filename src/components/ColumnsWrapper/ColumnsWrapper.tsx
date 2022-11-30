import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddColumnButton from '../AddColumnButton/AddColumnButton';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../api/column.api';
import { IColumn } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import ColumnAddModal from '../ColumnAddModal/ColumnAddModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addBoards, addUsers } from '../../features/columnSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useOnDragEnd } from '../../hooks/useOnDragEnd';
import { useGetUsersQuery } from '../../api/user.api';

const boxStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '1rem',
  overflow: 'auto',
  padding: '1rem',
  height: 'calc(100vh - 216px)',
};

const ColumnsWrapper = () => {
  const { boardId } = useParams();
  const { data, isLoading, isSuccess } = useGetColumnsQuery(boardId as string);
  const { data: users } = useGetUsersQuery();
  const { columns } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [buttonId, setButtonId] = useState('');
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (data) {
      dispatch(addBoards(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (users) {
      dispatch(addUsers(users));
    }
  }, [users, dispatch]);

  const handleClose = () => setOpen(false);
  const handleOpen = (buttonId: string, columnId?: string) => {
    setOpen(true);
    setButtonId(buttonId);
    setColumnId(columnId || '');
  };

  const onDragEnd = useOnDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={boxStyles}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <Box
                  sx={{ display: 'flex', gap: '1rem' }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columns?.map((column: IColumn, idx) => (
                    <Column
                      key={column._id}
                      boardId={boardId}
                      id={column._id || ''}
                      order={idx}
                      name={column.title}
                      onClick={handleOpen}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <AddColumnButton onClick={handleOpen} />
            <ColumnAddModal
              boardId={boardId}
              columnId={columnId}
              pressedButtonId={buttonId}
              open={open}
              onClose={handleClose}
            />
          </>
        )}
      </Box>
    </DragDropContext>
  );
};

export default ColumnsWrapper;
