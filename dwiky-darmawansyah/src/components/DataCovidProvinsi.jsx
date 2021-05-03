// import DataCovid from './components/DataCovid';
// import DataCovidBaru from './components/DataCovidBaru';
// import { Container, Row, Col } from 'reactstrap';
import Provinsi from './Provinsi'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DataCovidProvinsi = () => {
    const [dataCovidProvinsi, setDataCovidProvinsi] = useState(null);
    let match = useRouteMatch();

    useEffect(() => {
        getDataCovidProvinsi()
    }, [])

    const getDataCovidProvinsi = async () => {
        const url = `https://data.covid19.go.id/public/api/prov.json`

        try {
            const response = await axios.get(url)
            setDataCovidProvinsi(response.data)
            // console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    // fungsi untuk konversi berbagai case penulisan ke kebab-case
    function toKebab(string) {
        return string
            // ...
            .replace(/[_\s]+/g, '-').toLowerCase();
    }

    // fungsi untuk konversi ke kebab-case
    // const convertToKebabCase = (string) => {
    //     return string.replace(/\s+/g, '-').toLowerCase();
    // }


    return (
        <div className="container">
            <Route exact path="/provinsi">
                <nav>
                    {dataCovidProvinsi &&
                        dataCovidProvinsi.list_data.map((itemKey, i) =>
                            <ul key={i}>
                                <li>
                                    <Link to={`${match.url}/${toKebab(itemKey.key)}`}>{itemKey.key}</Link>
                                </li>
                            </ul>
                        )
                    }
                </nav>
            </Route>
            <Switch>
                <Route exact path={`${match.path}/:namaProvinsi`}>
                    {/* <Container>
                        <h2>Jumlah Kasus Covid-19 di Indonesia Saat Ini</h2>
                        <h6>Tanggal : {dataCovidProvinsi && dataCovidProvinsi.last_date}</h6>
                        <Row>
                            <Col>
                            { dataCovidProvinsi && 
                                <div style={{ color: 'DodgerBlue' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.total.jumlah_positif} 
                                keterangan="Positif"/> 
                                </div>
                            }
                            { dataCovidProvinsi && 
                                <div style={{ color: 'green' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.total.jumlah_sembuh} 
                                keterangan="Sembuh"/>
                                </div>
                            }
                            </Col>
                            <Col>
                            { dataCovidProvinsi && 
                                <div style={{ color: 'orange' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.total.jumlah_dirawat} 
                                keterangan="Dirawat"/>
                                </div>
                            }
                            { dataCovidProvinsi && 
                                <div style={{ color: 'red' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.total.jumlah_meninggal} 
                                keterangan="Meninggal"/> 
                                </div>
                            }
                            </Col>
                            <Col>
                            { dataCovidProvinsi && 
                                <DataCovidBaru 
                                dataCovidApp={{
                                    positif: dataCovidProvinsi.penambahan.jumlah_positif,
                                    dirawat: dataCovidProvinsi.penambahan.jumlah_dirawat,
                                    sembuh: dataCovidProvinsi.penambahan.jumlah_sembuh,
                                    meninggal: dataCovidProvinsi.penambahan.jumlah_meninggal
                                }}/>
                            }
                            </Col>
                        </Row>
                    </Container> */}
                    <Provinsi />
                    <hr />
                </Route>
            </Switch>
        </div>
    )
}


export default DataCovidProvinsi
