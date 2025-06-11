import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameDifficultySelector from './components/GameDifficultySelector'
import QuizApp from './components/QuizApp'
import AptitudeExam from './components/AptitudeExam'
import GetStartedPage from './components/GetStartedPage'

function App() {

  return (
    <div>
      {/* <GameDifficultySelector/> */}
      {/* <QuizApp/> */}
      <GetStartedPage />
    </div>
  )
}

export default App
