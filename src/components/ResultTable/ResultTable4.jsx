const  ResultTable4= (props) => {
  
    const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
    return ( 
        <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Stock(Year)</th>
            <th>MPF</th>
            <th>Other Servings</th>
            <th>Extra Servings</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((tableData4) =>(
          <tr>
            <td>{Math.round(tableData4.year)}</td>
            <td>{Math.round(tableData4.age)}</td>
            <td>{formatCurrency(Math.round(tableData4.stock))}</td>
            <td>{formatCurrency(Math.round(tableData4.mpf))}</td>
            <td>{formatCurrency(Math.round(tableData4.other))}</td>
            <td>{formatCurrency(Math.round(tableData4.extra))}</td>
            <td>{formatCurrency(Math.round(tableData4.sum))}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
     );
}
 
export default ResultTable4;