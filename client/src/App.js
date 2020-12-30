import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import './App.css'

export default function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' exact component={Home} /> 
        <Route exact path='/chat' component={Chat} /> 
      </Router>
      
    </div>
  )
}
