export type Category = {
    id: number,
    name: string
}

export type Activity = {
    id: string,
    category: number,
    name: string, 
    calories: number
}


//El tipo para ActivityState
export type ActivityState = {
    activities: Activity[], //El tipo del atributo activities es "Activity[]"
    activeId: Activity['id']
}
