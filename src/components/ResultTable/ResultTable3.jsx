const  ResultTable3= (props) => {
    const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
    return ( 
        <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th>G</th>
            
          </tr>
        </thead>
        <tbody>
          {props.data.map((tableData3) =>(
          <tr>
            <td>{Math.round(tableData3.year)}</td>
            <td>{Math.round(tableData3.age)}</td>
            <td>{formatCurrency(Math.round(tableData3.D))}</td>
            <td>{formatCurrency(Math.round(tableData3.E))}</td>
            <td>{formatCurrency(Math.round(tableData3.F))}</td>
            <td>{formatCurrency(Math.round(tableData3.G))}</td>
            
          </tr>
          ))}
          
        </tbody>
      </table>
     );
}
 
export default ResultTable3;