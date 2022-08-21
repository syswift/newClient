// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          拖拽或选择文件
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          拖拽文件到这 或 点击&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            浏览
          </Typography>
          &nbsp;你的电脑
        </Typography>
      </Box>
    </Stack>
  );
}
