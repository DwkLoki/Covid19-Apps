import DataCovid from './DataCovid';
import DataCovidBaru from './DataCovidBaru';
import { useParams } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Provinsi = () => {
    const [dataCovidProvinsi, setDataCovidProvinsi] = useState(null);
    const [listOfProvinsi, setListOfProvinsi] = useState(null);
    let params = useParams();
    console.log(params);

    useEffect(() => {
        getDataCovidProvinsi()
    }, [])

    // const listOfProvinsi = dataCovidProvinsi.list_data.map(itemKey => itemKey.key);

    // fungsi konversi ke Capitalize Each Word
    // function kapital(str) {
    //     return str.replace(/\w\S*/g,
    //         function (txt) {
    //             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //         });
    // }

    // fungsi konversi kebab-case ke Title Case
    function toTitle(string) {
        return string
            .split('-')
            .map(word => {
                return word.slice(0, 1).toUpperCase() + word.slice(1)
            })
            .join(' ');
    }

    const getDataCovidProvinsi = async () => {
        const url = `https://data.covid19.go.id/public/api/prov.json`

        try {
            const response = await axios.get(url)
            setDataCovidProvinsi(response.data)
            // console.log(response.data);
            const nameOfProvinsi = toTitle(params.namaProvinsi).toUpperCase()
            const dataProvinsi = response.data.list_data.map(itemKey => {
                if (itemKey.key === nameOfProvinsi) {
                    return itemKey
                }
            })
            console.log(dataProvinsi);
            console.log(response.data.list_data.map(itemKey => itemKey.key === toTitle(params.namaProvinsi).toUpperCase()));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Container>
                <h2>{`Jumlah Kasus Covid-19 di ${toTitle(params.namaProvinsi)} Saat Ini`}</h2>
                <h6>Tanggal : {dataCovidProvinsi && dataCovidProvinsi.last_date}</h6>
                <Row>
                    <Col>
                        {dataCovidProvinsi && dataCovidProvinsi.list_data.some(item => item === listOfProvinsi) &&
                            <div style={{ color: 'DodgerBlue' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_kasus}
                                    keterangan="Positif" />
                            </div>
                        }
                        {dataCovidProvinsi && dataCovidProvinsi.list_data.some(item => item === listOfProvinsi) &&
                            <div style={{ color: 'green' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_sembuh}
                                    keterangan="Sembuh" />
                            </div>
                        }
                    </Col>
                    <Col>
                        {dataCovidProvinsi && dataCovidProvinsi.list_data.some(item => item === listOfProvinsi) &&
                            <div style={{ color: 'orange' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_dirawat}
                                    keterangan="Dirawat" />
                            </div>
                        }
                        {dataCovidProvinsi &&
                            <div style={{ color: 'red' }}>
                                <DataCovid dataCovidApp={dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_meninggal}
                                    keterangan="Meninggal" />
                            </div>
                        }
                    </Col>
                    <Col>
                        {dataCovidProvinsi && dataCovidProvinsi.list_data.some(item => item === listOfProvinsi) &&
                            <DataCovidBaru
                                dataCovidApp={{
                                    positif: dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_kasus,
                                    dirawat: dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_dirawat,
                                    sembuh: dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_sembuh,
                                    meninggal: dataCovidProvinsi.list_data.indexOf(listOfProvinsi).jumlah_meninggal
                                }} />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Provinsi
