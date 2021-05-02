// import DataCovid from './components/DataCovid';
// import DataCovidBaru from './components/DataCovidBaru';
// import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DataCovidProvinsi = () => {
    const [ dataCovidProvinsi, setDataCovidProvinsi ] = useState(null);

    useEffect(() => {
        getDataCovidProvinsi()
    }, [])

    const getDataCovidProvinsi = async () => {
        const url = `https://data.covid19.go.id/public/api/prov.json`

        try {
        const response = await axios.get(url)
        setDataCovidProvinsi( response.data )
        console.log(response.data);
        } catch (err) {
        console.log(err);
        }
    }
    return (
        <div className="container">
            { dataCovidProvinsi && 
                dataCovidProvinsi.list_data.map( (itemKey, i) => 
                    <ul key={i}>
                        <li>
                            <Link to={itemKey.key}>{itemKey.key}</Link>
                        </li>
                    </ul>  
                )
            }
        </div>
    )
}

export default DataCovidProvinsi
