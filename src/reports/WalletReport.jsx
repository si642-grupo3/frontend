import React, { useState, useEffect } from 'react'
import { walletService } from '../services/walletService'
import "./walletStyles.css"

export const WalletReport = () =>{

    const [wallets, setWallets] = useState([]);
    const [walletById, setWalletById] = useState(null)
    const [total, setTotal] = useState(0.00)
    const [totalEnt, setTotalEnt] = useState(0.00)
    const [tcea, setTcea] = useState(0.00)
    const [searchedId, setSearchedId] = useState(0)

    const arreglo = [
        { id: 1, nombre: "coocooc", edad: 10},
        { id: 2, nombre: "cfdac", edad: 12},
        { id: 3, nombre: "cfooc", edad: 50},
        { id: 4, nombre: "cooc", edad: 16},
    ];

    useEffect(()=>{
        try {
            walletService.getWallets().then((result)=>{
                //console.log(result)
                setWallets(result)
            });

        } catch (e) {
            throw (e)
        }
    }, []);

    useEffect(()=>{
        console.log(wallets)
        const sum = wallets.reduce((rec, item) => rec+item.valor_recibido, 0)
        const smu = wallets.reduce((ent, item) => ent+item.valor_entregado, 0)
        setTotal(sum)
        setTotalEnt(smu)
    }, [wallets])

    useEffect(() => {
        console.log(walletById)
        if(walletById){
            setTotal(walletById.valor_recibido)
            setTotalEnt(walletById.valor_entregado)
        }
    }, [walletById]);

    useEffect(() => {
        const val = (totalEnt/total - 1)*100
        setTcea(val.toFixed(2))
        console.log(tcea)
    }, [totalEnt, total]);

    const inputChanged = async (inp)=>{
        const val = parseInt(inp.target.value);
        setSearchedId(val);
    }

    const searchById = async ()=>{

        if(searchedId > 0){
            try {
                walletService.getWalletById(searchedId).then((result)=>{
                    //console.log(result)
                    setWalletById(result)
                });
                setWallets([])
            } catch (e) {
                throw (e)
            }
        }else{
            try {
                walletService.getWallets().then((result)=>{
                    //console.log(result)
                    setWallets(result)
                });

            } catch (e) {
                throw (e)
            }
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <h1 id="mainTitle_Wallet">Reporte de la cartera de Facturas Descontada</h1>

            <div className="InputZone_Wallet">
                <h2 className="greenText">Filtro</h2>
                <p className="greenText">Número de factura:</p>

                <p><input type="number" id="inputId_Wallet" value={searchedId} onChange={inputChanged}/>
                    <button id="searchButton_Wallet" onClick={searchById}>Buscar</button>
                </p>
            </div>

            <table>
                <thead>
                <tr>
                    <th>N</th>
                    <th>Fecha Giro</th>
                    <th>Val Nom.</th>
                    <th>Fecha Ven.</th>
                    <th>Dias</th>
                    <th>Retención</th>
                    <th>TE%</th>
                    <th>d%</th>
                    <th>Descuento</th>
                    <th>Coste Ini.</th>
                    <th>Coste Fin.</th>
                    <th>Val. Neto.</th>
                    <th>Val. Rec.</th>
                    <th>Val. Ent.</th>
                    <th>TCEA%</th>
                </tr>
                </thead>
                <tbody>
                {wallets.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fecha_giro}</td>
                        <td>{item.valor_nominal}</td>
                        <td>{item.fecha_vencimiento}</td>
                        <td>{item.dias_transcurridos}</td>
                        <td>{item.retencion}</td>
                        <td>{item.tasa_efectiva}</td>
                        <td>{item.tasa_descuento}</td>
                        <td>{item.descuento}</td>
                        <td>{item.coste_inicial}</td>
                        <td>{item.coste_final}</td>
                        <td>{item.valor_neto}</td>
                        <td>{item.valor_recibido}</td>
                        <td>{item.valor_entregado}</td>
                        <td>{item.tcea}</td>
                    </tr>
                ))}
                {walletById && (
                    <tr>
                        <td>{walletById.id}</td>
                        <td>{walletById.fecha_giro}</td>
                        <td>{walletById.valor_nominal}</td>
                        <td>{walletById.fecha_vencimiento}</td>
                        <td>{walletById.dias_transcurridos}</td>
                        <td>{walletById.retencion}</td>
                        <td>{walletById.tasa_efectiva}</td>
                        <td>{walletById.tasa_descuento}</td>
                        <td>{walletById.descuento}</td>
                        <td>{walletById.coste_inicial}</td>
                        <td>{walletById.coste_final}</td>
                        <td>{walletById.valor_neto}</td>
                        <td>{walletById.valor_recibido}</td>
                        <td>{walletById.valor_entregado}</td>
                        <td>{walletById.tcea}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <h1 className="greenText" id="totalWallet">Totals S/.{total}</h1>
            <h1 className="greenText" id="totalTCEA">Total TCEA: {tcea}%</h1>
        </div>
    )
}