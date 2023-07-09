import { Servico } from './servico';

export interface DetalhamentoServico {
    id: number;
    descricao: string;
    detalhamento: string;
    servico: Servico;
}