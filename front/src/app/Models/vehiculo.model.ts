import { GastoVehiculo } from "./gasto-vehiculo.model";

export interface Vehiculo {

    id : number,
    matricula : string,
    marca : string,
    modelo : string,
    bastidor : string,
    kilometraje : number,
    matriculacion : Date,
    itv : Date,
    precioCompra : number,
    precioVenta : number,
    fechaCompra : Date,
    fechaVenta : Date,
    imagen : string,
    url_documentacion : string,
    gestionVenta : boolean,
    vendedor_id : number,
    comprador_id : number,
    gastos : GastoVehiculo[]
}
