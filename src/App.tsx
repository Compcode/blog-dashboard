import Grid from '@mui/material/Grid'
import './App.css'
import Navbar from './components/Navbar'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import BlogList, { type Blog } from './components/BlogList'
import { blogs } from './data/Blogs'
import SearchBar from './components/SearchBar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import AddBlog from './components/AddBlog'
import { useDebounce } from './hooks/useDebounce'


function App() {
  const [showModal, setShowModal] = useState(false)
  const [blogList, setBlogList] = useLocalStorage('BlogPost', blogs)
  const [search, setSearch] = useState('')
  const debounce = useDebounce(search)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogList)

  //handling theme toggle
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => createTheme({
      palette: {
        mode,
      },
    }), [mode])

  useEffect(() => {
    if(showModal && dialogRef.current){
      dialogRef.current.showModal()
    }
  }, [showModal])

  //effect for searching
  useEffect(() => {
    setFilteredBlogs(blogList.filter(blog => blog.title.toLowerCase().includes(debounce.toLowerCase()) || blog.author.toLowerCase().includes(debounce.toLowerCase())))

  }, [debounce, blogList])

  const handleToggleModal = () => {
    setShowModal(true)
  }
  
  const handleAddBlog = (newBlog: Blog) => {
    setBlogList([...blogList, newBlog]);
    setShowModal(false); // Close modal after adding
  };

  const handleEditBlog = (updatedBlog: Blog) => {
    setBlogList(blogList.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  const handleDeleteBlog = (id : number) => {
    setBlogList(blogList.filter(blog => blog.id !== id))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{height : '100dvh'}}>
        <Grid>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <SearchBar toggle={handleToggleModal} search={search} onChange={(e) => setSearch(e.target.value)}/>
          <BlogList blogs={filteredBlogs} editBlog={handleEditBlog} deleteBlog={handleDeleteBlog}/>
        </Grid>
        {showModal && 
          <dialog ref={dialogRef} onClick={() => setShowModal(false)}>
            <div onClick={e => e.stopPropagation()}>
                <AddBlog addBlog={handleAddBlog}/>
            </div>
          </dialog>  
        }
      </Box>
    </ThemeProvider>
  )
}

export default App
