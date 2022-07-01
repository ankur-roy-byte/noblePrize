import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: [],
      loading: false
    };
    this.getUserList = this.getUserList.bind(this);
    this.getUserList();
  }

  getUserList() {
    this.setState({ loading: true });
    fetch("https://api.nobelprize.org/v1/prize.json")
      .then(res => res.json())
      .then(res => {
        console.log("==================", res)
        let finalObjectList = []
        let prizesList = res.prizes
        for (let i = 0; i < prizesList.length; i++) {
          let tempObj = {};
          tempObj["year"] = prizesList[i].year
          tempObj["category"] = prizesList[i].category

          let laureates = prizesList[i].laureates
          console.log(": prizesList[i]", prizesList[i])
          if (laureates !== undefined) {
            for (let j = 0; j < laureates.length; j++) {
              tempObj["fullName"] = laureates[j].firstname + " " + laureates[j].surname
              tempObj["motivation"] = laureates[j].motivation
            }
          } else {
            tempObj["fullName"] = "NONE"
            tempObj["motivation"] = "NONE"
          }

          finalObjectList.push(tempObj)
        }
        // setTimeout(() => {
        this.setState({ loading: false, prizeList: finalObjectList });
        // }, 2000);
      });
  }

  render() {
    const { prizeList, loading } = this.state;

    return (
      <div className="container App">
        <h1 className="d-inline-block">Nobel Prize Data</h1>
        
        <div className="clearfix" />

        <table className="table mt-3">
          <thead className="thead-dark">
            <th>Category</th>
            <th>Year</th>
            <th>Full Name</th>
            <th>Motivation</th>
          </thead>
          <tbody>
            {prizeList.map(x => (
              <tr>
                <td>{x.category}</td>
                <td>{x.year}</td>
                <td>{x.fullName}</td>
                <td>{x.motivation}</td>
              </tr>
            ))}
            {prizeList.length == 0 && (
              <tr>
                <td className="text-center" colSpan="4">
                  <b>Please Wait...</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>


      </div>
    );
  }
}

export default App;
