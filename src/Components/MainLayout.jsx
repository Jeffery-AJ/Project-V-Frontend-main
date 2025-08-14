import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/system';
import { motion, useViewportScroll,useTransform } from 'framer-motion';
import { VelocityScroll } from './magicui/scroll-based-velocity';
import FloatingElements from './FloatingElements';
import { PomodoroTimer, StickyNote, TaskList, AICollabCard,MotivationalQuote } from './FloatingElements';
import { ContainerScroll } from "./ui/container-scroll-animation";
import { MorphingText } from "./magicui/morphing-text";
import { FlickeringGrid } from './magicui/flickering-grid';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  return (
    <Box
      sx={{
        position: 'relative',
        py: 8,
        px: 4,
        minHeight: '100vh',
        overflow: 'hidden',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {/* Logo Section */}
      <Box sx={{mt: {sm: 8, xs: 8, md: 0 }, mb: 4 }}>
        <img
          src={theme.palette.mode === 'light' ? '/src/assets/images/logo.png' : '/src/assets/images/logo-light.png'}
          alt="Logo"
          style={{ maxWidth: '250px', width: '100%' }}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ zIndex: 5 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color='primary'>
          Your Financial Command Center <br />
          <Typography component="span" color="text.secondary">
            Manage, Analyze, and Grow
          </Typography>
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', mb: 3 }}
        >
          Gain insights from your financial data. Manage accounts, track transactions, and collaborate with your AI CFO to make smarter financial decisions.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
          Get Started for Free
        </Button>
      </Box>
  
      {/* Floating Elements */}
      <Box
          component={motion.div}
          style={{ opacity }}
          sx={{display: { xs: 'none', md: 'block' },}}
        >
          <PomodoroTimer />
          <MotivationalQuote />
          <StickyNote />
          <TaskList />
          <AICollabCard />
      </Box>
    </Box>
  );
};

const FeatureSection = () => {
  const randomGap = React.useMemo(() => Math.random() * 20 + 20, []);
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          py: 8,
          px: 4,
          mt: 0,
          minHeight: '110vh',
          overflow: 'hidden',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          {/* Mobile view: Repeating instances with gap */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              gap: randomGap, // gap in theme spacing units
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="relative flex w-full flex-col items-center justify-center overflow-hidden text-green-500">
                <VelocityScroll>Features</VelocityScroll>
              </span>
            ))}
          </Box>
          {/* Desktop view: Single instance */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <span className="relative flex w-full flex-col items-center justify-center overflow-hidden text-green-500">
                <VelocityScroll>Features</VelocityScroll>
              </span>
          </Box>
        </Box>
        <FloatingElements />
      </Box>
    </>
  );
};

const HighlightSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          py: 0,
          px: { xs: 2, sm: 4 }, // Reduced horizontal padding on mobile
          mt: { xs: -32, sm: -32, md: -12 },
          mb: {sm: -6,xs: -6, md: 0 }, // Adjusted margin top for responsiveness
          minHeight: { xs: '100vh', md: '120vh' }, // Full viewport height on mobile, increased on larger screens
          overflow: 'hidden',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Background decorative elements remain the same */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '440px', sm:'620px', md: '580px' },
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          <span className="relative flex w-full flex-col items-center justify-center overflow-hidden text-green-500">
            <VelocityScroll>Highlights</VelocityScroll>
            {isMobile ? (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-l from-transparent to-[hsl(36, 24%, 86%)]"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-r from-transparent to-[hsl(36, 24%, 86%)]"></div>
              </>
            ) : (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent to-[#ded6cb]"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-transparent to-[#ded6cb]"></div>
              </>
            )}
          </span>
        </Box>
        <ContainerScroll
          titleComponent={
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="h1"
                sx={{
                  fontSize: { xs: '1rem', sm: '2.16rem', md: '2.16rem' }, // Smaller on mobile, larger on desktop
                  fontWeight: 600,
                  color: { xs: 'black', dark: 'white' },
                  textAlign: 'center',
                }}
              >
                The Standard Has Been Redefined <br />
                <MorphingText
                  texts={[
                    "Smarter Budgeting",
                    "Deeper Insights",
                    "Strategic Investments",
                    "Financial Clarity",
                  ]}
                />
              </Box>
            </Box>
          }
        >
          <Box
            component="img"
            src="/linear.webp"
            alt="hero"
            draggable={false}
            sx={{
              mx: 'auto',
              borderRadius: 2,
              objectFit: 'cover',
              height: { xs: 300, sm: 480, md: 720 }, // Responsive image height
              width: { xs: '90%', sm: '100%', md: 1400 }, // Responsive image width
              objectPosition: 'center',
            }}
          />
        </ContainerScroll>
      </Box>
    </>
  );
};


const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden rounded-lg bg-background">
        <FlickeringGrid
          className="absolute inset-0 z-0 w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#4d463e"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="relative z-10 w-full">
          <HeroSection />
          <HighlightSection />
          <FeatureSection />
        </div>
      </div>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        // Shared continuous radial gradient background:
        backgroundImage:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(250, 241, 229, 0.18) 1px, transparent 20%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 20%)',
        backgroundSize: '12px 12px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'repeat',
      }}
    >
      <HeroSection />
      <HighlightSection />
      <FeatureSection />
    </Box>
  );
};

export default MainLayout;