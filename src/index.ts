import express from 'express'
import resizeImages from './api/images/resizeImg';

const app = express();
const port = 3000;

app.listen(port, ()=> {
    console.log('server started...');
    
})
//resize images endpoint
app.use('/api/images', resizeImages, (req,res)=>{
    res.send(req.query);
} )
