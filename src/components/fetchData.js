import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FilterBar from './filterBar';
// import dayjs from "dayjs";

const url = 'http://api.nobelprize.org/v1/prize.json';

// const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
// dayjs.extend(isSameOrBefore);
// dayjs.extend(isSameOrAfter);


const WinnersData = () => {
    const [winners, setWinners] = useState([]);
    const [allData, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getWinnersData = async () => {
        const response = await axios.get(url);
        // const response = await fetch(url);

        // const jsonData = await response.json();
        // setWinners(jsonData.prizes);
        setWinners(response.data.prizes);
        setData(winners);
        setLoading(false);
        // console.log(jsonData.prizes);
        // console.log(response.data.prizes);
    }

    useEffect(() =>{
        getWinnersData();
    },[]);


    if (loading) return <h4>Loading...</h4>;

    function GetWinnerName(props) {
        const isPresent= props.isPresent;
        const laureates = props.laureates;
        const category = props.category;
        const year = props.year;
        if (isPresent) {
            return (
            laureates.map((laureate) => 
                                  
                <ul className="users" key={laureate.id}>
                    <li><strong>Name: </strong>{laureate.firstname+' '+laureate.surname}</li>
                    {/* <li>{laureate.surname}</li> */}
                    <li><strong>Year: </strong>{year}</li>
                    <li><strong>Category: </strong>{category}</li>
                </ul>
             

        ));
        }
    }

    
    // let allData = winners;

    // const setData = (data) => {
    //     allData = data;
    // }

    const PeopleWithManyPrizes = () => {
        var count = {};
        var personsToDisplay = [];
        for (const prize of winners) {
            // console.log(prize.laureates);
            if (typeof prize.laureates==="object"){
                // console.log(prize.laureates);
                for (const person of prize.laureates){
                    if (count[person.id]) {
                        count[person.id] += 1;
                        personsToDisplay.push(person.firstname + " " + person.surname);
                    }
                    else {
                        count[person.id] = 1;
                    }
                }
            }
        }
        
        for (const id of Object.keys(count)){
            if (count[id]==1) delete count[id];
        }

        var listToDisplay = [];
        personsToDisplay = new Set(personsToDisplay);
        for (let person of personsToDisplay)
            listToDisplay.push(person);
        console.log(count);
        console.log(listToDisplay);

        // const numbers = [1, 2, 3, 4, 5];
        // const listItems = numbers.map((number) =>
        // <li>{number}</li>
        // );
        // console.log(listItems);

        console.log('listToDisplay = ', typeof listToDisplay);
        const listItems = listToDisplay.map((person) =>
  <li className="item" style={{listStyle:"square", float:"none", display:"block"}}>{person}</li>);

//   const listItems = personsToDisplay.map((person) => console.log(person[0]));

            return (
                <ul >{listItems}</ul>
            );
        
    }

    const generateCategoryDataForDropDown = () => {
        return [...new Set(winners.map((item) => item.category))];
    };

    const handleFilterCategory = (category) => {
        const filteredData = winners.filter((item) => {
          if (item.category === category) {
            return item;
          }
         });
        //  console.log(filteredData);
        setData(filteredData);
    };

    const handleFilterYear = (year, field) => {
        const filteredData = winners.filter((item) => {
          if (field === "from" && item.year>=year) {
            return item;
          }
        });
        // console.log(filteredData);
        setData(filteredData);
    };

    const handleFilterYearTo = (year, field) => {
        const filteredData = winners.filter((item) => {
            if (field === "to" && item.year<=year) {
              return item;
            }
          });
          // console.log(filteredData);
          setData(filteredData);
    };
    
    return (
        <>
            <div className="wholePage" style={{backgroundColor: "hsl(205, 100%, 96%)"}}>
            <div className="container" >
                <div className="row">
                    <div className="col-sm-3">
                        <FilterBar 
                            categories={generateCategoryDataForDropDown()}
                            onCategoryFilter={handleFilterCategory}
                            onYearFilter={handleFilterYear}
                            onToYearFilter={handleFilterYearTo}
                        />
                        <div>
                            <div className="col" style={{marginTop:"5rem"}}>
                                <h5 className="border-bottom">People With Multiple Prizes</h5>
                                <PeopleWithManyPrizes/>
                            </div>
                        </div>
                        
                    </div>


{/* className="col-sm-9"    className="row mt-5"*/}
                    <div className="col-sm-9" >
                        <div className="row mt-5" style={{borderLeft: "2px solid", borderColor:"grey"}}>
                        <h3>Nobel Prize Winners</h3>
                        <ul className="users">
                            {

                                allData.map((winner) => {

                                const {year, laureates, category} = winner;

                                {/* console.log(typeof laureates === "object"); */}
                                return (

                                    
                                    <div>
                                        
                                        {/* <h4>{year}</h4> */}

                                        {/* <p>{category}</p> */}

                                        {typeof laureates === "object" && <GetWinnerName isPresent={typeof laureates === "object"} laureates={laureates} year={year} category={category}/>
                                        }
                                        
                                        
                                    </div>
                                    
                                );
                            })}
                            
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );

    

    
};

export default WinnersData;