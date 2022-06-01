import axios from 'axios';
import { useEffect, useState } from 'react';
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
        all: '',
        frontend: '',
        backend: '',
        devops: ''
    });
    

    useEffect(() => {

        axios.get<IEmployees>('./developers.json')
            .then(res => {

                console.log(res);

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

    }, []);





    


    let description:any = {
        Frontend: 'REACT.JS, NODE.JS, NEXT.JS, CSS, SASS, ANGULAR, VUE.JS',
        Backend: '.NET, PYTHON, REST.API, MONGO DB, MySQL',
        Devops: '.NET, PYTHON, REST.API, MONGO DB'
    };


    function changeTab(e:any){

        if(e.target.id == 'All'){
            setActiveTab({all:'activeTab', frontend:'', backend:'', devops:''});
        }

        if(e.target.id == 'Frontend'){
            setActiveTab({all:'', frontend:'activeTab', backend:'', devops:''});
        }

        if(e.target.id == 'Backend'){
            setActiveTab({all:'', frontend:'', backend:'activeTab', devops:''});
        }

        if(e.target.id == 'Devops'){
            setActiveTab({all:'', frontend:'', backend:'', devops:'activeTab'});
        }

        setMain(
            data!.employees.map((employee:IEmployee, i:number) => {

                if(employee.developer.category == e.target.id || e.target.id == 'All'){
                    return(
                        <div key={i} className="developer">
                            <p>{employee.developer.category}</p>
                            <p>{employee.developer.experienceAmount} år</p>
                            <p>{employee.developer.office.city}</p>
                            <p>{employee.developer.availability}%</p>
                            <p>{employee.developer.price} kr/h</p>
                            <p className="description">{description[employee.developer.category]}</p>
                        </div>  
                    )
                }  
            })
        );  
    }

    





    return (
        <div className="app">

            <div className="leftContainer">

                <div className={"category " + activeTab.all} id="All" onClick={changeTab}>
                    <h2>ALL</h2>
                    <p>{avaliableDevs.all} Developers available</p>
                </div>

                <div className={"category " + activeTab.frontend} id="Frontend" onClick={changeTab}>
                    <h2>FRONTEND</h2>
                    <p>{avaliableDevs.frontend} Developers available</p>
                </div>

                <div className={"category " + activeTab.backend} id="Backend" onClick={changeTab}>
                    <h2>BACKEND</h2>
                    <p>{avaliableDevs.backend} Developers available</p>
                </div>

                <div className={"category " + activeTab.devops} id="Devops" onClick={changeTab}>
                    <h2>DEVOPS</h2>
                    <p>{avaliableDevs.devops} Developers available</p>
                </div>

            </div>



            <div className="rightContainer">
                <header>
                    <h1>FIND YOUR <span>EXPERT</span></h1>
                    <input type="text" placeholder="Search"></input>
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
