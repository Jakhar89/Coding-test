//Find the maximum repeated number given the M as the maximum number
//in the number array A

function solution(M, A) {
    var N = A.length;
    var count = new Array();
    var i;
    for (i = 0; i <= M; i++)
        count[i] = 0;
    var maxOccurence = 1;
    var index = -1;
    for (i = 0; i < N; i++) {
      console.log('ini',count[A[i]])
        if (A[i] > 0) {
            var tmp = count[A[i]];
          console.log('tmp',tmp)
            if (tmp >= maxOccurence) {
                maxOccurence = tmp;
                index = i;
            }
            count[A[i]] = tmp + 1;
        } else {
            count[A[i]] = 1;
        }
      console.log('round',count,index,'i'+i)
    }
  console.log(A[index])
    return A[index];
}
//solution(Array.from({length: 40000}, (v, k) => k+1))
solution(8,[8,5,2,3,8,5,8,3,5,1,2])
