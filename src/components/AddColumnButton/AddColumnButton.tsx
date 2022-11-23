import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTasksButtonStyles = {
  '&.MuiButtonBase-root': {
    color: 'grey.500',
    border: '1px dashed #b3bac3',
    '&:hover': {
      color: 'grey.700',
      border: '1px solid #b3bac3',
    },
  },
  marginTop: '20px',
  minWidth: '200px',
  height: '39px',
};

interface AddColumnButtonProps {
  onClick: (buttonId: string) => void;
}

const AddColumnButton = ({ onClick }: AddColumnButtonProps) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id);
  };

  return (
    <Button
      id="add-column"
      onClick={(e) => handleButtonClick(e)}
      sx={AddTasksButtonStyles}
      variant="text"
      startIcon={<AddIcon />}
    >
      Add column
    </Button>
  );
};

export default AddColumnButton;
