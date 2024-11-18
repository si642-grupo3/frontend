import React, {useEffect, useState} from 'react'
import './portfolioStyles.css'
import {portfolioService} from "../services/portfolioService";

export const PortfolioReport = () =>{

    const [portfolios, setPortfolios] = useState([]);
    const [fromDate, setFromDate] = useState("2024-01-01")
    const [toDate, setToDate] = useState("2024-12-01")

    const [listVN, setlistVN] = useState([]);
    const [listVR, setlistVR] = useState([]);
    const [listVE, setlistVE] = useState([]);
    const [listTCEA, setlistTCEA] = useState([]);

    useEffect(()=>{
        try {
            portfolioService.getPortfolios().then((result)=>{
                //console.log(result)
                setPortfolios(result)
            });

        } catch (e) {
            throw (e)
        }
    }, []);

    useEffect(() => {

    }, [listVR, listVE]);

    useEffect(()=>{
        console.log(portfolios)
        let lVR = []
        let lVN = []
        let ltcea = []
        portfolios.map((item)=>{
            const valR = item.reportes.reduce((rec, item) => rec+item.valor_recibido, 0)
            const valN = item.reportes.reduce((nom, item) => nom+item.valor_nominal, 0)
            const valE = item.reportes.reduce((ent, item) => ent+item.valor_entregado, 0)
            //console.log(`${valR} de vr en el item de id ${item.id}`)
            const tcea = (valE/valR - 1)*100

            lVR.push(valR.toFixed(2))
            lVN.push(valN.toFixed(2))
            ltcea.push(tcea.toFixed(2))
        })
        setlistVN(lVN)
        setlistVR(lVR)
        setlistTCEA(ltcea)
        //console.log(lVR)
    }, [portfolios])

    const fromInput = async (inp)=>{
        const val = inp.target.value;
        setFromDate(val);
    }

    const toInput = async (inp)=>{
        const val = inp.target.value;
        setToDate(val);
    }

    const searchByDates = async () =>{

        if(toDate > fromDate){
            try {
                portfolioService.getPortfolios().then((result)=>{
                    const filtrado = result.filter((item) => new Date(item.fecha_descuento) > new Date(fromDate) && new Date(item.fecha_descuento) <= new Date(toDate))
                    setPortfolios(filtrado)
                });

            } catch (e) {
                throw (e)
            }
        } else{
            try {
                portfolioService.getPortfolios().then((result)=>{
                    //console.log(result)
                    setPortfolios(result)
                });

            } catch (e) {
                throw (e)
            }
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <h1 id="mainTitle_Portfolio">Lista de Carteras de Factura Descontadas</h1>

            <div id="inputZone_Portfolio">
                <h2 className="greenText">Filtro</h2>
                <p className="greenText">Fecha de descuento</p>

                <p className="greenText">
                    <input type="date" className="inputDates" value={fromDate} onChange={fromInput}/> To <input type="date" className="inputDates" value={toDate} onChange={toInput}/>
                    <button id="searchButton_Portfolio" onClick={searchByDates}>Filtrar</button>
                </p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Fecha Descuento</th>
                        <th>Nro Facturas</th>
                        <th>Valor Nominal</th>
                        <th>Valor Recibido(VR)</th>
                        <th>TCEA(%)</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {portfolios.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.fecha_descuento}</td>
                            <td>{item.reportes.length}</td>
                            <td>{listVN[index]}</td>
                            <td>{listVR[index]}</td>
                            <td>{listTCEA[index]}%</td>
                            {
                                new Date(item.fecha_descuento) > new Date()? (
                                    <td><p><span className="estadoActivo">activa</span></p></td>
                                ): (
                                    <td><p><span className="estadoVencido">vencida</span></p></td>)
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}