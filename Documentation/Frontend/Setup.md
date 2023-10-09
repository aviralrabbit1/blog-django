### 1. Redux template

From root directory,
```sh
mkdir frontend
cd frontend
npx degit reduxjs/redux-templates/packages/vite-template-redux blog-app
cd blog-app
npm install
```

### 2. Install and configure Tailwind (for Vite)
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

or in `index.html`, add

```html
  <head>
    ...
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
```

### 3. Install and Setup react-router-dom
```sh
npm install react-router-dom
```

In `App.tsx`, setup routers to diffferent pages like:
```tsx
import "./App.css"
import Login from "./components/Login";
import Navbar from './components/Navbar';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (
    <Router >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
  )
}

export default App
```
and in `Navbar.tsx`, 
```tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
          <div>
            <Link to='/'><h1> Blog it!</h1></Link>
          </div>
          ...
          <div>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/register'><button>Register</button></Link>
          </div>
      </nav>
    </div>
  )
}
```

### 4. SidePanel

```tsx
import React from 'react'

const SidePanel = () => {
  return (
    <div className='shadow-lg'>
        <div className='text-center py-5'>
        ...
            <div>
            ...
                <div>
                    Start Writing today!
                </div>
                ...
            </div>
        </div>
    </div>
  )
}

export default SidePanel
```

In `Home.tsx`
```tsx
import React from 'react'
import SidePanel from './SidePanel'

const Home = () => {
  return (
    <div >
        <div>
            ...
            <div>
                <SidePanel/>
            </div>
        </div>
    </div>
  )
}

export default Home
```
