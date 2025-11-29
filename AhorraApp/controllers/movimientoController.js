import { Movimiento } from "../models/movimiento";
import DatabaseService from '../database/db';
export class MovimientoController{
    constructor(){
        this.listeners=[];
    }
    async initialize(){
        await DatabaseService.initialize();
    }

}