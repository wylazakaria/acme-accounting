'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      test
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <div hidden={value !== 0}>Item One</div>
      <div hidden={value !== 1}>Item Two</div>
      <div hidden={value !== 2}>Item Three</div>
    </div>
  );
}
