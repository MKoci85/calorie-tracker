import { useState, useEffect, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity, ActivityState } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "./reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])


    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: "save-activity", payLoad: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <>
      <form className="space-y-5 bg-white shadow-xl shadow-rose-600 p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select 
                className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="category"
                value={activity.category}
                onChange={handleChange }
            >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
                
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                id="name"
                type="text"
                className="shadow-md bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ej: Comida, Jugo de naranja, etc"
                autoComplete="name"
                value={activity.name}
                onChange={handleChange}
            />

        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input 
                id="calories"
                type="number"
                min={0}
                className="shadow-md bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ej: 300, 500, etc"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <div className="flex justify-center">
            <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 w-1/2 rounded-lg shadow-xl shadow-slate-500"
                value={activity.category === 1 ? "Guardar comida" : "Guardar Ejercicio"}
                disabled={!isValidActivity()}
            />
        </div>
      </form>
    </>
  )
}
