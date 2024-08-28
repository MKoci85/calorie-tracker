import { useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from './hooks/useActivity'


function App() {

  const{ state, dispatch } = useActivity()

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])
    
  const canRestartApp = useMemo(() => state.activities.length, [state.activities]);
  
  return (
    <>
     <header className="bg-black py-3">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de Calorías
        </h1>
        <button className="bg-rose-700 hover:bg-rose-500 font-bold uppercase p-2 text-white cursor-pointer rounded-lg text-sm disabled:opacity-30"
          disabled={!canRestartApp}
          onClick={()=>dispatch({type: 'restart-app'})}
        >
          Reiniciar App
        </button>
      </div>
     </header>

     <section className="bg-gray-950 py-20 px-5">
      <div className="max-w-3xl mx-auto" >
        <Form 
        />
      </div>
     </section>

     <section className="bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto">
        <CalorieTracker 
        />
      </div>
     </section>

     <section className="p10 mx-auto max-w-4xl">
        <ActivityList 
        />
     </section>
    </>
  )
}

export default App
