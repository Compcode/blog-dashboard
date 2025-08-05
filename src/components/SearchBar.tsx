import { InputBase, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type searchBarProps = {
    search : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    toggle : () => void
}

export default function SearchBar({search, onChange, toggle} : searchBarProps) {
  return (
    <Box sx={{display : 'flex', alignItems : 'center', justifyContent : 'center', gap : '.3em'}}>
        <Button variant="contained" sx={{backgroundColor : 'gray', color : 'white', fontWeight : 'bold', height : '2.7em', width : 'auto' ,
                fontSize : '.8em', display : 'flex', alignItems : 'center', justifyContent : 'center'}} onClick={toggle}>
            Add Post
        </Button>
        <Paper elevation={2}
        sx={{
            display: 'flex',
            alignItems: 'center',
            width: 300,
            padding: '4px 8px',
            borderRadius: '24px',
            bgcolor : 'white',
        }}
        >
        <SearchIcon sx={{ color: 'gray', mr: 1 }} />
        <InputBase
            placeholder="Search…"
            fullWidth
            value={search}
            onChange={onChange}
            sx={{ fontSize: '0.9rem', color : 'black'}}
            inputProps={{ 'aria-label': 'search' }}
        />
        </Paper>
    </Box>
  )
}
