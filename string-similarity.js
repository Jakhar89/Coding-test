//Find if string m can be achieved from m with only 1 deletion or insertion
//or only swap of 2 consecutive alphabets
function solution(n,m) {
let c = n==m
if(!c){
let nN = [...n]
let mM= [...m]
let fin = [];
let insertion=0;
let deletion=0;
let swap=0;
let changes=null;
mM.forEach((e,i)=>{

  if (e===nN[i]){
    fin[i]=e
  }else if(!insertion && !deletion && !swap){
    
    if(nN[i+1]==mM[i] && nN[i]==mM[i+1] && nN.length==mM.length){
      
      changes=`SWAP ${nN[i]} ${nN[i+1]}`;
      nN[i]=mM[i]
      nN[i+1]=mM[i+1]
      swap=1
      
    }else if(nN[i+1]==mM[i] && !swap && nN.length>mM.length){
   
      changes=`DELETE ${nN[i]}`;
      nN.splice(i,1)
      deletion=1
    }
    else{
    
      changes=`INSERT ${mM[i]}`;
      nN.splice(i, 0, mM[i]);
      insertion=1
    }
    i--;
  }else if(insertion || deletion ||swap){
    changes="IMPOSSIBLE"
  }
})
console.log(changes,nN,mM)
 return changes
}else{
  return "NOTHING"
}
}
//solution(Array.from({length: 5}, (v, k) => k+1))
solution('nice','niece')
