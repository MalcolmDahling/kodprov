import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App-Styling/App.scss';
import './App-Styling/leftContainer.scss';
import './App-Styling/rightContainer.scss';
import { IAvailableDevs } from './models/IAvailableDevs';
import { IEmployee } from './models/IEmployee';
import { IEmployees } from './models/IEmployees';

function App() {

    const [data, setData] = useState<any>();

    const [main, setMain] = useState();

    const [avaliableDevs, setAvaliableDevs] = useState<IAvailableDevs>({
        all:0,
        frontend:0,
        backend:0,
        devops:0
    });

    const [activeTab, setActiveTab] = useState({
        All: '',
        Frontend: '',
        Backend: '',
        Devops: ''
    });
    

    useEffect(() => {

        axios.get<IEmployees>('./developers.json')
            .then(res => {

                setData(res.data);
                
                let all = 0, frontend = 0, backend = 0, devops = 0;

                for(let i = 0; i < res.data.employees.length; i++){
                    
                    if(res.data.employees[i].developer.category == 'Frontend'){
                        frontend++;  
                    }

                    if(res.data.employees[i].developer.category == 'Backend'){
                        backend++;  
                    }

                    if(res.data.employees[i].developer.category == 'Devops'){
                        devops++;  
                    }

                    all++;
                }

                setAvaliableDevs({
                    all: all,
                    frontend: frontend,
                    backend: backend,
                    devops: devops
                });

            });


        getWindowDimensions();
    }, []);







    //Gets window and document size and sets the variables so it can be used for responsive design.
    let body = document.body, html = document.documentElement;
    let documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

    const [version, setVersion] = useState('desktop');

    
    const getWindowDimensions = () => {
        const { innerWidth: width} = window;

        if(width <= 1120){
            setVersion('mobile');
        }
        else{
            setVersion('desktop');
        }   
    }

    window.addEventListener('resize', getWindowDimensions);





    



    let description:any = {
        Frontend: 'REACT.JS, NODE.JS, NEXT.JS, CSS, SASS, ANGULAR, VUE.JS',
        Backend: '.NET, PYTHON, REST.API, MONGO DB, MySQL',
        Devops: '.NET, PYTHON, REST.API, MONGO DB'
    };


    const changeTab = (e:React.MouseEvent<HTMLDivElement>) => {

        setActiveTab({All:'', Frontend:'', Backend:'', Devops:'', [e.currentTarget.id]:'activeTab'});

        setMain(
            data!.employees.map((employee:IEmployee, i:number) => {

                if(employee.developer.category == e.currentTarget.id || e.currentTarget.id == 'All'){
                    return(
                        <div key={i}>
                            <p>{employee.developer.category.toUpperCase()} DEVELOPER</p>
                            <p className="description">{description[employee.developer.category]}</p>

                            <div>
                                <p>{employee.developer.experienceAmount} år</p>
                                <p>{employee.developer.office.city.toUpperCase()}</p>
                                <p>{employee.developer.availability}%</p>
                                <p>{employee.developer.price} kr/h</p>
                            </div>
                            
                        </div>
                    )
                }  
            })
        );
        
        
    }

    



    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {

        setActiveTab({All:'', Frontend:'', Backend:'', Devops:''});

        setMain(
            data!.employees.map((employee:IEmployee, i:number) => {

                if( employee.developer.category.toLowerCase().includes(e.currentTarget.value.toLowerCase()) && e.currentTarget.value != '' ){
                    return(
                        <div key={i}>
                            <p>{employee.developer.category.toUpperCase()} DEVELOPER</p>
                            <p className="description">{description[employee.developer.category]}</p>

                            <div>
                                <p>{employee.developer.experienceAmount} år</p>
                                <p>{employee.developer.office.city.toUpperCase()}</p>
                                <p>{employee.developer.availability}%</p>
                                <p>{employee.developer.price} kr/h</p>
                            </div>
                        </div>  
                    )
                }  
            })
        );
        
    }






    return (
        <div className="app">


            <div className="leftContainer" style={{height: documentHeight}}>
                <nav>
                    <div className={"category " + activeTab.All} id="All" onClick={changeTab}>
                        <h2>ALL</h2>
                        {version == 'desktop' && <p>{avaliableDevs.all} Developers available</p>}

                        {version == 'mobile' && <p>{avaliableDevs.all} Devs <br/> available</p>}
                    </div>

                    <div className={"category " + activeTab.Frontend} id="Frontend" onClick={changeTab}>
                        {version == 'desktop' && <h2>FRONTEND</h2>}
                        {version == 'desktop' && <p>{avaliableDevs.frontend} Developers available</p>}

                        {version == 'mobile' && <h2>FRONT<br/>END</h2>}
                        {version == 'mobile' && <p>{avaliableDevs.frontend} Devs <br/> available</p>}
                    </div>

                    <div className={"category " + activeTab.Backend} id="Backend" onClick={changeTab}>
                        {version == 'desktop' && <h2>BACKEND</h2>}
                        {version == 'desktop' && <p>{avaliableDevs.backend} Developers available</p>}

                        {version == 'mobile' && <h2>BACK<br/>END</h2>}
                        {version == 'mobile' && <p>{avaliableDevs.backend} Devs <br/> available</p>}
                    </div>

                    <div className={"category " + activeTab.Devops} id="Devops" onClick={changeTab}>
                        {version == 'desktop' && <h2>DEVOPS</h2>}
                        {version == 'desktop' && <p>{avaliableDevs.devops} Developers available</p>}

                        {version == 'mobile' && <h2>DEV<br/>OPS</h2>}
                        {version == 'mobile' && <p>{avaliableDevs.devops} Devs <br/> available</p>}
                    </div>
                </nav>
            </div>


            <div className="rightContainer">
                <header>
                    <h1>FIND YOUR <span>EXPERT</span></h1>
                    <input type="text" placeholder="Search" onChange={handleChange}></input>
                    <input type="button" value="BOKA"></input>
                </header>

                <div className="titleBar">
                    <h3>KOMPETENS</h3>
                    <h3>ERFARENHET</h3>
                    <h3>GEOGRAFI</h3>
                    <h3>TILLGÄNGLIGHET</h3>
                    <h3>PRIS</h3>
                </div>

                <main>
                    {main}
                </main>
            </div>

        </div>
    );
}

export default App;
