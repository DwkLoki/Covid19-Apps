import '../style/dataCovidBaru.css'

const DataCovidBaru = (props) => {
    return (
        <div className="data-covid-baru">
            <h3 style={{ color: 'purple' }}>Penambahan</h3>
            <div className="row">
                <div className="col-9">
                    <h5 className="keterangan">Jumlah Positif : </h5>
                </div>
                <div className="col-3">
                    <h5 className="color-data" style={{ color: 'dodgerblue' }}>{props.dataCovidApp.positif}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <h5 className="keterangan">Jumlah Dirawat : </h5>
                </div>
                <div className="col-3">
                    <h5 className="color-data" style={{ color: 'orange' }}>{props.dataCovidApp.dirawat}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <h5 className="keterangan">Jumlah Sembuh : </h5>
                </div>
                <div className="col-3">
                    <h5 className="color-data" style={{ color: 'green' }}>{props.dataCovidApp.sembuh}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <h5 className="keterangan">Jumlah Meninggal : </h5>
                </div>
                <div className="col-3">
                    <h5 className="color-data" style={{ color: 'red' }}>{props.dataCovidApp.meninggal}</h5>
                </div>
            </div>
        </div>
    )
}

export default DataCovidBaru;
