import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: [],
      loading: false,
      yearList: [

        2021,
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
        2014,
        2013,
        2012,
        2011,
        2010,
        2009,
        2008,
        2007,
        2006,
        2005,
        2004,
        2003,
        2002,
        2001,
        2000,
        1999,
        1998,
        1997,
        1996,
        1995,
        1994,
        1993,
        1992,
        1991,
        1990,
        1989,
        1988,
        1987,
        1986,
        1985,
        1984,
        1983,
        1982,
        1981,
        1980,
        1979,
        1978,
        1977,
        1976,
        1975,
        1974,
        1973,
        1972,
        1971,
        1970,
        1969,
        1968,
        1967,
        1966,
        1965,
        1964,
        1963,
        1962,
        1961,
        1960,
        1959,
        1958,
        1957,
        1956,
        1955,
        1954,
        1953,
        1952,
        1951,
        1950,
        1949,
        1948,
        1947,
        1946,
        1945,
        1944,
        1943,
        1942,
        1941,
        1940,
        1939,
        1938,
        1937,
        1936,
        1935,
        1934,
        1933,
        1932,
        1931,
        1930,
        1929,
        1928,
        1927,
        1926,
        1925,
        1924,
        1923,
        1922,
        1921,
        1920,
        1919,
        1918,
        1917,
        1916,
        1915,
        1914,
        1913,
        1912,
        1911,
        1910,
        1909,
        1908,
        1907,
        1906,
        1905,
        1904,
        1903,
        1902,
        1901
      ]
    };
    this.getUserList = this.getUserList.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.handleChangeYear = this.handleChangeYear.bind(this);

    this.getUserList();
  }
  handleChangeYear(e) {
    console.log(e.target.value)
    console.log(this.state.prizeList)
    console.log(e.target.value, "this.state.prizeList", this.state.prizeList)
    let filteredList = this.state.prizeList.filter(obj =>
      obj.year.trim() === e.target.value.trim()
    )
    console.log("filteredList", filteredList)
    if (filteredList !== []) {
      this.setState({ loading: false, prizeList: filteredList });

    }
    // this.setState({ loading: false, prizeList: finalObjectList });
  }
  handleChangeCategory(e) {
    console.log(e.target.value, "this.state.prizeList", this.state.prizeList)
    let filteredList = this.state.prizeList.filter(obj =>
      obj.category.trim() === e.target.value.trim()
    )
    console.log("filteredList", filteredList)
    if (filteredList !== []) {
      this.setState({ loading: false, prizeList: filteredList });

    }
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
    const { prizeList, loading, yearList } = this.state;

    return (
      <div className="container App">
        <h1 className="d-inline-block">Nobel Prize Data</h1>

        <div>
          <select defaultValue="chemistry"
            onChange={this.handleChangeCategory}
          >
            <option value="chemistry">chemistry</option>
            <option value="economics">economics</option>
            <option value="literature">literature</option>
            <option value="peace">peace</option>
            <option value="physics">physics</option>
            <option value="medicine">medicine</option>


          </select>
          <p>Filter Category</p>
        </div>


        <div>
          <select defaultValue="chemistry"
            onChange={this.handleChangeYear}
          >
            {yearList.map(x => (

              // <td>{x.category}</td>
              <option value={x}>{x}</option>

            ))}
            <option value="Orange">chemistry</option>
            <option value="Radish">Radish</option>
            <option value="Cherry">Cherry</option>
          </select>
          <p>Filter Year</p>
        </div>

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
