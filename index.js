const express = require('express')
const app = express()
const port = 3000



const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/',(req,res,next) => {
	for ( var i = 0; i<2e6;i++){}
		res.send('Server says hi!');
});