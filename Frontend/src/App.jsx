import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameDifficultySelector from './components/GameDifficultySelector'
import QuizApp from './components/QuizApp'
import AptitudeExam from './components/AptitudeExam'

function App() {

  return (
    <div>
      {/* <GameDifficultySelector/> */}
      {/* <QuizApp/> */}
      <AptitudeExam/>
    </div>
  )
}

export default App
