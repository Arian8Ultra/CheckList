import { Box } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React from 'react';
import { CardBackground, primary, primaryLight, textPrimary } from '../../theme/Colors';
import { useNavigate } from 'react-router-dom';

interface SheetCardProps {
    children?: React.ReactNode;
    id?: string;
    title?: string;
    description?: string;
    date?: string| number;
    isAnswered?: boolean;
}

function SheetCard(props: SheetCardProps) {
    const nav=useNavigate();
  return (
    <Box
    display={'grid'}
    gridTemplateColumns={'repeat(2, 1fr)'}
    gap={4}
    justifyContent={'center'}
    alignItems={'center'}
    padding={'2%'}
    borderRadius={'15px'}
    onClick={()=>nav(`/home/questions/${props.id}`, {state: {title: props.title}})}
    sx={{
        background: CardBackground,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer'
        }
    }}
    >
        <Typography sx={{
            color: textPrimary,
            fontWeight: "bold",
            fontSize: "medium",
        }}>
            {props?.title}
        </Typography>
        <Typography sx={{
            color: textPrimary,
            fontWeight: "normal",
            fontSize: "medium",
            textAlign:'end'
        }}>
            {props.date && new Date(props.date).toLocaleDateString('fa-IR')}
        </Typography>
               
    </Box>
  )
}

export default SheetCard