let A="00:01:07,400-234-090\n" +
"00:06:07,701-080-080\n" +
"00:06:07,400-233-080\n" +
"00:06:00,400-234-090" ;
let solution =(A)=>{
  let para = A.split('\n');
  let hCall=null;
  let calls={}
  let final=0;
  

para.forEach(el=>{
  let e = el.split(',')
  let time= e[0]
  let num = e[1]
  let sum=0
  
  var a = time.split(':'); // split it at the colons
  
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var sec = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
  if(sec<300){
    sum = sec*3
  }else{
    sum=(Math.ceil(sec/60))*150
  }
  

  if (num in calls){
   
    calls[num].sec += sec
    calls[num].cost +=sum
  }else{
    calls[num]={'sec':sec,'cost':sum}
  }
    if(!hCall)
      hCall = num
    else if(hCall && calls[num].sec > calls[hCall].sec){
      hCall=num
    }else if(hCall && calls[num].sec == calls[hCall].sec){
      if(hCall > num){
        hCall=num
      }
    }
    

 
})
calls[hCall].cost=0

let totalCost = Object.keys(calls).forEach(el=>{
    final+=calls[el].cost 
})
console.log(calls)
return final;

}

console.log(solution(A));