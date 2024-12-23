import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from 'react-i18next';
moment.locale("ar");
export default function Mains(){
    let [temp,settemp]=useState({nums:null,minss:null,maxss:null,descriptions:"",icon:null});
    let [dateandtime,setdateandtime]=useState("");
    let [language,setlanguage]=useState("انجليزي");
    const { t, i18n } = useTranslation();
    function handlechangelanuage(){
     
      if(language=="انجليزي"){
      setlanguage("arabic")
      i18n.changeLanguage("en");
      moment.locale("en");
      }
    else{
    setlanguage("انجليزي")
    i18n.changeLanguage("ar");
    moment.locale("ar");
    }
    setdateandtime(moment().format('MMMM Do YYYY, h:mm:ss a'))
    }
   useEffect(()=>{
    i18n.changeLanguage("ar");
  
   },[])
    useEffect(()=>{
      setdateandtime(moment().format('MMMM Do YYYY, h:mm:ss a'))
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=31.963158&lon=35.930359&appid=0def444f2b8f41b53bfd47574463a74d')
        .then(function (response) {
          console.log(response);
          settemp({nums:Math.round(response.data.main.temp-272),minss:Math.round(response.data.main.temp_min-272),
            maxss:Math.round(response.data.main.temp_max-272),descriptions:response.data.weather[0].description,icon:`https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`})
        })
        .catch(function (error) {
          console.log(error);
        })

    },[])
    return(
        <Container maxWidth="sm" dir={language=="انجليزي"?"rtl":"ltr"} >
       <div className='card' style={{background:"#0d47a1",color:"white",padding:"10px",borderRadius:"15px",boxShadow:"0px 11px 1px rgba(0,0,0,0.05)",width:"100%"}}>
        <div className='content' >
           <div dir={language=="انجليزي"?"rtl":"ltr"} className='cityandtime' style={{display:"flex",alignItems:"end",justifyContent:"start"}}>
             <Typography variant='h1' style={{marginRight:"20px"}}>{t("Amman")}</Typography>
             <Typography variant='h5' style={{marginRight:"20px"}}>{dateandtime}</Typography>
           </div>
           <hr></hr>
          
           <div className='container' style={{display:"flex",justifyContent:"space-around"}}>
           <div className='degreeanddescription'>
          <div className='temp' style={{display:"flex"}}>
            <Typography variant='h1' style={{textAlign:"right"}}>
               {temp.nums}
            </Typography>
             <img style={{width:"100px"}} src={temp.icon}/>
          </div>
          <Typography  variant='h6' >
            {t(temp.descriptions)}
            </Typography>
           <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
               <h5>{t("min")}:{temp.minss}</h5>
               <h5 style={{margin:"10px"}}>|</h5>
               <h5>{t("max")}:{temp.maxss}</h5>
           </div>
           </div>

             <CloudIcon style={{fontSize:"200px"}}/>
           </div>
        </div>
        </div> 
    <div style={{display:"flex",justifyContent:"start"}}>
    <Button onClick={handlechangelanuage}  style={{color:"white" ,marginTop:"20px"}} variant="text">{language}</Button>
    </div>
      </Container>
    );
}