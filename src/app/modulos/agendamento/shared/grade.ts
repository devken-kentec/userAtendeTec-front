import { Servico } from './servico';
import { Unidade } from './unidade';
import { Calendario } from './calendario';

export interface Grade {
    id: Number;
    calendario: Calendario;
    horaInicial: string;
    horaFinal: string;
    intervalo: string;
    quantidade: string;
    correcaoHora: string;
    configurado: string;
    gerado: string;
    unidade: Unidade;
    servico: Servico; 
}