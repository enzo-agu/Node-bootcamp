import http from 'http'
http.createServer((req,res)=>{

    // res.writeHead(200, {'Content-Type':'application/json'})
    // const persona={
    //     id:1,
    //     name:'enzo'
    // }

    res.write('hola mundo')
    res.end()

})

.listen(8080)

console.log('escuchando puerto', 8080)