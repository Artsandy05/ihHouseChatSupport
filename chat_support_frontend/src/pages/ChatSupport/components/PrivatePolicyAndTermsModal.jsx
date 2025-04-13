import {
  Box,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { MODALS } from "../constants/modals";
import CloseIcon from "@mui/icons-material/Close";

import { DESKTOP, PRIVATE_PRIVACY, TERMS_AND_CONDITION_CONTENT } from "../constants";
import { useEffect, cloneElement, useRef, useState } from "react";


export const PrivatePolicyAndTermsModal = (props) => {
  const { contentType, onCloseModal, mode, onSetAgreement } = props;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // Now properly using the theme
  const [privatePolicyReach, setPrivatePolicyReach] = useState(false);
  const [isTargetAtBottom, setIsTargetAtBottom] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleOnAgreement = () => {
    onSetAgreement()
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mode === DESKTOP ? !isLargeScreen ? "80vw" : "45vw" : "80vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    padding: "10px 0",
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = gridRef.current;
      const target = targetRef.current;

      if (container && target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Check if the target is within the visible area of the container
        if (targetRect.top <= containerRect.bottom && targetRect.bottom >= containerRect.top) {
          setPrivatePolicyReach(true);
        } else {
          setPrivatePolicyReach(false);
        }

        if (targetRect.bottom <= containerRect.bottom) {
          setIsTargetAtBottom(true);
        } else {
          setIsTargetAtBottom(false);
        }
      }
    };

    const container = gridRef.current;

    if (container) {
      // Add scroll event listener to the container
      container.addEventListener('scroll', handleScroll);

      // Call handleScroll on mount to set initial state
      handleScroll();

      // Clean up the event listener on component unmount
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  useEffect(() => {
    // Scroll to the target element when the component mounts
    if(contentType === PRIVATE_PRIVACY){
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          const container = gridRef.current;
          const target = targetRef.current;

          if (container && target) {
          const containerTop = container.getBoundingClientRect().top;
          const targetTop = target.getBoundingClientRect().top;
  
          // Calculate the new scroll position
          const scrollOffset = targetTop - containerTop;
          container.scrollTo({ top: container.scrollTop + scrollOffset, behavior: 'smooth' });
          }
        }, 300); // Adjust the timeout as needed to match the smooth scroll duration
        
      }
    }
  }, [contentType]);

  const scrollToTargetBottom = () => {
    if (targetRef.current) {
      // Scroll to the bottom of the target element
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
      <Box sx={style}>
        <Grid container direction="column">
          <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ pt: 2, pb: 1, px: 2.5 }}
              >
                  <Grid item pl={3} />
                  <Grid item>
                    <Typography fontSize={16} fontWeight={600} mt={2} mb={0}>
                      {privatePolicyReach ? MODALS[PRIVATE_PRIVACY].title : MODALS[TERMS_AND_CONDITION_CONTENT].title}
                    </Typography>
                  </Grid>
                  <Grid item pr={"3px"} mt={-2}>
                    <IconButton aria-label="Close Modal" onClick={() => onCloseModal(false)}>
                      <CloseIcon sx={{ color: "#000", position:'relative', left:20 }} />
                    </IconButton>
                  </Grid>
              </Grid>
              <Grid item>
                <Grid
                  ref={gridRef}
                  container
                  direction="column"
                  px={4}
                  py={2}
                  sx={{ height: mode === DESKTOP ? "60vh" : "70vh", overflowY: "scroll" }}
                >
                   {cloneElement(MODALS[TERMS_AND_CONDITION_CONTENT].content, { ref: targetRef })}
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      </Box>
  )
};