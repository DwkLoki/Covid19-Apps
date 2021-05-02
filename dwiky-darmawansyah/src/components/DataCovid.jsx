import '../style/dataCovid.css';

const DataCovid = (props) => {
    return (
        <div className="data-covid">
            <h3>{props.dataCovidApp}</h3>
            <h5>{props.keterangan}</h5>
        </div>
    )
}

export default DataCovid;
