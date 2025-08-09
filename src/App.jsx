import React from 'react'
import Hero from './components/hero/Hero'
import Signin from './components/register/Signin'
import Signup from './components/register/SignUp'
import PageNotFound from './components/pages/PageNotFound'

const App = () => {
  return (
    <div>
     
      <Hero />
      <Signin />
      <Signup />
      <PageNotFound />
    </div>
  )
}

export default App