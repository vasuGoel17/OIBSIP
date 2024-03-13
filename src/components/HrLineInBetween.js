import React, { forwardRef } from "react";
import { Divider, Typography, Box } from "@mui/material";

const RecommendedDivider = forwardRef((props, ref) => {
  return (
    <Box display="flex" alignItems="center" my={3} ref={ref}>
      <Divider sx={{ borderColor: "#ccc", flexGrow: 1 }} />
      <Box
        component="div"
        bgcolor="white"
        p={1}
        mx={2}
        borderRadius={1}
        textAlign="center"
        fontWeight="bold"
      >
        <Typography variant="body2" color="textSecondary">
          {props.name}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#ccc", flexGrow: 1 }} />
    </Box>
  );
});

export default RecommendedDivider;
