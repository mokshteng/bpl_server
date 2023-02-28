const isToday = (matchDate) => {
    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    matchDate.setHours(0,0,0,0)
    return currentDate.getTime() == matchDate.getTime()

} 
const isPreviousDay = (matchDate) => {
    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    matchDate.setHours(0,0,0,0)
    return currentDate.getTime()>matchDate.getTime()

}

const isUpcomingDay = (matchDate) => {
    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    matchDate.setHours(0,0,0,0)
    return currentDate.getTime()<matchDate.getTime()
}

const isOngoing = () => {
    const current = new Date()
    const startTime = new Date()
    startTime.setHours(16);
    startTime.setMinutes(30);
    const endTime = new Date(); 
    endTime.setHours(20);
    endTime.setMinutes(0);
    console.log(endTime)
    return (current.getTime()>=startTime.getTime()&&current.getTime()<endTime.getTime()) 
    
}
const isTodayAndDone = (matchDate) => {
    let currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    matchDate.setHours(0,0,0,0)
    const endTime = new Date(); 
    endTime.setHours(20);
    endTime.setMinutes(0);
    if(currentDate.getTime() == matchDate.getTime()) {
        currentDate = new Date()
        return currentDate.getTime()>=endTime.getTime()
    }
    return false;
 


}


module.exports =  {
    isToday,
    isPreviousDay,
    isUpcomingDay, 
    isOngoing,
    isTodayAndDone
}