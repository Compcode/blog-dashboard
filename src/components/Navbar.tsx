import { Typography, Button, Box } from "@mui/material";

type NavbarProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

export default function Navbar({ mode, toggleMode }: NavbarProps) {
  return (
    <nav className="navbar" >
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/letter-b.png" alt="logo" width={40} height={40} />
        <Typography
          variant='h6'
          sx={{
            fontFamily: 'Roboto',
            color: '#00b4d8',
            fontWeight: 'bold',
            paddingLeft: '1em',
          }}
        >
          Blog Dash
        </Typography>
      </div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          marginRight: '1em',
        }}
      >
        <Button
          variant="outlined"
          onClick={toggleMode}
          sx={{
            fontSize: '.8em',
            height: '1.9em',
            width: 'auto',
            backgroundColor: mode === 'dark' ? '#00b4d8' : '#f0f0f0',
            color: mode === 'dark' ? 'white' : 'black',
            fontWeight: 'bold',
          }}
        >
          {mode === 'dark' ? 'Light' : 'Dark'}
        </Button>
      </Box>
    </nav>
  );
}
