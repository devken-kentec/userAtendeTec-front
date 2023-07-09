import { DetalhamentoServico } from './detalhamento-servico';
import { Grade } from './grade';

export interface Agendamento {
    id: number;
    horario: string;
    sequencial: string;
    prioridade: string;
    senha: string;
    statusAgendamento: string;
    grade: Grade;
    detalhamentoServico: DetalhamentoServico;
    contribuinte: string;
}