import './style/App.css';
import DataCovid from './components/DataCovid';
import DataCovidBaru from './components/DataCovidBaru';
import DataCovidProvinsi from './components/DataCovidProvinsi';
import { Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [ dataCovid, setDataCovid ] = useState(null);

  useEffect(() => {
    getDataCovid()
  }, [])

  const getDataCovid = async () => {
    const url = `https://data.covid19.go.id/public/api/update.json`

    try {
      const response = await axios.get(url)
      setDataCovid( response.data.update )
      // console.log(response.data.update);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="navbar">
          <Nav />
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <div className="content">
            <Container>
              <h2>Jumlah Kasus Covid-19 di Indonesia Saat Ini</h2>
              <h6>Tanggal : {dataCovid && dataCovid.penambahan.tanggal}</h6>
              <Row>
                <Col>
                  { dataCovid && 
                    <div style={{ color: 'DodgerBlue' }}>
                      <DataCovid dataCovidApp={dataCovid.total.jumlah_positif} 
                      keterangan="Positif"/> 
                    </div>
                  }
                  { dataCovid && 
                    <div style={{ color: 'green' }}>
                      <DataCovid dataCovidApp={dataCovid.total.jumlah_sembuh} 
                      keterangan="Sembuh"/>
                    </div>
                  }
                </Col>
                <Col>
                  { dataCovid && 
                    <div style={{ color: 'orange' }}>
                      <DataCovid dataCovidApp={dataCovid.total.jumlah_dirawat} 
                      keterangan="Dirawat"/>
                    </div>
                  }
                  { dataCovid && 
                    <div style={{ color: 'red' }}>
                      <DataCovid dataCovidApp={dataCovid.total.jumlah_meninggal} 
                      keterangan="Meninggal"/> 
                    </div>
                  }
                </Col>
                <Col>
                  { dataCovid && 
                    <DataCovidBaru 
                      dataCovidApp={{
                        positif: dataCovid.penambahan.jumlah_positif,
                        dirawat: dataCovid.penambahan.jumlah_dirawat,
                        sembuh: dataCovid.penambahan.jumlah_sembuh,
                        meninggal: dataCovid.penambahan.jumlah_meninggal
                      }}/>
                  }
                </Col>
              </Row>
            </Container>
            <hr />
          </div>
        </Route>
        <Route exact path="/provinsi">
          <DataCovidProvinsi />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
