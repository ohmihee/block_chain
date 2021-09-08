// 

//1314042ECF8C8A7702AABA1C82D560B5A262FF3E922BB117FA81F2B002FC37B9

function hexToBinary(s){
    const lookup = {
        "0":"0000","1":"0001","2":"0010","3":"0011",
        "4":"0100","5":"0101","6":"0110","7":"0111",
        "8":"1000","9":"1001","A":"1010","B":"1011",
        "C":"1100","D":"1101","E":"1110","F":"1111",
    }
    let rst =""
    // 나온 값을 하나로 이어줄 값을 담기 위한 선언
    for(let i=0; i<s.length; i++){
        //console.log(s[i])  // 1 3 1 4 0 4 2 E C F 8 C 8 A 7 7 0 2 A A B A 1 C 8 2 D 5 6 0 B 5 A 2 6 2 F F 3 E 9 2 2 B B 1 1 7 F A 8 1 F 2 B 0 0 2 F C 3 7 B 9
        if(lookup[s[i]]===undefined) return null
        //console.log(lookup[ s[i] ])
        rst += lookup[ s[i] ]
    }
    //console.log(rst)
    return rst
    //console.log(lookup['F'])//1111
    //console.log(lookup['8']) //1000
    /*
    console.log(s.split(''))
    [
    '1', '3', '1', '4', '0', '4', '2', 'E', 'C',
    'F', '8', 'C', '8', 'A', '7', '7', '0', '2',
    'A', 'A', 'B', 'A', '1', 'C', '8', '2', 'D',
    '5', '6', '0', 'B', '5', 'A', '2', '6', '2',
    'F', 'F', '3', 'E', '9', '2', '2', 'B', 'B',
    '1', '1', '7', 'F', 'A', '8', '1', 'F', '2',
    'B', '0', '0', '2', 'F', 'C', '3', '7', 'B',
    '9'
    ]

    console.log(s[0])
    // 1
    // 함수형 프로그램에서는 배열로 해서 값을 가져올 수 있다.
    console.log(s.length) 
    // 64

    */    
}

const txt = "1314042ECF8C8A7702AABA1C82D560B5A262FF3E922BB117FA81F2B002FC37B9"

let result = hexToBinary(txt)
//console.log(result)


module.exports = {
    hexToBinary
}

// ctrl + alt + shift -> 여러개 한번에 선택
