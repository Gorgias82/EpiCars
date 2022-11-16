export interface Venta {
    id?: number;
    importe: number;
    metodoPago: string;
    garantia: number;
    esFinanciado: boolean;
    importeFinanciado: number;
    vehiculo_id: number;
    comprador_id: number;
}
