import DataCovid from './DataCovid';
import DataCovidBaru from './DataCovidBaru';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Provinsi = () => {
  const [dataCovidProvinsi, setDataCovidProvinsi] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  let params = useParams();
  //   console.log(params);

  useEffect(() => {
    const getDataCovidProvinsi = async () => {
      const url = `https://data.covid19.go.id/public/api/prov.json`;

      try {
        const response = await axios.get(url);
        setLastDate(response.data.last_date);

        // Untuk nyimpan key nya
        const nameOfProv = toTitle(params.namaProvinsi).toUpperCase();

        // Ngambil data pake forEach biar langsung set data ke state
        response.data.list_data.forEach((data) => {
          if (data.key === nameOfProv) {
            setDataCovidProvinsi(data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    getDataCovidProvinsi();
  }, [params.namaProvinsi]);

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
      .map((word) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  // Some dihilangkan
  return (
    <div>
      <Container>
        <h2>{`Jumlah Kasus Covid-19 di ${toTitle(
          params.namaProvinsi
        )} Saat Ini`}</h2>
        <h6>Tanggal : {lastDate && lastDate}</h6>
        <Row>
          <Col>
            {dataCovidProvinsi && (
              <div style={{ color: 'DodgerBlue' }}>
                <DataCovid
                  dataCovidApp={dataCovidProvinsi.jumlah_kasus}
                  keterangan="Positif"
                />
              </div>
            )}
            {dataCovidProvinsi && (
              <div style={{ color: 'green' }}>
                <DataCovid
                  dataCovidApp={dataCovidProvinsi.jumlah_sembuh}
                  keterangan="Sembuh"
                />
              </div>
            )}
          </Col>
          <Col>
            {dataCovidProvinsi && (
              <div style={{ color: 'orange' }}>
                <DataCovid
                  dataCovidApp={dataCovidProvinsi.jumlah_dirawat}
                  keterangan="Dirawat"
                />
              </div>
            )}
            {dataCovidProvinsi && (
              <div style={{ color: 'red' }}>
                <DataCovid
                  dataCovidApp={dataCovidProvinsi.jumlah_meninggal}
                  keterangan="Meninggal"
                />
              </div>
            )}
          </Col>
          <Col>
            {dataCovidProvinsi && (
              <DataCovidBaru
                dataCovidApp={{
                  positif: dataCovidProvinsi.penambahan.positif,
                  dirawat: dataCovidProvinsi.penambahan.dirawat,
                  sembuh: dataCovidProvinsi.penambahan.sembuh,
                  meninggal: dataCovidProvinsi.penambahan.meninggal,
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Provinsi;
