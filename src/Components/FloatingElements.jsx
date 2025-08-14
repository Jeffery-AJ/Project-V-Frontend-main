import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { styled, useTheme } from "@mui/system";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentIcon from "@mui/icons-material/Payment";
import PieChartIcon from "@mui/icons-material/PieChart";

// Handwriting Font Style
const HandwritingFont = styled(Typography)({
  fontFamily: '"Permanent Marker", cursive',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333',
});

const floatingAnimation = () => {
  const duration = Math.floor(Math.random() * 3) + 2; // Random duration between 2-4 seconds
  const delay = Math.floor(Math.random() * 3); // Random delay between 0-2 seconds
  return {
    '@keyframes float': {
      '0%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
      '100%': { transform: 'translateY(0px)' },
    },
    animation: `float ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  };
};

const quotes = [
  "Invest in your future, one dollar at a time.",
  "Financial freedom is a marathon, not a sprint.",
  "A budget is telling your money where to go, instead of wondering where it went.",
  "Don't save what is left after spending; spend what is left after saving.",
  "The stock market is a device for transferring money from the impatient to the patient.",
  "An investment in knowledge pays the best interest."
];

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const theme = useTheme();

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <Box sx={{ 
      position: 'absolute', 
      bottom: '1%', 
      left: '48%', 
      ...floatingAnimation() 
    }}>
      <MonetizationOnIcon
        sx={{
          fontSize: '52px',
          color: theme.palette.mode === 'dark' ? theme.palette.warning.light : 'rgb(252, 185, 0)',
          position: 'absolute',
          top: '-20px',
          right: '-30px',
          zIndex: 5,
          transform: 'rotate(20deg)',
        }}
      />
      <Box sx={{ transform: 'rotate(5deg)' }}>
        <Paper
          elevation={4}
          sx={{
            width: '190px',
            p: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f3e5f5',
            borderRadius: '18px',
            textAlign: 'center',
            boxShadow: theme.shadows[4],
            borderColor: '#c7fcb3',
            borderWidth: 2.5,
          }}
        >
          <Typography fontSize="14px" fontWeight="bold" sx={{ mt: 0 }}>
            {quote}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

// Upcoming Deadlines Component
const deadlines = [
  { task: "Quarterly Tax Filing", date: "Apr 15, 2025" },
  { task: "Invoice #123 Due", date: "Mar 30, 2025" },
  { task: "Payroll Run", date: "Mar 28, 2025" }
];

export const UpcomingDeadlines = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'absolute', bottom: '10%', right: '15%', zIndex: 4, ...floatingAnimation() }}>
      <Paper
        elevation={6}
        sx={{
          width: '300px',
          p: 3,
          background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #424242 30%, #616161 100%)' : 'linear-gradient(135deg, #e3f2fd 30%, #bbdefb 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: theme.shadows[6],
          overflow: 'hidden',
          transform: 'rotate(8deg)',
          borderColor: '#c7fcb3',
          borderWidth: 2.5,
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <PaymentIcon sx={{ fontSize: 30, color: theme.palette.mode === 'dark' ? '#ffeb3b' : '#1565c0', mr: 1 }} />
          <Typography fontSize="18px" fontWeight="bold" color={theme.palette.mode === 'dark' ? '#ffeb3b' : '#0d47a1'}>
            Upcoming Payments
          </Typography>
        </Box>

        {/* List of Deadlines */}
        <List sx={{ mt: 1 }}>
          {deadlines.map((deadline, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
                borderRadius: '12px',
                p: 1.5,
                mb: 1,
                boxShadow: theme.shadows[2],
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <ListItemText
                primary={<Typography fontSize="16px" fontWeight="bold">{deadline.task}</Typography>}
                secondary={<Typography fontSize="14px" color="gray">{deadline.date}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export const PomodoroTimer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '22%',
        right: '11%',
        zIndex: 4,
        ...floatingAnimation(),
      }}
    >
      <PieChartIcon
        sx={{
          fontSize: '96px',
          color: theme.palette.mode === 'dark' ? '#ff4081' : '#d81b60',
          position: 'absolute',
          bottom: '96px',
          right: '226px',
          zIndex: 5,
          filter: 'drop-shadow(0px 0px 6px rgba(35, 162, 31, 0.7))',
        }}
      />
      {/* Wrapper to separate floating animation from rotation */}
      <Box sx={{ transform: 'rotate(6deg)' }}>
        <Paper
          elevation={6}
          sx={{
            width: '260px',
            p: 4,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(55, 71, 79, 0.69)' : 'rgb(218, 208, 194)',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: theme.shadows[6],
            borderColor: '#c7fcb3',
            borderWidth: 2.5,
          }}
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: 1 }}>
            Investment Portfolio
          </Typography>
          <Typography sx={{ fontSize: '16px', color: theme.palette.mode === 'dark' ? '#cfd8dc' : '#4d463e' }}>
            Total Value: $15,750 <br /> Growth: +5.2%
          </Typography>
          <Typography sx={{ mt: 2, fontWeight: 'bold', fontSize: '14px' }}>
            Stocks: 60%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={60}
            sx={{
              height: 8,
              borderRadius: 3,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(55, 71, 79, 0.44)' : 'rgba(98, 180, 42, 0.44)',
              '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.mode === 'dark' ? '#4caf50' : '#4caf50' },
              mt: 1,
            }}
          />
          <Typography sx={{ mt: 2, fontWeight: 'bold', fontSize: '14px' }}>
            Bonds: 40%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={40}
            sx={{
              height: 8,
              borderRadius: 3,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(55, 71, 79, 0.44)' : 'rgba(98, 180, 42, 0.44)',
              '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.mode === 'dark' ? '#4caf50' : '#4caf50' },
              mt: 1,
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export const StickyNote = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '12%',
        left: '10%',
        zIndex: 40000,
        ...floatingAnimation(),
      }}
    >
      {/* Wrapper to separate positioning from rotation */}
      <Box sx={{ transform: 'rotate(-8deg)' }}>
        <Paper
          elevation={4}
          sx={{
            width: '268px',
            height: '244px',
            p: 2,
            backgroundColor: '#fff9c4',
            boxShadow: '6px 6px 18px rgba(0, 0, 0, 0.15)',
            borderColor: '#c7fcb3',
            borderWidth: 2.5, 
          }}
        >
          <HandwritingFont>
          📌 Your AI CFO is here!<br/><br/>
            Let AI manage your finances while you focus on growth.
            Get insights, track expenses, and plan your budget with ease.
            No more financial stress—just seamless, AI-powered finance tailored for you!
          </HandwritingFont>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              background: '#e1bee7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: 3,
            }}
          >
            <NoteAltIcon sx={{ color: '#6a1b9a' }} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const TaskList = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '12%',
        left: '6%',
        zIndex: 4,
        ...floatingAnimation(),
      }}
    >
      {/* Wrapper to separate positioning from rotation */}
      <Box sx={{ transform: 'rotate(4deg)' }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            width: '300px',
            backgroundColor: '#d0d7e7',
            borderRadius: '8px',
            borderColor: '#c7fcb3',
            borderWidth: 2.5,
            boxShadow: '6px 6px 18px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Typography fontSize="16px" fontWeight="bold" gutterBottom>
            Recent Transactions
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} src="/avatar.png" />
            <Typography fontSize="12px" flexGrow={1}>
              Office Supplies
            </Typography>
            <Typography fontSize="12px" flexGrow={1} sx={{textAlign: 'right', color: 'red'}}>
              -$50.00
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} src="/avatar.png" />
            <Typography fontSize="12px" flexGrow={1}>
              Client Payment
            </Typography>
            <TrendingUpIcon sx={{ fontSize: '16px', color: '#81c784' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} src="/avatar.png" />
            <Typography fontSize="12px" flexGrow={1}>
              Stock Purchase: AAPL
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const AICollabCard = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: '5%', md: '10%' },
        right: { xs: '2%', md: '5%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...floatingAnimation(),
      }}
    >
      <Box sx={{ transform: 'rotate(-4deg)' }}>
        <Paper
          elevation={6}
          sx={{
            p: 2.5,
            background: 'linear-gradient(135deg, #ffffff 30%, #f3e5f5 100%)',
            borderRadius: 3,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            textAlign: 'center',
            boxShadow: '6px 6px 18px rgba(0, 0, 0, 0.15)',
            borderColor: '#c7fcb3',
            borderWidth: 2.5,
          }}
        >
          <AutoAwesomeIcon
            sx={{
              fontSize: 40,
              color: '#7b1fa2',
              position: 'absolute',
              top: '-18px',
              left: '-12px',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              filter: 'drop-shadow(0px 0px 6px rgba(123, 31, 162, 0.4))',
            }}
          />
          <Typography fontWeight="bold" fontSize="15px">
            Chat with your AI CFO
          </Typography>
          <Typography fontSize="12px" color="text.secondary">
            Get AI-powered financial insights and advice in real-time.
          </Typography>
          <Typography fontWeight="bold" fontSize="12px" color="primary">
            Start Chatting
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const FloatingRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Align items in a row
        flexWrap: "wrap", // Allow wrapping on smaller screens
        justifyContent: "flex-end", // Align to the right
        alignItems: "flex-start", // Align items vertically at the start
        gap: "56px", // Consistent spacing between elements (x & y)
        padding: "0px", // Space around the container
        height: { xs: "auto", md: "100vh" },
      }}
    >
      {/* Components - Wrapped in individual boxes for layout control */}
      <Box sx={{ position: 'relative', width: "300px", height: "300px", mx: "1px" }}>
        <PomodoroTimer />
      </Box>
      <Box sx={{ position: 'relative', width: "300px", height: "300px" }}>
        <StickyNote />
      </Box>
      <Box sx={{ position: 'relative', width: "300px", height: "300px" }}>
        <TaskList />
      </Box>
      <Box sx={{ position: 'relative', width: "300px", height: "300px", mx: "24px" }}>
        <AICollabCard />
      </Box>
      <Box sx={{ position: 'relative', width: "300px", height: "300px" , mt: "160px" , mx: "8px"  }}>
        <UpcomingDeadlines />
      </Box>
    </Box>

  );
};

export default FloatingRow;